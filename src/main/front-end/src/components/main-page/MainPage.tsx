import React, { useEffect, useState } from "react";
import { getUserId, MainPageProps } from "../../service/session-service";

export const MainPage = ({ children }: MainPageProps): React.JSX.Element => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const response = await getUserId();
            setLoggedIn(response.data != "" && response.data as number >= 0);
        };
        checkLoggedIn().catch(err => console.log(err));
    }, []);

    return loggedIn ? (
        <React.Fragment>
            {children[1]}
        </React.Fragment>
    ) : (
        <React.Fragment>
            {children[0]}
        </React.Fragment>
    );
};
