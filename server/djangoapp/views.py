import json
import logging

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.http import JsonResponse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.views.decorators.csrf import csrf_exempt

from .models import CarMake, CarModel
from .populate import initiate
from .restapis import get_request, analyze_review_sentiments, post_review

# Get an instance of a logger
logger = logging.getLogger(__name__)


def get_cars(request):
    count = CarMake.objects.filter().count()
    if count == 0:
        initiate()

    car_models = CarModel.objects.select_related("car_make")
    cars = []

    for car_model in car_models:
        cars.append(
            {
                "id": car_model.id,
                "CarModel": car_model.name,
                "CarMake": car_model.car_make.name,
                "year": car_model.year,
            }
        )

    return JsonResponse({"CarModels": cars})


@csrf_exempt
def login_user(request):
    if request.method != "POST":
        return JsonResponse({"status": 405, "message": "Method Not Allowed"}, status=405)

    try:
        data = json.loads(request.body or "{}")
        username = data.get("userName", "")
        password = data.get("password", "")
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({"userName": username, "status": "Authenticated"}, status=200)

        return JsonResponse({"userName": username, "status": "Failed"}, status=401)
    except Exception:
        logger.exception("Error in login_user")
        return JsonResponse({"status": 500, "message": "Login error"}, status=500)


def logout_request(request):
    logout(request)
    return JsonResponse({"userName": ""}, status=200)


@csrf_exempt
def registration(request):
    if request.method != "POST":
        return JsonResponse({"status": 405, "message": "Method Not Allowed"}, status=405)

    try:
        data = json.loads(request.body or "{}")
        username = data.get("userName", "")
        password = data.get("password", "")
        first_name = data.get("firstName", "")
        last_name = data.get("lastName", "")
        email = data.get("email", "")

        if not username or not password:
            return JsonResponse({"status": 400, "message": "Missing username/password"}, status=400)

        try:
            User.objects.get(username=username)
            return JsonResponse({"userName": username, "error": "Already Registered"}, status=409)
        except User.DoesNotExist:
            logger.debug("%s is new user", username)

        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password,
            email=email,
        )
        login(request, user)
        return JsonResponse({"userName": username, "status": "Authenticated"}, status=201)

    except Exception:
        logger.exception("Error in registration")
        return JsonResponse({"status": 500, "message": "Registration error"}, status=500)


@csrf_exempt
def password_reset_request(request):
    if request.method != "POST":
        return JsonResponse({"status": 405, "message": "Method Not Allowed"}, status=405)

    try:
        data = json.loads(request.body or "{}")
        email = (data.get("email") or "").strip().lower()

        if not email:
            return JsonResponse({"status": 400, "message": "Email is required"}, status=400)

        # Always return success to avoid leaking which emails exist.
        users = User.objects.filter(email__iexact=email)
        if users.exists():
            user = users.first()
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            # Frontend route that will show the reset form.
            from django.conf import settings

            frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
            reset_link = f"{frontend_url}/reset-password/{uidb64}/{token}"

            send_mail(
                subject="Reset your password",
                message=(
                    "Someone requested a password reset for your account.\n\n"
                    f"Reset link: {reset_link}\n\n"
                    "If this wasn't you, you can ignore this email."
                ),
                from_email=getattr(settings, "DEFAULT_FROM_EMAIL", None),
                recipient_list=[email],
                fail_silently=False,
            )

        return JsonResponse({"ok": True}, status=200)

    except Exception:
        logger.exception("Error in password_reset_request")
        return JsonResponse({"status": 500, "message": "Password reset error"}, status=500)


@csrf_exempt
def password_reset_confirm(request, uidb64, token):
    if request.method != "POST":
        return JsonResponse({"status": 405, "message": "Method Not Allowed"}, status=405)

    try:
        data = json.loads(request.body or "{}")
        password = data.get("password") or ""
        password2 = data.get("password2") or ""

        if not password or not password2:
            return JsonResponse({"status": 400, "message": "Password is required"}, status=400)
        if password != password2:
            return JsonResponse({"status": 400, "message": "Passwords do not match"}, status=400)
        if len(password) < 8:
            return JsonResponse(
                {"status": 400, "message": "Password must be at least 8 characters"},
                status=400,
            )

        try:
            uid = urlsafe_base64_decode(uidb64).decode("utf-8")
            user = User.objects.get(pk=uid)
        except Exception:
            return JsonResponse({"status": 400, "message": "Invalid link"}, status=400)

        if not default_token_generator.check_token(user, token):
            return JsonResponse(
                {"status": 400, "message": "Invalid or expired link"},
                status=400,
            )

        user.set_password(password)
        user.save()
        return JsonResponse({"ok": True}, status=200)

    except Exception:
        logger.exception("Error in password_reset_confirm")
        return JsonResponse({"status": 500, "message": "Password reset error"}, status=500)


