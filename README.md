# TaskForge - Full Stack Task Manager

TaskForge is a beginner-friendly full stack web app built with:

- React (frontend)
- Node.js + Express (backend)
- MongoDB (database)
- JWT auth + role-based access control (user/admin)

## Features

### Authentication

- Register user
- Login user
- JWT token auth
- Logout endpoint
- Password hashing with bcrypt

### Role-Based Access

- `user`: can manage only their own tasks
- `admin`: can view all users and all tasks, and delete any task

### Task CRUD

- Create task
- Get all tasks (with search/filter/pagination)
- Get single task
- Update task
- Delete task

### UI

- Register page
- Login page
- Protected user dashboard
- Protected admin dashboard
- Toast notifications and loading spinners
- Responsive clean layout (white + navy/gray)

### Security

- JWT protected routes
- Role middleware
- Input validation (`express-validator`)
- Mongo sanitization and XSS cleaning
- Password hashing (`bcryptjs`)
- Helmet and CORS setup

### API Testing

- Swagger docs available at: `http://localhost:5000/api-docs`
- You can also test with Postman

## Project Structure

```bash
TaskForge/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   │   └── v1/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── main.jsx
│   └── .env.example
└── README.md
```

## Backend Setup

1. Go to backend folder:

```bash
cd backend
```

2. Create `.env` from `.env.example` and update values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

3. Install dependencies:

```bash
npm install
```

4. Start backend:

```bash
npm run dev
```

## Frontend Setup

1. Go to frontend folder:

```bash
cd frontend
```

2. Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

3. Install dependencies:

```bash
npm install
```

4. Start frontend:

```bash
npm run dev
```

## Main API Endpoints

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/logout`

### Tasks

- `POST /api/v1/tasks`
- `GET /api/v1/tasks`
- `GET /api/v1/tasks/:id`
- `PATCH /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`

### Admin

- `GET /api/v1/admin/users`
- `GET /api/v1/admin/tasks`
- `DELETE /api/v1/admin/tasks/:id`

## Notes

- Use `Authorization: Bearer <token>` for protected endpoints.
- Register at least one admin account to test admin dashboard.
- Admin role can be selected on registration in this project for demo/testing convenience.
