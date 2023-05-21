import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NewsFeedPage } from "./components/news-feed-page";
import { AuthorizationPage } from "./components/authorization-page";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthorizationPage />}/>
                <Route path="/news-feed" element={<NewsFeedPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
