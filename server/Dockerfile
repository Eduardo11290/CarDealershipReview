FROM python:3.9.18-slim-bookworm


WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
RUN ls
ENV FLASK_APP=app.py
CMD ["sh", "-c", "flask run --host=0.0.0.0 --port ${PORT:-5050}"]

