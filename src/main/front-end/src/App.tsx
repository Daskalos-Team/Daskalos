import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./components/main-page";
import "./App.css";

export const AppContext: any = createContext(undefined); // context for global state control

function App() {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2200);
    }, []);

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [loading]);

    return (
        <AppContext.Provider value={setLoading}>
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
        </AppContext.Provider>
    );
}

export default App;
