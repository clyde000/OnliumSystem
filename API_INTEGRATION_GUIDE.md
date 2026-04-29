# Backend API Integration Guide

This document provides comprehensive guidance on using the backend API integration setup in the Onlium System project.

## Table of Contents

1. [Environment Setup](#environment-setup)
2. [Authentication](#authentication)
3. [API Services](#api-services)
4. [Custom Hooks](#custom-hooks)
5. [Protected Routes](#protected-routes)
6. [Error Handling](#error-handling)
7. [Making API Calls](#making-api-calls)
8. [Best Practices](#best-practices)

## Environment Setup

### Configuration Files

All API configuration is managed through environment variables. Create a `.env` file in the root directory:

```env
# Backend API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000

# Environment
VITE_ENVIRONMENT=development

# Features
VITE_ENABLE_MOCK_API=false
```

**Environment Variables:**

- `VITE_API_URL`: Base URL for your backend API
- `VITE_API_TIMEOUT`: Request timeout in milliseconds
- `VITE_ENVIRONMENT`: Current environment (development/production)
- `VITE_ENABLE_MOCK_API`: Toggle mock API for development

## Authentication

### Setting Up Authentication

The authentication system uses React Context to manage global auth state.

#### 1. AuthProvider Setup (Already configured in App.jsx)

```jsx
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>{/* Routes */}</AuthProvider>
    </BrowserRouter>
  );
}
```

#### 2. Using the useAuth Hook

```jsx
import { useAuth } from "./hooks/useAuth";

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      console.log("Login successful:", result.user);
    } else {
      console.error("Login failed:", result.error);
    }
  };

  return (
    <div>
      {isAuthenticated() ? (
        <p>Welcome, {user?.firstName}</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Auth Service Methods

Located in `src/services/authService.js`:

```javascript
// Login
const result = await authService.login(email, password);
// Returns: { success: true, user: {...} } or { success: false, error: '...' }

// Register
const result = await authService.register(userData);

// Logout
await authService.logout();

// Get current user
const user = authService.getCurrentUser();

// Check authentication
const isAuth = authService.isAuthenticated();

// Get user role
const role = authService.getUserRole();

// Change password
const result = await authService.changePassword(currentPassword, newPassword);
```

## API Services

### Available Services

All services return a consistent response format:

```javascript
{ success: true, data: {...} }
// or
{ success: false, error: 'Error message' }
```

#### authService

Located in `src/services/authService.js`

- `login(email, password)`
- `register(userData)`
- `logout()`
- `getCurrentUser()`
- `isAuthenticated()`
- `getUserRole()`
- `changePassword(currentPassword, newPassword)`
- `verifyEmail(token)`

#### studentService

Located in `src/services/studentService.js`

- `getDashboard()`
- `getProfile()`
- `getAppointments()`
- `getNotifications()`
- `getResources()`
- `getStudyLoad()`
- `getEnrollment()`

#### adminService

Located in `src/services/adminService.js`

- `getDashboard()`
- `getStudents(params)`
- `getStudent(id)`
- `getResources()`
- `getCurriculum()`
- `getBulletins()`
- `createBulletin(bulletinData)`
- `getAppointments()`

#### enrollmentService

Located in `src/services/enrollmentService.js`

- `getEnrollments(params)`
- `createEnrollment(enrollmentData)`
- `getEnrollment(id)`
- `updateEnrollment(id, enrollmentData)`
- `submitRequirements(id, formData)`
- `getSchedules(programId)`
- `deleteEnrollment(id)`

### Making API Calls

#### Using Services Directly

```jsx
import { studentService } from "./services/studentService";

function Dashboard() {
  const [appointments, setAppointments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const result = await studentService.getAppointments();
      if (result.success) {
        setAppointments(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <div>{/* render appointments */}</div>;
}
```

#### Using the useFetch Hook

```jsx
import { useFetch } from "./hooks/useFetch";
import { studentService } from "./services/studentService";

function Dashboard() {
  const {
    data: appointments,
    loading,
    error,
  } = useFetch(() => studentService.getAppointments(), []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <div>{/* render appointments */}</div>;
}
```

## Custom Hooks

### useAuth

Access authentication state globally

```jsx
const { user, loading, error, login, logout, register, isAuthenticated } =
  useAuth();
```

### useAuthorization

Check if user has required roles

```jsx
const isAuthorized = useAuthorization(["admin", "moderator"]);
```

### useFetch

Fetch data from API endpoints

```jsx
const { data, loading, error } = useFetch(
  () => studentService.getDashboard(),
  [], // dependencies array
);
```

## Protected Routes

### AdminRoute

Only accessible by admin users

```jsx
<AdminRoute>
  <AdminDashboard />
</AdminRoute>
```

### StudentRoute

Only accessible by student users

```jsx
<StudentRoute>
  <OnliumDashboard />
</StudentRoute>
```

### ProtectedRoute

Requires authentication, optional role checking

```jsx
<ProtectedRoute requiredRoles={["admin", "student"]}>
  <SomeComponent />
</ProtectedRoute>
```

### PublicRoute

Redirects to dashboard if already authenticated

```jsx
<PublicRoute>
  <LoginPage />
</PublicRoute>
```

## Error Handling

### Error Handler Utilities

Located in `src/utils/errorHandler.js`:

```javascript
import {
  handleApiError,
  getErrorMessage,
  isAuthError,
  isNotFoundError,
  isValidationError,
} from "./utils/errorHandler";

try {
  const result = await apiCall();
} catch (error) {
  const errorInfo = handleApiError(error);
  console.error(errorInfo.message);

  if (isAuthError(error)) {
    // Handle auth error - redirect to login
  } else if (isNotFoundError(error)) {
    // Handle not found
  } else if (isValidationError(error)) {
    // Handle validation errors
  }
}
```

### API Client Interceptors

The axios instance includes automatic error handling:

- **Request Interceptor**: Adds auth token to all requests
- **Response Interceptor**: Handles token refresh on 401 errors

## Making API Calls

### Example: Fetching Student Dashboard

```jsx
import { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { studentService } from "./services/studentService";
import { getErrorMessage } from "./utils/errorHandler";

function Dashboard() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await studentService.getDashboard();
        if (result.success) {
          setDashboard(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboard();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Welcome, {user?.firstName}</h1>
      {/* Display dashboard data */}
    </div>
  );
}

export default Dashboard;
```

### Example: Posting Enrollment Data

```jsx
import { useState } from "react";
import { enrollmentService } from "./services/enrollmentService";

function EnrollmentForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    const result = await enrollmentService.createEnrollment(formData);

    if (result.success) {
      console.log("Enrollment created:", result.data);
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
        const formData = new FormData(e.target);
        handleSubmit(Object.fromEntries(formData));
      }}
    >
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default EnrollmentForm;
```

### Example: File Upload

```jsx
import { useState } from "react";
import { enrollmentService } from "./services/enrollmentService";

function RequirementsUpload({ enrollmentId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    const fileInput = e.target.querySelector('input[type="file"]');

    if (fileInput.files[0]) {
      formData.append("file", fileInput.files[0]);

      const result = await enrollmentService.submitRequirements(
        enrollmentId,
        formData,
      );

      if (result.success) {
        console.log("File uploaded successfully");
      } else {
        setError(result.error);
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleFileSubmit}>
      <input type="file" required />
      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default RequirementsUpload;
```

## Best Practices

### 1. Always Use Services

- Don't make direct axios calls
- Use provided services for consistency
- Services handle error formatting

### 2. Handle Loading and Error States

```jsx
if (loading) return <LoadingSpinner />;
if (error) return <ErrorBoundary error={error} />;
return <Content data={data} />;
```

### 3. Use Custom Hooks

- `useAuth()` for authentication
- `useFetch()` for data fetching
- `useAuthorization()` for role checking

### 4. Protect Routes Based on Roles

```jsx
<AdminRoute>
  <AdminPanel />
</AdminRoute>
```

### 5. Store Sensitive Data Safely

- Tokens stored in localStorage
- User data stored in context
- No sensitive data in URL

### 6. Implement Proper Error Messages

- Use error utilities for consistent error handling
- Display user-friendly error messages
- Log errors for debugging

### 7. Use Environment Variables

- Never hardcode API URLs
- Use `import.meta.env.VITE_*` for Vite env vars
- Keep .env file out of version control

### 8. Handle Token Refresh

- Automatic token refresh on 401 errors
- Manual logout if refresh fails
- Redirect to login on auth failure

### 9. Use FormData for File Uploads

```jsx
const formData = new FormData();
formData.append("file", file);
// Submit via multipart/form-data
```

### 10. Validate Input Data

```javascript
import { validationUtil } from "./utils/validationUtil";

if (!validationUtil.isValidEmail(email)) {
  setError("Invalid email address");
  return;
}
```

## Constants Reference

### API Endpoints

Located in `src/constants/apiConstants.js`:

- `API_ENDPOINTS` - All backend routes
- `API_RESPONSE_CODES` - Standard HTTP status codes
- `ERROR_MESSAGES` - Predefined error messages
- `STORAGE_KEYS` - localStorage key names
- `USER_ROLES` - User role constants

### Example:

```jsx
import { API_ENDPOINTS, USER_ROLES } from "./constants/apiConstants";

const adminUrl = API_ENDPOINTS.ADMIN.DASHBOARD;
const isAdmin = userRole === USER_ROLES.ADMIN;
```

## Troubleshooting

### CORS Errors

- Ensure backend allows requests from frontend URL
- Check `VITE_API_URL` environment variable
- Verify API server is running

### Authentication Failures

- Verify backend login endpoint returns correct token format
- Check token storage and retrieval
- Ensure token is sent in Authorization header

### 401 Unauthorized Errors

- Automatic token refresh is attempted
- If refresh fails, user is logged out
- Check token expiration settings on backend

### API Timeouts

- Increase `VITE_API_TIMEOUT` in `.env`
- Check backend performance
- Verify network connection

## Next Steps

1. Configure backend API URL in `.env` file
2. Implement actual backend endpoints following the API service patterns
3. Test each API service with real backend
4. Update components to use new API calls
5. Implement data validation and error handling
