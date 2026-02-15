FROM python:3.9.18-slim-bookworm

WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

RUN chmod +x /python-docker/entrypoint.sh

ENTRYPOINT ["sh", "/python-docker/entrypoint.sh"]

CMD ["gunicorn", "djangoproj.wsgi:application", "--bind", "0.0.0.0:${PORT:-8000}", "--workers", "${WEB_CONCURRENCY:-2}"]
