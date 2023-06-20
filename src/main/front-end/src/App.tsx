import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./components/main-page";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}>
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
