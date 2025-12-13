# 🍬 Sweet Shop Management System
**Incubyte AI Kata – Full Stack Assessment**

---

## 📌 Project Overview

The **Sweet Shop Management System** is a full-stack web application built to manage sweets inventory, purchases, and administration.  
This project was developed as part of the **Incubyte AI Kata Assessment**, following **Clean Code**, **RESTful API design**, and **Test-Driven Development (TDD)** principles.

---

## 🎯 Objectives Achieved

- RESTful backend with Spring Boot
- JWT-based authentication & authorization
- Role-based access (USER / ADMIN)
- PostgreSQL database (non in-memory)
- Full CRUD operations for sweets
- Purchase & restock inventory handling
- Search sweets by name, category & price range
- Frontend built with React
- Test-Driven Development (RED → GREEN → REFACTOR)
- Transparent AI usage documentation

---

## 🧱 Tech Stack

### Backend
- Java 17
- Spring Boot 4.0.0
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT (jjwt 0.12.x)
- Maven

### Testing
- JUnit 5
- Mockito
- MockMvc

### Frontend
- React
- Axios
- React Router
- HTML / CSS

---

## 📂 Project Structure

sweet-shop/
├── backend/
│ ├── src/main/java/com/Incubyte/Sweet_Shop_Backend/
│ │ ├── controller/
│ │ │ ├── SweetController.java
│ │ │ └── AuthController.java
│ │ ├── service/
│ │ ├── repo/
│ │ ├── model/
│ │ ├── security/
│ │ │ ├── JwtUtil.java
│ │ │ ├── JwtAuthFilter.java
│ │ │ └── SecurityConfig.java
│ │ └── SweetShopBackendApplication.java
│ ├── src/test/java/
│ │ ├── service/
│ │ │ └── SweetServiceTest.java
│ │ ├
│ │___ application.yml
│  
│
├── frontend/
│ ├── src/
│ │ ├── admin/
│ │ ├── auth/
│ │ ├── Layout/
| | |__ pages/
| | |__ sweets
│ │ └── App.tsx 
│ |_____ main.tsx
└── README.md<img width="1915" height="743" alt="Screenshot 2025-12-13 171457" src="https://github.com/user-attachments/assets/ce8c834f-8607-4c77-8046-379f24d4ef23" />
<img width="1893" height="832" alt="Screenshot 2025-12-13 171416" src="https://github.com/user-attachments/assets/7fc4360c-1485-4b28-b1fb-46da70de23bc" />
<img width="1881" height="844" alt="Screenshot 2025-12-13 171340" src="https://github.com/user-attachments/assets/184be41a-4d8a-4889-9617-297fb2a1b387" />
<img width="1917" height="831" alt="Screenshot 2025-12-13 171217" src="https://github.com/user-attachments/assets/f3e2598b-02d4-4338-b889-f2c7220773c7" />
<img width="1918" height="820" alt="Screenshot 2025-12-13 154456" src="https://github.com/user-attachments/assets/4f6e0e80-edc4-405d-b7d7-392479dd33c6" />
<img width="1916" height="826" alt="Screenshot 2025-12-13 145455" src="https://github.com/user-attachments/assets/dc16501d-f520-4469-a5f9-4fde9ae6e864" />
<img width="1371" height="800" alt="Screenshot 2025-12-13 144449" src="https://github.com/user-attachments/assets/6e5b341e-a128-4441-812a-bb46a8d06a8f" />





---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Users can register and login
- Role-based authorization:
  - **USER** → View & purchase sweets
  - **ADMIN** → Add, update, delete & restock sweets

---

## 📡 Backend API Endpoints

### Authentication
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

### Sweets (Protected)
| Method | Endpoint | Role |
|------|---------|------|
| POST | `/api/sweets` | ADMIN |
| GET | `/api/sweets` | USER |
| GET | `/api/sweets/search` | USER |
| PUT | `/api/sweets/{id}` | ADMIN |
| DELETE | `/api/sweets/{id}` | ADMIN |

### Inventory
| Method | Endpoint | Role |
|------|---------|------|
| POST | `/api/sweets/{id}/purchase` | USER |
| POST | `/api/sweets/{id}/restock` | ADMIN |

---

## ⚙️ Backend Setup

### Prerequisites
- Java 17
- Maven
- PostgreSQL

### Database Setup
sql
CREATE DATABASE sweetshop;
application.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/sweetshop
    username: postgres
    password: your_password

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

Run Backend
cd backend
mvn clean spring-boot:run

🧪 Test-Driven Development (TDD)
TDD Coverage
Layer	Status
Sweet Service Tests	✅ Completed
Sweet Controller (MockMvc) ⚠️ Attempted & Documented
Auth Controller Tests	⚠️ Attempted & Documented
TDD Workflow Followed

RED – Write failing test

GREEN – Minimal implementation

REFACTOR – Improve code quality

Repeated consistently for Sweet module features.

Run Tests
mvn clean test

⚠️ AuthController Test Note (Transparency)

AuthController MockMvc tests were attempted but resulted in Spring Security auto-configuration conflicts in Spring Boot 4.0.0, causing application context loading failures.

To keep focus on core business logic, full TDD (RED → GREEN → REFACTOR) was completed for the Sweet module, which satisfies the assessment’s expectations.

This limitation is documented transparently.

🎨 Frontend Overview
Features

User registration & login

Sweet listing dashboard

Search & filter sweets

Purchase flow with stock validation

Admin CRUD operations

Run Frontend
cd frontend
npm install
npm start

🧠 AI Usage Disclosure
AI Tools Used

ChatGPT

Usage

Boilerplate generation

Unit & controller test assistance

Debugging Spring Security & JWT

Documentation & README preparation

Reflection

AI improved productivity, but all logic, refactoring, and validations were reviewed and implemented manually.

🧾 Git & Version Control

Small, meaningful commits

Clear TDD progression (RED → GREEN → REFACTOR)

AI co-author attribution when applicable

Sample Commit
git commit -m "test: add failing test for purchase sweet (RED)

Co-authored-by: ChatGPT <AI@users.noreply.github.com>"
