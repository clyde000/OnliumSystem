# Backend Setup Guide

This document provides instructions for setting up and connecting your backend to this frontend.

## Prerequisites

- Node.js and npm installed
- Backend API server (Express.js, Django, etc.)
- Database setup (MongoDB, PostgreSQL, etc.)

## Backend Requirements

Your backend API should implement the following structure:

### Authentication Endpoints

#### POST `/api/auth/login`

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**

```json
{
  "accessToken": "jwt_token_here",
  "refreshToken": "refresh_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student"
  }
}
```

**Response (Error):**

```json
{
  "message": "Invalid email or password"
}
```

#### POST `/api/auth/register`

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**

```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student"
  }
}
```

#### POST `/api/auth/refresh`

**Request:**

```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response:**

```json
{
  "accessToken": "new_jwt_token"
}
```

#### POST `/api/auth/logout`

**Request:** (Requires Authorization header)

**Response:**

```json
{
  "message": "Logged out successfully"
}
```

### Student Endpoints

#### GET `/api/student/dashboard`

**Headers:** Authorization: Bearer {accessToken}

**Response:**

```json
{
  "stats": {
    "enrolledPrograms": 2,
    "completedCourses": 5,
    "upcomingAppointments": 3
  },
  "recentActivity": [...]
}
```

#### GET `/api/student/profile`

**Response:**

```json
{
  "id": "student_id",
  "email": "student@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "123-456-7890",
  "address": "..."
}
```

#### GET `/api/student/appointments`

**Response:**

```json
[
  {
    "id": "appointment_id",
    "date": "2026-05-15",
    "time": "10:00",
    "type": "Enrollment",
    "status": "scheduled"
  }
]
```

#### GET `/api/student/notifications`

**Response:**

```json
[
  {
    "id": "notification_id",
    "title": "Enrollment Reminder",
    "message": "Your enrollment deadline is approaching",
    "date": "2026-04-26",
    "read": false
  }
]
```

#### GET `/api/student/resources`

**Response:**

```json
[
  {
    "id": "resource_id",
    "title": "Course Material",
    "url": "resource_url",
    "type": "PDF"
  }
]
```

### Admin Endpoints

#### GET `/api/admin/dashboard`

**Response:**

```json
{
  "stats": {
    "totalStudents": 1248,
    "enrolled": 873,
    "pending": 127,
    "appointmentsToday": 18
  },
  "recentActivity": [...]
}
```

#### GET `/api/admin/students`

**Query Params:** page, limit, search, status

**Response:**

```json
{
  "data": [...],
  "total": 1248,
  "page": 1,
  "limit": 20
}
```

#### GET `/api/admin/students/:id`

**Response:**

```json
{
  "id": "student_id",
  "email": "student@example.com",
  "firstName": "John",
  "status": "enrolled",
  "enrolledPrograms": [...]
}
```

#### GET `/api/admin/resources`

**Response:**

```json
[
  {
    "id": "resource_id",
    "title": "Resource Title",
    "url": "resource_url"
  }
]
```

#### GET `/api/admin/curriculum`

**Response:**

```json
[
  {
    "id": "program_id",
    "name": "BSIT",
    "courses": [...]
  }
]
```

### Enrollment Endpoints

#### GET `/api/enrollment`

**Response:**

```json
[
  {
    "id": "enrollment_id",
    "studentId": "student_id",
    "programId": "program_id",
    "status": "pending",
    "createdAt": "2026-04-20"
  }
]
```

#### POST `/api/enrollment`

**Request:**

```json
{
  "studentId": "student_id",
  "programId": "program_id",
  "data": {...}
}
```

#### POST `/api/enrollment/:id/requirements`

**Request:** (multipart/form-data)

```
file: [binary file]
```

## Setting Up Your Backend

### Example: Express.js Backend

```javascript
// backend/server.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const adminRoutes = require("./routes/admin");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

### Environment Configuration

Create a `.env` file in your backend:

```env
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRY=24h
CORS_ORIGIN=http://localhost:5173
```

## Frontend Configuration

1. Update your `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
VITE_ENVIRONMENT=development
```

2. Start the frontend development server:

```bash
npm run dev
```

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  role ENUM('admin', 'student', 'moderator'),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Enrollments Table

```sql
CREATE TABLE enrollments (
  id UUID PRIMARY KEY,
  studentId UUID REFERENCES users(id),
  programId UUID,
  status ENUM('pending', 'approved', 'rejected', 'enrolled'),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Testing the API

### Using cURL

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get student dashboard (with token)
curl -X GET http://localhost:3000/api/student/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Import API endpoints into Postman
2. Set environment variable: `{{api_url}}` = `http://localhost:3000/api`
3. Set variable: `{{accessToken}}` from login response
4. Use `Authorization: Bearer {{accessToken}}` in headers

## Error Handling

Ensure your backend returns proper HTTP status codes:

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **401**: Unauthorized (invalid/expired token)
- **403**: Forbidden
- **404**: Not Found
- **500**: Server Error

Response format:

```json
{
  "message": "Error description",
  "errors": {
    "field": "Field-specific error"
  }
}
```

## Security Considerations

1. **HTTPS in Production**: Always use HTTPS for production
2. **CORS**: Configure CORS properly to only allow your frontend domain
3. **JWT Secret**: Use strong, unique JWT secrets
4. **Password Hashing**: Hash passwords with bcrypt or similar
5. **Rate Limiting**: Implement rate limiting on login endpoint
6. **Input Validation**: Validate all incoming data
7. **Token Expiry**: Set reasonable token expiration times

## Deployment

### Frontend Deployment

```bash
npm run build
# Deploy the dist folder to your hosting service
```

### Backend Deployment

- Use services like Heroku, AWS, DigitalOcean, etc.
- Update `VITE_API_URL` to your production backend URL
- Ensure CORS is configured for production domain

## Support

For issues or questions about API integration, refer to:

- [API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md)
- Axios documentation: https://axios-http.com/
- React Router documentation: https://reactrouter.com/
