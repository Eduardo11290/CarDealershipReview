import os
from dotenv import load_dotenv
import requests

load_dotenv()

backend_url = os.getenv("BACKEND_URL") or os.getenv(
  "backend_url",
  "http://localhost:3030",
)

sentiment_analyzer_url = os.getenv("SENTIMENT_ANALYZER_URL") or os.getenv(
  "sentiment_analyzer_url",
  "http://localhost:5050/",
)


def get_request(endpoint, **kwargs):
    params = ""
    if kwargs:
        for key, value in kwargs.items():
            params = params + key + "=" + value + "&"

    request_url = backend_url + endpoint + "?" + params

    print("GET from {} ".format(request_url))
    try:
        response = requests.get(request_url, timeout=15)
        response.raise_for_status()
        return response.json()
    except Exception as err:
        print(f"Network exception occurred: {err}")
        return {"error": str(err)}


def analyze_review_sentiments(text):
    """
    Calls sentiment microservice safely using POST /analyze
    so review text never breaks URLs (slashes, spaces, unicode, etc.)
    """
    request_url = sentiment_analyzer_url.rstrip("/") + "/analyze"

    try:
        response = requests.post(
            request_url,
            json={"text": text},
            timeout=15,
        )
        response.raise_for_status()
        return response.json()

    except Exception as err:
        print(f"analyze_review_sentiments failed: {err}")
        return {"sentiment": "neutral", "error": str(err)}


def post_review(data_dict):
    request_url = backend_url.rstrip("/") + "/insert_review"
    try:
        response = requests.post(request_url, json=data_dict, timeout=15)
        response.raise_for_status()
        return response.json()
    except Exception as err:
        print(f"post_review failed: {err}")
        return {"error": str(err)}
