import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../common";
import "./styles/Experience.css";

export const Experience = (props: any): React.JSX.Element => {
    const { userExperiences, userData, setUserData, isLoggedUser } = props;
    console.log(userExperiences);

    const removeExperience = (id: any): void => {
        console.log(id);
        const updatedExperiences = userExperiences.filter((experience: any) => {
            return experience.id != id;
        });
        const updatedUserData = {...userData, teachersExperience: updatedExperiences};
        console.log(updatedUserData);
        setUserData(updatedUserData);
    };

    return (
        <div className="experiences">
            <Card
                icon={faBriefcase}
                title="სამუშაო გამოცდილება"
                body={
                    <div className="experiences-body">
                        {userExperiences && userExperiences.map((experience: any, index: any) => (
                            <div className="experience" key={(index + 1).toString()}>
                                <img
                                    src="../../job.png"
                                    alt="twitter"
                                    className="experience-image"
                                />
                                <div className="experience-title">{experience?.employer}</div>
                                <div className="experience-subtitle">{experience?.jobDescription}</div>
                                <div className="experience-duration">2019 - 2022</div>
                                {isLoggedUser && <div className="remove-experience" onClick={() => removeExperience(experience.id)}>x</div>}
                            </div>
                        ))}
                    </div>
                }
                userExperiences={userExperiences}
                userData={userData}
                setUserData={setUserData}
                isLoggedUser={isLoggedUser}
            />
        </div>
    );
};
