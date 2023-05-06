import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthorizationPage } from "./components/authorization-page";
import { MainPage } from "./components/main-page";
import { GoogleMapSearch } from "./components/google-map-search";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GoogleMapSearch />}>
                    <Route index element={<MainPage />} />
                    <Route path="main" element={<MainPage />} />
                    <Route path="register" element={<AuthorizationPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
