Here is the README.md file for the project, translated and adapted into English.

Fullstack Developer Capstone - Car Dealership Network
This is a comprehensive Full Stack web application designed to manage a network of car dealerships. The application allows users to browse dealerships, consult car inventories, and submit reviews, which are processed by a sentiment analysis microservice.

The project is containerized using Docker and orchestrated to run separate components for the frontend, backend, database, and auxiliary services.

🏗️ Project Architecture
The application is composed of several interconnected services:

Backend (Django):

Handles the core application logic, user authentication, and API serving.

Location: server/djangoapp

Frontend (React):

A Single Page Application (SPA) user interface built with React.

Allows navigation, login/registration, and posting reviews.

Location: server/frontend

Database & Inventory Service (Node.js/Express):

A separate service managing dealership and review data (stored in JSON/Mongo format).

Location: server/database

Sentiment Analysis Microservice (Python):

Analyzes the text of user-submitted reviews to determine if they are positive, negative, or neutral (utilizing vader_lexicon).

Location: server/djangoapp/microservices

🚀 Technologies Used
Languages: Python, JavaScript

Web Frameworks: Django (Python), Express (Node.js), React (JS)

Containerization: Docker, Docker Compose

Deployment: Kubernetes (deployment.yaml file included)

CI/CD: GitHub Actions (workflow defined in .github)

Other: Bootstrap (for styling), Gunicorn, Nginx (for static serving/proxy).
