import React, { useContext, useEffect, useState } from "react";
import { getUserMainData } from "../../service/session-service";
import { NewsFeedPage } from "../news-feed-page";
import { AuthorizationPage } from "../authorization-page";
import { AppContext } from "../../App";

export const MainPage = (): React.JSX.Element => {
    const { setCurUserID, setCurUserType }: any = useContext(AppContext);

    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(-1);
    const [userType, setUserType] = useState("");
    const [userName, setUserName] = useState("");
    const [userSurname, setUserSurname] = useState("");
    const [userProfileImage, setUserProfileImage] = useState<string | null>(null);

    const logIn = (newUserId: number, newUserType: string, newUserName: string, newUserSurname: string, newUserProfileImage: string | null) => {
        setUserId(newUserId);
        setCurUserID(newUserId);
        setUserType(newUserType);
        setCurUserType(newUserType);
        setUserName(newUserName);
        setUserSurname(newUserSurname);
        setUserProfileImage(newUserProfileImage);
        setLoggedIn(true);
    };

    useEffect(() => {
        async function checkLoggedIn() {
            const response = await getUserMainData();
            if (response.data.userId == null || (response.data.userId as number) < 0) {
                return response;
            }
            logIn(response.data.userId as number, response.data.userType, response.data.userName, response.data.userSurname, response.data.userProfileImage);
            return response;
        }
        checkLoggedIn().catch(err => console.log(err));
    }, []);

    return loggedIn ? <NewsFeedPage userId={userId} userType={userType} userName={userName} userSurname={userSurname} profileImage={userProfileImage}/>
        : <AuthorizationPage logInFn={logIn}/>;
};
