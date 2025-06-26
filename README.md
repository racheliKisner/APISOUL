
# AI-Driven Learning Platform 🧠📚

## Overview

An AI-powered learning platform that allows users to:

* Register and log in  
* Select a category and sub-category  
* Submit prompts to the AI engine  
* Receive personalized lessons  
* View their learning history  
* Admin dashboard to view all users and their prompt histories  

The system is built using **FastAPI (Python)** for the backend, **React** for the frontend, **MySQL** as the database, and **Docker** for environment management.

---

## 🧱 Technologies Used

### Backend (FastAPI + Python)

* FastAPI  
* SQLAlchemy ORM  
* Pydantic  
* MySQL  
* Docker / Docker Compose  
* python-dotenv for configuration management  

### Frontend (React)

* React + Hooks (`useState`, `useEffect`)  
* React Router  
* Custom hooks (`usePromptSubmit`, `useCategories`)  
* Custom CSS styling  

---

## 📁 Project Structure (Backend)

```
app/
├── services/           # Business logic
├── schemas/            # Pydantic models for data validation
├── database/db.py      # Database connection
├── models.py           # SQLAlchemy models
├── main.py             # FastAPI app launcher
```


## 🌐 Example API Endpoints

### Users

* `POST /api/users/users` – Create a new user  
* `GET /api/users/users/{user_id}` – Get user by ID  
* `GET /api/users/users` – Get all users  

### Prompts

* `POST /api/prompts/prompts/` – Submit a prompt to AI  
* `GET /api/prompts/user/{user_id}` – Get prompt history for a user  

### Categories and Sub-Categories

* `GET /api/categories/categories` – Get all categories  
* `GET /api/sub_categories/sub_categories/category/{category_id}` – Get sub-categories by category  

---

## 🛠 Installation Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-learning-platform.git
cd ai-learning-platform
```

### 2. Create a `.env` file for the backend

```dotenv
# .env
DATABASE_URL=mysql+mysqlconnector://username:password@db:3306/ai_learning
OPENAI_API_KEY=sk-xxxxxx
```

1. Backend:  
   - Create and activate a Python virtual environment  
   - Install dependencies (`pip install -r backend/requirements.txt`)  
   - Create `.env` file  
   - Run with: `uvicorn backend.main:app --reload`

2. Frontend:  
   - Go to `client` folder  
   - Install dependencies (`npm install`)  
   - Start React server (`npm start`)

---

## 🧪 Example Usage Scenario

1. A user registers with a name and phone number  
2. Selects a category (e.g., "Science") and sub-category (e.g., "Space")  
3. Enters a prompt: "Teach me about black holes"  
4. The backend sends the request to OpenAI and returns a lesson  
5. The lesson is saved and accessible from the user's personal dashboard  

---


## 💡 Optional Features (Bonus)
 
* [ ] Admin filtering and pagination  
* [ ] Automatic Swagger/OpenAPI documentation   

---

## ✅ Future Improvements

* [ ] Improve mobile responsiveness  
* [ ] Client-side error handling (React Error Boundaries)  

---

## 🚀 Local Run Summary

```bash
# Backend
- Create and activate a Python virtual environment  
   - Install dependencies (`pip install -r backend/requirements.txt`)  
   - Create `.env` file  
   - Run with: `uvicorn backend.main:app --reload`

# Frontend
cd client
npm install
npm start
```

## ✨ Final summary

This is a full-stack AI-powered learning platform (mini MVP) built with FastAPI, React, MySQL, and Docker. It enables users to submit prompts by category, receive AI-generated lessons, and view learning history. Admins can view all users and their histories. The project follows clean architecture principles, modular design, environment configuration, and basic validation. Future enhancements may include JWT auth, testing, OpenAPI docs, and production deployment.

Good luck! 🎉
