import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../common";
import "./styles/Experience.css";

export const Experience = (): React.JSX.Element => {
    return (
        <div className="experiences">
            <Card
                icon={faBriefcase}
                title="სამუშაო გამოცდილება"
                body={
                    <div className="experiences-body">
                        <div className="experience">
                            <img
                                src="../../Microsoft.png"
                                alt="twitter"
                                className="experience-image"
                            />
                            <div className="experience-title">Microsoft</div>
                            <div className="experience-subtitle">
                                პროგრამისტი
                            </div>
                            <div className="experience-duration">2022 - დღემდე</div>
                        </div>

                        <div className="experience">
                            <img
                                src="../../twitter.png"
                                alt="facebook"
                                className="experience-image"
                            />
                            <div className="experience-title">Twitter</div>
                            <div className="experience-subtitle">
                                პროგრამისტი
                            </div>
                            <div className="experience-duration">2019 - 2022</div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};
