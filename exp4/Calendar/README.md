#### Name: John Jacob       UID: 24BCF10037      Section: 24BCF-1(A)

# Calendar4 — Interactive React Calendar & Post Scheduler

## Project Overview

Calendar4 is a React-based interactive calendar application developed using Vite. The project demonstrates how a calendar interface can be combined with a social media post scheduling system.

The application allows users to create, view, edit, and delete posts while displaying scheduled posts as events on an interactive calendar.

The project also demonstrates concepts such as React component-based development, Redux state management, performance optimization, and interactive UI handling.

---

## Aim

To optimize rendering performance and implement testing strategies for interactive UI components.

---

## Objectives

- To understand performance bottlenecks in interactive UI systems.
- To optimize rendering using memoization techniques.
- To reduce unnecessary component re-renders.
- To implement interactive calendar functionality.
- To understand component-level optimization.
- To implement testing for UI components and application logic.

---

## Technologies Used

- React.js
- Vite
- JavaScript
- Redux Toolkit
- React Redux
- React Big Calendar
- date-fns
- Axios
- Vitest
- React Testing Library
- CSS

---

## How It Works

- The application is built using React and Vite.
- React Big Calendar is used to display the interactive calendar.
- Users can create posts by entering a title, description, platform, status, date, and time.
- Posts are displayed as events on the calendar according to their scheduled date and time.
- Clicking a calendar event displays its details.
- Posts can be edited or deleted through the post management interface.
- Redux Toolkit is used to manage the application's post state.
- API-related operations are handled through the API helper files.
- CSS is used to provide a customized vintage-style calendar interface.
- Memoization and optimized state handling are used to reduce unnecessary rendering.

---

## Performance Optimization

The project applies React optimization techniques such as:

### useMemo

`useMemo` is used to cache expensive calculations and prevent them from being repeated unnecessarily when unrelated parts of the component update.

### React.memo

`React.memo` can be used for components that do not need to re-render when their props remain unchanged.

### useCallback

`useCallback` can be used to maintain stable function references when passing functions to child components.

These techniques help improve the performance of interactive components such as calendars and post lists.

---

## Testing

Testing is used to verify the functional correctness and reliability of the application.

The project includes testing tools such as:

- Vitest
- React Testing Library

Tests can be used to verify:

- Component rendering
- Post creation
- Post editing
- Post deletion
- Calendar interactions
- User input
- Application logic

To run tests:

    npx vitest

---

## Start (Development)

### Prerequisites

- Node.js
- npm

Node.js version 16 or higher is recommended.

### 1. Install dependencies

    npm install

### 2. Start the development server

    npm run dev

### 3. Open the application

Open the local development URL shown by Vite, usually:

    http://localhost:5173

---

## Available Scripts

The following commands are available through `package.json`:

- `npm run dev` — Start the Vite development server.
- `npm run build` — Create a production build.
- `npm run preview` — Preview the production build.
- `npm run lint` — Run ESLint.

To run tests:

    npx vitest

---

## Features

### Interactive Calendar

- View scheduled posts in a monthly calendar.
- Navigate between different months.
- Select and inspect calendar events.
- View scheduled post information directly from the calendar.

### Post Management

- Create new posts.
- Add post title and description.
- Select social media platform.
- Select post status.
- Set date and time.
- Edit existing posts.
- Delete posts.

### State Management

Redux Toolkit is used to manage application state and keep post information synchronized between components.

### Responsive Interface

The application uses CSS media queries to provide a responsive layout for different screen sizes.

### Custom UI

The calendar uses a customized vintage-inspired dark theme with a background image and styled calendar controls.

---

## Project Structure

Important project files include:

    calendar4/
    │
    ├── public/
    │   ├── calendar-bg.jpg
    │   ├── favicon.svg
    │   └── icons.svg
    │
    ├── src/
    │   ├── Api/
    │   ├── assets/
    │   ├── components/
    │   ├── features/
    │   ├── pages/
    │   ├── tests/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    │
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── vite.config.js

### Important Files

- `src/App.jsx` — Main application component.
- `src/App.css` — Main application and calendar styling.
- `src/index.css` — Global styles.
- `src/main.jsx` — React application entry point.
- `src/components/` — Reusable React components.
- `src/features/` — Redux Toolkit state management.
- `src/Api/` — API-related functions.
- `src/pages/` — Application pages.
- `src/tests/` — Testing files.
- `public/calendar-bg.jpg` — Background image used for the calendar.

---

## Academic Insight

Interactive applications such as calendars can require frequent UI updates. If components are unnecessarily re-rendered or expensive calculations are repeated, application performance can decrease.

React optimization techniques such as `useMemo`, `useCallback`, and `React.memo` help reduce unnecessary work.

Testing complements performance optimization by ensuring that changes made to improve performance do not break existing functionality.

Therefore, this experiment demonstrates the combination of:

- Interactive UI development
- Performance optimization
- State management
- Component testing
- User interaction handling

These concepts are important for developing reliable, maintainable, and scalable React applications.

---

## Learning Outcomes

After completing this experiment, the following concepts were understood:

- Working with interactive React components.
- Creating an interactive calendar using React Big Calendar.
- Managing application state using Redux Toolkit.
- Understanding unnecessary component re-renders.
- Using memoization for performance optimization.
- Implementing UI testing using modern testing tools.
- Handling user interactions in React applications.
- Structuring a React project into reusable components.

---

## Notes

- `node_modules` is not included in the repository because it can be recreated using `npm install`.
- The `package.json` and `package-lock.json` files are required to install project dependencies.
- The calendar background image is stored inside the `public/` folder.
- Tests can be executed using `npx vitest`.

---

Name: John Jacob      UID: 24BCF10037      Section: 24BCF-1(A)