// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import postReducer from "./features/posts/postSlice";

import App from "./App";

import "./index.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);