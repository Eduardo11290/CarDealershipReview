import json
import logging

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
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

    # Must be logged in (session-based auth)
    if request.user.is_anonymous:
        return JsonResponse({"status": 403, "message": "Unauthorized"}, status=403)

    try:
        data = json.loads(request.body or "{}")

        # Accept both formats:
        dealership = data.get("dealership", data.get("dealer_id"))
        name = data.get("name", data.get("username", request.user.username))
        purchase = data.get("purchase", data.get("purchased", False))
        purchase_date = data.get("purchase_date") or ""

        car_make = data.get("car_make")
        car_model = data.get("car_model")
        car_year = data.get("car_year")

        # If frontend sent "car" as a single string: "Make Model 2020"
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

        # rating/title aren’t in the Node schema, so embed them in the review text
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

        # Safer year parse
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

        post_review(payload)
        return JsonResponse({"status": 200, "message": "Review posted"}, status=200)

    except Exception:
        logger.exception("Error in posting review")
        return JsonResponse(
            {"status": 500, "message": "Error in posting review"},
            status=500,
        )