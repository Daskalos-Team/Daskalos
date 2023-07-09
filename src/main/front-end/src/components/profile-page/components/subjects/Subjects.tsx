import React from "react";
import { Subject } from "./Subject";
import "./styles/Subjects.css";

export const Subjects = (props: any): React.JSX.Element => {
    const { subjects } = props;

    return (
        <div className="all-subjects-container">
            {subjects.map((subject: any, index: any) => (
                <div className="all-subjects-subject" key={index}>
                    <Subject
                        logo={subject.image}
                        title={subject.name}
                        description={subject.description}
                        linkText={subject.linkText}
                        price={subject.price}
                        days={subject.days}
                    />
                </div>
            ))}
        </div>
    );
};
