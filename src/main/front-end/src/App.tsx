import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NewsFeedPage } from "./components/news-feed-page";
import { AuthorizationPage } from "./components/authorization-page";
import { MainPage } from "./components/main-page";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthorizationPage />}>
                    <Route index element={<MainPage />} />
                    <Route path="main" element={<MainPage />} />
                    <Route path="register" element={<AuthorizationPage />} />
                </Route>
                <Route path="/news-feed" element={<NewsFeedPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