def get_dealerships(request, state="All"):
    if state == "All":
        endpoint = "/fetchDealers"
    else:
        endpoint = "/fetchDealers/" + state

    dealerships = get_request(endpoint)
    return JsonResponse({"status": 200, "dealers": dealerships}, status=200)


def get_dealer_reviews(request, dealer_id):
    if dealer_id:
        endpoint = "/fetchReviews/dealer/" + str(dealer_id)
        reviews = get_request(endpoint)

        for review_detail in reviews:
            response = analyze_review_sentiments(review_detail.get("review", ""))
            if response and "sentiment" in response:
                review_detail["sentiment"] = response["sentiment"]
            else:
                review_detail["sentiment"] = "neutral"

        return JsonResponse({"status": 200, "reviews": reviews}, status=200)

    return JsonResponse({"status": 400, "message": "Bad Request"}, status=400)


def get_dealer_details(request, dealer_id):
    if dealer_id:
        endpoint = "/fetchDealer/" + str(dealer_id)
        dealership = get_request(endpoint)
        return JsonResponse({"status": 200, "dealer": dealership}, status=200)

    return JsonResponse({"status": 400, "message": "Bad Request"}, status=400)


# ✅ FIX: CSRF exempt + proper HTTP statuses
@csrf_exempt
def add_review(request):
    if request.method != "POST":
        return JsonResponse({"status": 405, "message": "Method Not Allowed"}, status=405)

    if request.user.is_anonymous:
        return JsonResponse({"status": 403, "message": "Unauthorized"}, status=403)

    try:
        data = json.loads(request.body or "{}")

        dealership = data.get("dealership", data.get("dealer_id"))
        name = data.get("name", data.get("username", request.user.username))
        purchase = data.get("purchase", data.get("purchased", False))
        purchase_date = data.get("purchase_date") or ""

        car_make = data.get("car_make")
        car_model = data.get("car_model")
        car_year = data.get("car_year")

        if (not car_make or not car_model or not car_year) and data.get("car"):
            parts = str(data["car"]).split()
            if len(parts) >= 2:
                car_make = car_make or parts[0]
                maybe_year = parts[-1]
                if maybe_year.isdigit():
                    car_year = car_year or int(maybe_year)
                    car_model = car_model or (" ".join(parts[1:-1]) or "Unknown")
                else:
                    car_model = car_model or (" ".join(parts[1:]) or "Unknown")

        title = (data.get("title") or "").strip()
        rating = data.get("rating")
        review_text = (data.get("review") or "").strip()

        if rating is not None:
            header = f"{title} ({rating}/5)" if title else f"Rating: {rating}/5"
        else:
            header = title

        if header:
            review_text = f"{header} — {review_text}" if review_text else header

        if dealership is None:
            return JsonResponse(
                {"status": 400, "message": "Missing dealer_id/dealership"},
                status=400,
            )

        year_int = 0
        if car_year is not None and str(car_year).isdigit():
            year_int = int(car_year)

        payload = {
            "name": str(name),
            "dealership": int(dealership),
            "review": str(review_text),
            "purchase": bool(purchase),
            "purchase_date": str(purchase_date),
            "car_make": str(car_make or ""),
            "car_model": str(car_model or ""),
            "car_year": year_int,
        }

        result = post_review(payload)

        # Fail loudly if the Node/Mongo insert failed
        if (not result) or (isinstance(result, dict) and result.get("error")):
            return JsonResponse(
                {
                    "status": 502,
                    "message": "Failed to save review in database",
                    "details": result,
                },
                status=502,
            )

        return JsonResponse({"status": 200, "message": "Review posted"}, status=200)

    except Exception:
        logger.exception("Error in posting review")
        return JsonResponse(
            {"status": 500, "message": "Error in posting review"},
            status=500,
        )
