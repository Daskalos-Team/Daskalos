import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserId, MainPageProps } from "../../service/session-service";

export const MainPage = ({ children }: MainPageProps): React.JSX.Element => {
    const [loggedIn, setLoggedIn] = useState(false);
    const checkLoggedIn = async () => {
        const response = await getUserId();
        setLoggedIn(response.data != "" && response.data as number >= 0);
    };
    useEffect(() => { checkLoggedIn().then(); }, []);

    return loggedIn ? <Navigate to="/news-feed"/> : (
        <React.Fragment>
            {children}
        </React.Fragment>);
};
