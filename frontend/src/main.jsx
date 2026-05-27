import React from "react";
import ReactDOM from "react-dom/client";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import "antd/dist/reset.css";

import Login from "./pages/Login";

function Dashboard() {
    return <h1>Dashboard</h1>;
}

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <BrowserRouter>

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

        </Routes>

    </BrowserRouter>

);