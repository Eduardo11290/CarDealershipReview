from flask import Flask, jsonify, request
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk

# Download the required lexicon (do this once at startup)
nltk.download("vader_lexicon")

app = Flask("Sentiment Analyzer")
sia = SentimentIntensityAnalyzer()


@app.get("/")
def home():
    return (
        "Welcome to the Sentiment Analyzer. "
        "Use POST /analyze with JSON {\"text\": \"...\"} to get the sentiment"
    )


def _classify_sentiment(text: str) -> str:
    scores = sia.polarity_scores(text)
    pos = float(scores.get("pos", 0))
    neg = float(scores.get("neg", 0))
    neu = float(scores.get("neu", 0))

    res = "positive"
    if neg > pos and neg > neu:
        res = "negative"
    elif neu > neg and neu > pos:
        res = "neutral"

    return res


# Backwards-compatible endpoint (old behavior)
@app.get("/analyze/<path:input_txt>")
def analyze_sentiment_get(input_txt):
    sentiment = _classify_sentiment(input_txt)
    return jsonify({"sentiment": sentiment})


# Recommended endpoint (safe for any text)
@app.post("/analyze")
def analyze_sentiment_post():
    data = request.get_json(silent=True) or {}
    text = data.get("text", "")

    # Allow also {"review": "..."} just in case
    if not text:
        text = data.get("review", "")

    sentiment = _classify_sentiment(text)
    return jsonify({"sentiment": sentiment})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
