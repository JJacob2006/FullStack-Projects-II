// src/tests/calendar.test.jsx

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import postReducer from "../features/posts/postSlice";
import Home from "../pages/Home";

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

describe("Calendar Component", () => {
  it("renders the calendar page heading", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(
      screen.getByText("Social Media Post Scheduler")
    ).toBeInTheDocument();
  });
});