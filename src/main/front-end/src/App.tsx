import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthorizationPage } from "./components/authorization-page";
import { MainPage } from "./components/main-page";
import { NewsFeedPage } from "./components/news-feed-page";

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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
