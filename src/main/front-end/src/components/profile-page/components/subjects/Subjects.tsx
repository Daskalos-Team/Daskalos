import React from "react";
import { Subject } from "./Subject";
import { INFO } from "../../example-data";
import "./styles/Subjects.css";

export const Subjects = (): React.JSX.Element => {
    return (
        <div className="all-subjects-container">
            {INFO.subjects.map((subject, index) => (
                <div className="all-subjects-subject" key={index}>
                    <Subject
                        logo={subject.image}
                        title={subject.title}
                        description={subject.description}
                        linkText={subject.linkText}
                        link={subject.link}
                    />
                </div>
            ))}
        </div>
    );
};
