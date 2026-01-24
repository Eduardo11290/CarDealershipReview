from flask import Flask
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk  # Import nltk


# Download the required lexicon
nltk.download('vader_lexicon')

app = Flask("Sentiment Analyzer")

sia = SentimentIntensityAnalyzer()


@app.get('/')
def home():
    return ("Welcome to the Sentiment Analyzer. "
            "Use /analyze/text to get the sentiment")


@app.get('/analyze/<input_txt>')
def analyze_sentiment(input_txt):
    scores = sia.polarity_scores(input_txt)
    print(scores)
    pos = float(scores['pos'])
    neg = float(scores['neg'])
    neu = float(scores['neu'])
    res = "positive"
    print("pos neg neu ", pos, neg, neu)
    if (neg > pos and neg > neu):
        res = "negative"
    elif (neu > neg and neu > pos):
        res = "neutral"

    # It is better practice to return a proper JSON response object
    response_data = {"sentiment": res}
    return response_data


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
