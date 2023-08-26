import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { EmployeeProvider } from "./contexts/EmployeeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <EmployeeProvider>
                <App />
            </EmployeeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
