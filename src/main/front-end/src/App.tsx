import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./components/main-page";
import "./App.css";

function App() {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2200);
    }, []);

    return (
        <>
            {loading ? (
                <div className="loader-container">
                    <div className="spinner-label-background"/>
                    <div className="content">
                        <h2>დასკალოსი</h2>
                        <h2>დასკალოსი</h2>
                    </div>
                    <div className="spinner"/>
                </div>
            ) : null}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}>
                        <Route path="*" element={<Navigate to="/" replace={true} />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
