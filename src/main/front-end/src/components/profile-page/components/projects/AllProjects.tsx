import React from "react";
import { Project } from "./Project";
import { INFO } from "../../data";
import "./styles/AllProjects.css";

export const AllProjects = (): React.JSX.Element => {
    return (
        <div className="all-projects-container">
            {INFO.projects.map((project, index) => (
                <div className="all-projects-project" key={index}>
                    <Project
                        logo={"ado.png"}
                        title={project.title}
                        description={project.description}
                        linkText={project.linkText}
                        link={project.link}
                    />
                </div>
            ))}
        </div>
    );
};
