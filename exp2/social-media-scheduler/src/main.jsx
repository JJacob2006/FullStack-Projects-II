import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "./app/store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />

            <ToastContainer
                position="bottom-right"
                autoClose={2500}
                newestOnTop
                pauseOnHover
                theme="colored"
            />
        </Provider>
    </React.StrictMode>,
);
