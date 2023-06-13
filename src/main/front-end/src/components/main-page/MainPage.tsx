import React, { useEffect, useState } from "react";
import { getUserId, getUserType } from "../../service/session-service";
import { NewsFeedPage } from "../news-feed-page";
import { AuthorizationPage } from "../authorization-page";

export const MainPage = (): React.JSX.Element => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(-1);
    const [userType, setUserType] = useState("");

    useEffect(() => {
        async function checkLoggedIn() {
            const response = await getUserId();
            if (response.data == "" || (response.data as number) < 0) {
                return response;
            }
            const resp = await getUserType();
            setUserId(response.data as number);
            setUserType(resp.data);
            setLoggedIn(true);
            return response;
        }
        checkLoggedIn().catch(err => console.log(err));
    }, []);

    return loggedIn ? <NewsFeedPage userId={userId} userType={userType}/>
        : <AuthorizationPage/>;
};
