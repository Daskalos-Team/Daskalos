import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NewsFeedPage } from "./components/news-feed-page";
import { AuthorizationPage } from "./components/authorization-page";
import { ProfilePage } from "./components/profile-page";
import "./App.css";
import { MainPage } from "./components/main-page";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <MainPage>
                        <AuthorizationPage />
                        <NewsFeedPage />
                    </MainPage>
                }>
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </Route>
                <Route path="/news-feed" element={<NewsFeedPage />} />
                <Route path="/profile-page" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
