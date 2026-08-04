### Name: John Jacob  
### UID: 24BCF10037

---

# JWT Token Authentication Demo

This project is a small React + Vite experiment that demonstrates how JWT-style authentication can be handled in a frontend app. The goal is to show the flow of login, token storage, route protection, and role-based access without using a real backend.

## Approach Used

This demo uses a simple frontend-only authentication approach:

- A login screen lets the user choose between a normal user and an admin.
- On successful login, a fake token and role are stored in localStorage.
- The app uses React Router to protect routes such as /dashboard and /admin.
- A ProtectedRoute component checks whether a token exists and whether the user has the correct role before allowing access.
- Redux Toolkit is included for state management, though the demo mainly uses localStorage for the authentication state.

This is a learning-focused experiment, so the token is not verified with a real server or JWT signature validation.

## Project Structure

- src/pages: login, user dashboard, and admin dashboard pages
- src/components: reusable UI components such as the login form and protected route wrapper
- src/features/auth: authentication state and token helpers
- src/app: Redux store setup

## How to Run the Experiment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the local Vite URL shown in the terminal, usually:
   ```bash
   http://localhost:5173
   ```

## Demo Credentials

Use these credentials to test the flow:

- User:
  - Email: user@gmail.com
  - Password: user123

- Admin:
  - Email: admin@gmail.com
  - Password: admin123

## What You Will Observe

- Logging in as a user redirects to the user dashboard.
- Logging in as an admin redirects to the admin dashboard.
- Visiting a protected route without a valid token redirects back to the login page.
- Logging out removes the stored token and role from localStorage.

## Notes

This project is meant for understanding authentication concepts and route protection in a frontend app. It does not represent a production-ready JWT implementation.
