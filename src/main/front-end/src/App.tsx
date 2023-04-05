import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/login-page";
import { MainPage } from "./components/main-page";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}>
                    <Route index element={<MainPage />} />
                    <Route path="main" element={<MainPage />} />
                    <Route path="register" element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
