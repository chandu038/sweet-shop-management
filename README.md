# 🍬 Sweet Shop Management System
**Incubyte AI Kata – Full Stack Assessment**
----

---
**(name changed from Sweet Haven to SweetShop)**

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

**Frontend**:https://693e4ee154739a6a7f5a8281--symphonious-speculoos-5dac63.netlify.app/login

- React
- Axios
- React Router
- HTML / CSS
- TailwindCss

---

## 📂 Project Structure
sweet-shop/
├── backend/
│   ├── src/main/java/com/Incubyte/Sweet_Shop_Backend/
│   │   ├── controller/
│   │   │   ├── SweetController.java
│   │   │   └── AuthController.java
│   │   ├── service/
│   │   ├── repo/
│   │   ├── model/
│   │   ├── security/
│   │   │   ├── JwtUtil.java
│   │   │   ├── JwtAuthFilter.java
│   │   │   └── SecurityConfig.java
│   │   └── SweetShopBackendApplication.java
│   ├── src/test/java/
│   │   ├── service/
│   │   │   └── SweetServiceTest.java
│   │   └── controller/
│   │       └── SweetControllerTest.java
│   └── application.yml
│
├── frontend/
│   ├── src/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── sweets/
│   │   ├── App.tsx
│   │   └── main.tsx
│
└── README.md

---

## 🖼️ Screenshots

Below are screenshots of the application. The first image is the Admin page (dashboard) for reference.

<div style="display:flex;flex-wrap:wrap;gap:12px;">
  <figure style="flex:1 1 32%;min-width:240px;">
    <img alt="Admin Page - Dashboard" src="https://github.com/user-attachments/assets/d3bb0770-18c4-4824-b500-7d6e0ea99129" style="width:100%;border:1px solid #ddd;border-radius:6px;" />
    <figcaption style="text-align:center;font-size:0.95rem;margin-top:6px;">Admin Page — Dashboard</figcaption>
  </figure>

  <figure style="flex:1 1 32%;min-width:240px;">
    <img alt="Sweets List" src="https://github.com/user-attachments/assets/fee7591a-b66e-4655-ba76-330d95f96c07" style="width:100%;border:1px solid #ddd;border-radius:6px;" />
    <figcaption style="text-align:center;font-size:0.95rem;margin-top:6px;">Sweets Listing</figcaption>
  </figure>

  <figure style="flex:1 1 32%;min-width:240px;">
    <img alt="Add Sweet Form" src="https://github.com/user-attachments/assets/a096aa86-e0db-4ae6-85fb-898e640faacb" style="width:100%;border:1px solid #ddd;border-radius:6px;" />
    <figcaption style="text-align:center;font-size:0.95rem;margin-top:6px;">Add / Edit Sweet</figcaption>
  </figure>

  <figure style="flex:1 1 32%;min-width:240px;">
    <img alt="Purchase Flow" src="https://github.com/user-attachments/assets/73ffe037-2748-4506-8b9f-3c8c4058f001" style="width:100%;border:1px solid #ddd;border-radius:6px;" />
    <figcaption style="text-align:center;font-size:0.95rem;margin-top:6px;">Purchase Flow / Checkout</figcaption>
  </figure>

  <figure style="flex:1 1 32%;min-width:240px;">
    <img alt="Search & Filter" src="https://github.com/user-attachments/assets/1a8d0cfa-faa6-4c2d-bfbd-05d23521b3e2" style="width:100%;border:1px solid #ddd;border-radius:6px;" />
    <figcaption style="text-align:center;font-size:0.95rem;margin-top:6px;">Search & Filters</figcaption>
  </figure>

  <figure style="flex:1 1 32%;min-width:240px;">
    <img alt="Admin - Inventory Management" src="https://github.com/user-attachments/assets/7b5fd013-26ed-438b-bbc0-96816baf0876" style="width:100%;border:1px solid #ddd;border-radius:6px;" />
    <figcaption style="text-align:center;font-size:0.95rem;margin-top:6px;">Inventory / Restock (Admin)</figcaption>
  </figure>
</div>

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


**Backend**:https://sweet-shop-management-i179.onrender.com

### Prerequisites
- Java 17
- Maven
- PostgreSQL

### Database Setup

Run this SQL to create the database:
```sql
CREATE DATABASE sweetshop;
```

<!-- Moved the two top images into the Database Setup section as requested -->
<div style="display:flex;gap:12px;flex-wrap:wrap;margin:12px 0;">
  <img width="1919" height="996" alt="Screenshot 2025-12-14 045002" src="https://github.com/user-attachments/assets/63812d72-bdf9-4fc5-9cbd-6308414fd7e7" style="max-width:48%;height:auto;border:1px solid #ddd;border-radius:6px;" />
  <img width="1897" height="1009" alt="Screenshot 2025-12-14 044949" src="https://github.com/user-attachments/assets/a7c82b12-5cc1-4cb8-8c01-3de7c5cf0105" style="max-width:48%;height:auto;border:1px solid #ddd;border-radius:6px;" />
</div>

-- Tables for users and sweets (example schema)
-- If you use Spring Data JPA with ddl-auto=update, Hibernate can create these for you.
-- The statements below are provided so you can create the schema manually if desired.

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'USER',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Sweets table
CREATE TABLE sweets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Optional indexes
CREATE INDEX idx_sweets_name ON sweets (name);
CREATE INDEX idx_sweets_category ON sweets (category);
```

Example application.yml datasource configuration:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/sweetshop
    username: postgres
    password: your_password

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

Run Backend
```bash
cd backend
mvn clean spring-boot:run
```

---

## 🧪 Test-Driven Development (TDD)

TDD Coverage
| Layer | Status |
|---|---|
| Sweet Service Tests | ✅ Completed |
| Sweet Controller (MockMvc) | ⚠️ Attempted & Documented |
| Auth Controller Tests | ⚠️ Attempted & Documented |

TDD Workflow Followed
- RED – Write failing test
- GREEN – Minimal implementation
- REFACTOR – Improve code quality

Run Tests
```bash
mvn clean test
```

⚠️ AuthController Test Note (Transparency)

AuthController MockMvc tests were attempted but resulted in Spring Security auto-configuration conflicts in Spring Boot 4.0.0, causing application context loading failures.

To keep focus on core business logic, full TDD (RED → GREEN → REFACTOR) was completed for the Sweet module, which satisfies the assessment’s expectations. This limitation is documented transpare[...]

---

## 🎨 Frontend Overview

Features
- User registration & login
- Sweet listing dashboard
- Search & filter sweets
- Purchase flow with stock validation
- Admin CRUD operations

Run Frontend
```bash
cd frontend
npm install
npm start
```

---

## 🧠 AI Usage Disclosure

AI Tools Used
- ChatGPT

Usage
- Boilerplate generation
- Unit & controller test assistance
- Debugging Spring Security & JWT
- Documentation & README preparation

Reflection
AI improved productivity, but all logic, refactoring, and validations were reviewed and implemented manually.

---

## 🧾 Git & Version Control

- Small, meaningful commits
- Clear TDD progression (RED → GREEN → REFACTOR)
- AI co-author attribution when applicable

Sample Commit
```bash
git commit -m "test: add failing test for purchase sweet (RED)

Co-authored-by: ChatGPT <AI@users.noreply.github.com>"
```
