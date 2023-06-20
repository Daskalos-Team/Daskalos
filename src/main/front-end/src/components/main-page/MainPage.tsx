import React, { useEffect, useState } from "react";
import { getUserMainData } from "../../service/session-service";
import { NewsFeedPage } from "../news-feed-page";
import { AuthorizationPage } from "../authorization-page";

export const MainPage = (): React.JSX.Element => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(-1);
    const [userType, setUserType] = useState("");

    const logIn = (newUserId: number, newUserType: string) => {
        setUserId(newUserId);
        setUserType(newUserType);
        setLoggedIn(true);
    };

    useEffect(() => {
        async function checkLoggedIn() {
            const response = await getUserMainData();
            if (response.data.userId == null || (response.data.userId as number) < 0) {
                return response;
            }
            logIn(response.data.userId as number, response.data.userType);
            return response;
        }
        checkLoggedIn().catch(err => console.log(err));
    }, []);

    return loggedIn ? <NewsFeedPage userId={userId} userType={userType}/>
        : <AuthorizationPage logInFn={logIn}/>;
};
