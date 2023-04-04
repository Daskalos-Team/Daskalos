import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NewsFeedPage } from "./components/news-feed-page";
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
                <Route path="/news-feed" element={<NewsFeedPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
