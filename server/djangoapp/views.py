from django.contrib.auth.models import User
from django.contrib.auth import logout
from django.http import JsonResponse
from django.contrib.auth import login, authenticate
import logging
import json
from django.views.decorators.csrf import csrf_exempt
from .models import CarMake, CarModel
from .populate import initiate
from .restapis import get_request, analyze_review_sentiments, post_review

# Get an instance of a logger
logger = logging.getLogger(__name__)


def get_cars(request):
    count = CarMake.objects.filter().count()
    if (count == 0):
        initiate()

    car_models = CarModel.objects.select_related('car_make')
    cars = []

    for car_model in car_models:
        cars.append({
            "id": car_model.id,
            "CarModel": car_model.name,
            "CarMake": car_model.car_make.name,
            "year": car_model.year,
        })

    return JsonResponse({"CarModels": cars})



@csrf_exempt
def login_user(request):
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    user = authenticate(username=username, password=password)
    data = {"userName": username}
    if user is not None:
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
    return JsonResponse(data)


def logout_request(request):
    logout(request)
    data = {"userName": ""}
    return JsonResponse(data)


@csrf_exempt
def registration(request):
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    first_name = data['firstName']
    last_name = data['lastName']
    email = data['email']
    username_exist = False
    try:
        User.objects.get(username=username)
        username_exist = True
    except Exception:
        logger.debug("{} is new user".format(username))
    if not username_exist:
        user = User.objects.create_user(
            username=username, first_name=first_name,
            last_name=last_name, password=password, email=email
        )
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
        return JsonResponse(data)
    else:
        data = {"userName": username, "error": "Already Registered"}
        return JsonResponse(data)


def get_dealerships(request, state="All"):
    if (state == "All"):
        endpoint = "/fetchDealers"
    else:
        endpoint = "/fetchDealers/" + state
    dealerships = get_request(endpoint)
    return JsonResponse({"status": 200, "dealers": dealerships})


def get_dealer_reviews(request, dealer_id):
    if (dealer_id):
        endpoint = "/fetchReviews/dealer/" + str(dealer_id)
        reviews = get_request(endpoint)
        for review_detail in reviews:
            response = analyze_review_sentiments(review_detail['review'])
            print(response)
            # Check if response is valid before accessing 'sentiment'
            if response and 'sentiment' in response:
                review_detail['sentiment'] = response['sentiment']
            else:
                review_detail['sentiment'] = 'neutral'
        return JsonResponse({"status": 200, "reviews": reviews})
    else:
        return JsonResponse({"status": 400, "message": "Bad Request"})


def get_dealer_details(request, dealer_id):
    if (dealer_id):
        endpoint = "/fetchDealer/" + str(dealer_id)
        dealership = get_request(endpoint)
        return JsonResponse({"status": 200, "dealer": dealership})
    else:
        return JsonResponse({"status": 400, "message": "Bad Request"})


def add_review(request):
    if request.user.is_anonymous:
        return JsonResponse({"status": 403, "message": "Unauthorized"})

    data = json.loads(request.body)

    # Accept both formats:
    # - new frontend format (dealer_id, username, title, rating, review, car_make/model/year...)
    # - already-mapped format (dealership, name, purchase, purchase_date, car_make/model/year...)
    try:
        dealership = data.get("dealership", data.get("dealer_id"))
        name = data.get("name", data.get("username", request.user.username))
        purchase = data.get("purchase", data.get("purchased", False))
        purchase_date = data.get("purchase_date") or ""

        car_make = data.get("car_make")
        car_model = data.get("car_model")
        car_year = data.get("car_year")

        # If frontend sent "car" as a single string, try best effort split:
        # "Make Model 2020" -> make, model, year
        if (not car_make or not car_model or not car_year) and data.get("car"):
            parts = str(data["car"]).split()
            if len(parts) >= 2:
                car_make = car_make or parts[0]
                # last part might be year
                maybe_year = parts[-1]
                if maybe_year.isdigit():
                    car_year = car_year or int(maybe_year)
                    car_model = car_model or " ".join(parts[1:-1]) or "Unknown"
                else:
                    car_model = car_model or " ".join(parts[1:]) or "Unknown"

        # rating/title aren’t in the Node schema, so we embed them in the text
        title = (data.get("title") or "").strip()
        rating = data.get("rating")
        review_text = (data.get("review") or "").strip()

        if rating is not None:
            header = f"{title} ({rating}/5)" if title else f"Rating: {rating}/5"
        else:
            header = title

        if header:
            review_text = f"{header} — {review_text}" if review_text else header

        payload = {
            "name": name,
            "dealership": int(dealership),
            "review": review_text,
            "purchase": bool(purchase),
            "purchase_date": str(purchase_date),
            "car_make": str(car_make),
            "car_model": str(car_model),
            "car_year": int(car_year),
        }

        post_review(payload)
        return JsonResponse({"status": 200})
    except Exception as e:
        logger.exception("Error in posting review")
        return JsonResponse({"status": 401, "message": "Error in posting review"})
