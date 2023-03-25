import React from "react";
import { Outlet, Link } from "react-router-dom";

export const LoginPage = (props: any): JSX.Element => {

    return (
        <div>
            Log in page
            <nav>
                <ul>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/main">MainPage</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}
