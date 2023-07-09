import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./components/main-page";
import { ProfilePage } from "./components/profile-page";
import "./App.css";

export const AppContext: any = createContext({
    curUserID: -1,
    setCurUserID: undefined,
    curUserType: "",
    setCurUserType: undefined,
    setTime: undefined
}); // context for global state control

function App() {
    const [loading, setLoading] = useState<boolean>(false);
    const [time, setTime] = useState<number>(3000);
    const [curUserID, setCurUserID] = useState<number>(-1);
    const [curUserType, setCurUserType] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, time);
    }, []);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, time);
    }, [time]);

    return (
        <AppContext.Provider value={{
            curUserID,
            setCurUserID,
            curUserType,
            setCurUserType,
            setTime
        }}>
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
                    <Route path=":userId/:userType/" element={<ProfilePage />} />
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
