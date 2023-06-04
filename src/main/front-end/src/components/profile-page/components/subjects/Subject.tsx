import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import "./styles/Subject.css";
import { DATE_TO_WEEKDAY, SUBJECT_TO_COLOR } from "../../../../service/profile-page-service";

export const Subject = (props: any): React.JSX.Element => {
    const { logo, title, description, linkText, price, days } = props;

    const [subjectWindowState, setSubjectWindowState] = useState<string>("subject-window-hide");
    const [subjectDimmerState, setSubjectDimmerState] = useState<string>("subject-dimmer-hide");

    const showWindow = (): void => {
        setSubjectDimmerState("subject-dimmer");
        setSubjectWindowState("subject-window-popup");
    };

    const hideWindow = (): void => {
        setSubjectDimmerState("subject-dimmer-hide");
        setSubjectWindowState("subject-window-hide");
    };

    const getDateData = (days: any): any => {
        const data = days.map((day: any) => {
            const time = day.start.split("T");
            const weekday = DATE_TO_WEEKDAY[time[0]];
            const start = time[1];
            const end = day.end.split("T")[1];
            return [weekday, start, end];
        });
        const result: any = [];
        const allWeekDays = ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი", "კვირა"];
        allWeekDays.forEach((weekDay: string) => {
            data.forEach((currData: any) => {
                if (currData[0] === weekDay) {
                    result.push(currData);
                    return;
                }
            });
        });
        return result;
    };

    return (
        <React.Fragment>
            <div className={subjectDimmerState}></div>
            <div className={subjectWindowState}>
                <div className="title-div" style={{background: SUBJECT_TO_COLOR[title]}}> {title} </div>
                <div className="price-div">
                    <h5 className="price-label">სასურველი ფასი</h5>
                    <div className="price-number"> {price} ₾ </div>
                </div>
                <div className="week-days">
                    { getDateData(days).map((info: any, index: any) => {
                        return (
                            <div key={index} className="day">
                                <div key={index} className="day-name"> { info[0] } </div>
                                <div key={index} className="day-time"> { info[1] } - {info[2]} </div>
                            </div>
                        );
                    })}
                </div>
                <div className="subject-verifier-buttons">
                    <div className="subject-verifier-close" onClick={() => {
                        hideWindow();
                    }}>დახურვა</div>
                </div>
            </div>
            <div className="subject">
                <a onClick={() => showWindow()}>
                    <div className="subject-container">
                        <div className="subject-logo">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="subject-title">{title}</div>
                        <div className="subject-description">{description}</div>
                        <div className="subject-link">
                            <div className="subject-link-icon">
                                <FontAwesomeIcon icon={faLink} />
                            </div>

                            <div className="subject-link-text">{linkText}</div>
                        </div>
                    </div>
                </a>
            </div>
        </React.Fragment>
    );
};
