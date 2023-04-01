import React, { useState } from "react";
import axios from "axios";

export const AuthorizationForm = (props: never): JSX.Element => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const formEndpoint = "http://localhost:8080/user/info/";

    const handleSubmit = () => {
        const userInfo = {firstName: firstName, lastName: lastName};
        axios.post(formEndpoint, userInfo).then(r => console.log(r));
    };

    return (
        <form
            action={formEndpoint}
            onSubmit={handleSubmit}
            method="POST"
            target="_blank"
        >
            <input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="First name"
                type="text"
                name="firstName"
                required
            />
            <input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Last name"
                type="text"
                name="lastName"
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};
