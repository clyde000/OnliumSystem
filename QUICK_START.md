# Quick Start Guide

This guide helps you get started with the backend API integration in the Onlium System.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Common Patterns](#common-patterns)
4. [Running Your Application](#running-your-application)
5. [Next Steps](#next-steps)

## Installation

All dependencies have been installed. If you need to reinstall:

```bash
npm install
```

## Configuration

### Step 1: Set Up Environment Variables

Create a `.env` file in the root directory with your backend API configuration:

```env
# Backend API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000

# Environment
VITE_ENVIRONMENT=development

# Features
VITE_ENABLE_MOCK_API=false
```

### Step 2: Start Your Backend

Ensure your backend API is running:

```bash
# Example for Express.js backend
cd backend
npm start
# Should be running on http://localhost:3000
```

### Step 3: Start the Frontend

```bash
npm run dev
# Frontend should be running on http://localhost:5173
```

## Common Patterns

### Using Authentication

Import the `useAuth` hook to access authentication:

```jsx
import { useAuth } from "./hooks/useAuth";

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      // Login successful
    }
  };

  return (
    <>
      {isAuthenticated() ? (
        <p>Welcome, {user?.firstName}</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </>
  );
}
```

### Fetching Data

Use the `useFetch` hook for simple data fetching:

```jsx
import { useFetch } from "./hooks/useFetch";
import { studentService } from "./services/studentService";

function MyDashboard() {
  const { data, loading, error } = useFetch(
    () => studentService.getDashboard(),
    [], // dependencies
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{/* render data */}</div>;
}
```

### Posting Data

Handle form submissions with API calls:

```jsx
import { enrollmentService } from "./services/enrollmentService";

function EnrollmentForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    const result = await enrollmentService.createEnrollment(formData);

    if (result.success) {
      // Handle success
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(/* form data */);
      }}
    >
      {/* form fields */}
    </form>
  );
}
```

### File Uploads

Submit files using FormData:

```jsx
const handleFileUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const result = await enrollmentService.submitRequirements(
    enrollmentId,
    formData,
  );

  if (result.success) {
    console.log("File uploaded");
  } else {
    console.error(result.error);
  }
};
```

### Protected Routes

Use route protection based on authentication and roles:

```jsx
<Route
  path="/admin/dashboard"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

<Route
  path="/student/dashboard"
  element={
    <StudentRoute>
      <StudentDashboard />
    </StudentRoute>
  }
/>
```

## Running Your Application

### Development

```bash
# Terminal 1: Start backend (if running locally)
cd backend
npm start

# Terminal 2: Start frontend
npm run dev
```

### Building for Production

```bash
npm run build
npm run preview
```

## Available Services

### Authentication Service

```javascript
import { authService } from "./services";

await authService.login(email, password);
await authService.register(userData);
await authService.logout();
```

### Student Service

```javascript
import { studentService } from "./services";

await studentService.getDashboard();
await studentService.getProfile();
await studentService.getAppointments();
await studentService.getNotifications();
```

### Admin Service

```javascript
import { adminService } from "./services";

await adminService.getDashboard();
await adminService.getStudents();
await adminService.createBulletin(bulletinData);
```

### Enrollment Service

```javascript
import { enrollmentService } from "./services";

await enrollmentService.createEnrollment(data);
await enrollmentService.submitRequirements(id, formData);
await enrollmentService.getSchedules(programId);
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ProtectedRoute.jsx
│   ├── layout/
│   ├── enrollment/
│   └── examples/       # Example components
├── context/            # Context providers
│   └── AuthContext.jsx
├── hooks/              # Custom React hooks
│   ├── useAuth.js
│   ├── useAuthorization.js
│   └── useFetch.js
├── services/           # API services
│   ├── apiClient.js
│   ├── authService.js
│   ├── studentService.js
│   ├── adminService.js
│   └── enrollmentService.js
├── constants/          # Constants and config
│   └── apiConstants.js
├── utils/              # Utility functions
│   ├── errorHandler.js
│   ├── storageUtil.js
│   └── validationUtil.js
├── pages/              # Page components
├── App.jsx
└── main.jsx
```

## Troubleshooting

### API Connection Issues

1. Check that backend is running on the correct port
2. Verify `VITE_API_URL` environment variable
3. Check browser console for network errors

### Authentication Issues

1. Verify login endpoint returns correct token format
2. Check that token is being stored in localStorage
3. Verify Authorization header is being sent

### CORS Errors

1. Check backend CORS configuration
2. Ensure frontend URL is allowed
3. Verify `Access-Control-Allow-Origin` header

### 401 Unauthorized

1. Token may have expired
2. Check token refresh endpoint
3. Verify user is properly authenticated

## Example Components

Check out example implementations in `src/components/examples/`:

- `ExampleLogin.jsx` - Login form with API integration
- `ExampleDashboard.jsx` - Data fetching with useFetch
- `ExampleEnrollment.jsx` - Form submission with file upload

## Next Steps

1. ✅ Environment setup complete
2. ✅ API infrastructure ready
3. ✅ Authentication configured
4. ⏭️ Implement backend endpoints
5. ⏭️ Update components to use API calls
6. ⏭️ Test all flows end-to-end
7. ⏭️ Deploy to production

## Resources

- [API Integration Guide](./API_INTEGRATION_GUIDE.md)
- [Backend Setup Guide](./BACKEND_SETUP.md)
- [Axios Documentation](https://axios-http.com/)
- [React Router Documentation](https://reactrouter.com/)
- [React Context API](https://react.dev/reference/react/useContext)

## Support

For questions about specific implementation details, refer to:

1. Example components in `src/components/examples/`
2. API_INTEGRATION_GUIDE.md for detailed patterns
3. Service files in `src/services/` for available methods
4. Hooks in `src/hooks/` for custom utilities
