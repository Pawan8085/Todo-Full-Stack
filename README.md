# Todo Full Stack

A full-stack Todo application built with **React**, **Node.js**, **Express.js**, and **MySQL**. The application allows users to securely manage their daily tasks with authentication, CRUD operations, search, pagination, sorting, and more.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Get Logged-in User

### Todo Management
- Create Todo
- Update Todo
- Delete Todo
- View All Todos
- Mark Todo as Complete/Incomplete
- Search Todos
- Pagination
- Sorting

### Other Features
- Input Validation
- Password Hashing using bcrypt
- Global Error Handling
- Environment Variable Support

---

# 🛠 Tech Stack

## Frontend
- React
- React Router
- Redux Toolkit
- Axios
- Tailwind CSS

## Backend
- Node.js
- Express.js
- MySQL
- JWT (JSON Web Token)
- bcrypt
- mysql2
- dotenv
- express-validator
- cors

---

# 📂 Project Structure

```
todo-full-stack/
│
├── todo-frontend/
│
└── todo-backend/
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/<your-github-username>/todo-full-stack.git
cd todo-full-stack
```

---

## 2. Backend Setup

```bash
cd todo-backend
npm install
```

### Create a `.env` file

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=todo_db
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
```

### Run Backend

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd ../todo-frontend
npm install
npm run dev
```

The frontend currently does not require any environment variables.

---

# 🗄 Database

**Database:** MySQL

Create a database named:

```sql
todo_db
```

Import or create the required tables before running the application.

---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|----------------|-------------------------|
| POST | `/user/signup` | Register a new user |
| POST | `/user/login` | Login user |
| GET | `/user/me` | Get logged-in user |

---

## Todos

| Method | Endpoint | Description |
|----------|----------------|-------------------------|
| POST | `/todos` | Create Todo |
| GET | `/todos` | Get All Todos |
| GET | `/todos/:id` | Get Single Todo |
| PUT | `/todos/:id` | Update Todo |
| DELETE | `/todos/:id` | Delete Todo |

---

# 🔍 Query Parameters

The **GET /todos** endpoint supports the following query parameters:

| Parameter | Type | Default | Description |
|------------|------|----------|-------------|
| page | Number | 1 | Current page number |
| limit | Number | 10 | Number of todos per page |
| search | String | "" | Search todos by title |
| completed | Boolean | null | Filter completed/incomplete todos |
| sort | String | id | Sort field |
| order | String | desc | Sort order (`asc` or `desc`) |

### Example

```
GET /todos?page=1&limit=10&search=react&completed=false&sort=id&order=desc
```

---

# 🔒 Authentication

Protected routes require a JWT token in the Authorization header.

```
Authorization: Bearer <your_jwt_token>
```

---

# ▶️ Running the Application

### Start Backend

```bash
cd todo-backend
npm run dev
```

### Start Frontend

```bash
cd todo-frontend
npm run dev
```

---
