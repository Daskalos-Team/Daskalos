// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import React, { useState, useRef, useEffect } from "react";
import "./styles/Calendar.css";
import { SUBJECT_IN_ENGLISH, SUBJECT_TO_COLOR } from "../../../../service/profile-page-service";

export const Calendar = (props: any): React.JSX.Element => {
    const { subjects, setSubjects } = props; // global user subjects cache

    const [windowState, setWindowState] = useState<string>("window-hide");
    const [dimmerState, setDimmerState] = useState<string>("dimmer-hide");
    const [args, setArgs] = useState<any>(undefined);

    const [subject, setSubject] = useState<string>("მათემატიკა");
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const calendarRef = useRef<any>();
    const calendarConfig = {
        viewType: "Week",
        headerDateFormat: "ddd",
        durationBarVisible: true,
        eventDeleteHandling: "Update", // Disabled
        timeRangeSelectedHandling: "Enabled", // Disabled
        // eventMoveHandling: "Disabled",
        onTimeRangeSelected: async (args: any) => {
            setArgs(args);
            showWindow();
        },
        onEventDelete: async (args: any) => {
            await removeSubjects(args);
        },
        onEventResize: async (args: any) => {
            console.log("event resized, ", args);
        },
        onEventMove: async (args: any) => {
            console.log("event moved, ", args);
        },
        onEventClick: undefined
    };

    // 2023-05-22 default date / 05-21 for sunday
    useEffect(() => {
        const events: any = [];
        subjects.map((userSubject: any) => {
            const allSubjects = userSubject.days.map((day: any) => {
                return {
                    id: 1,
                    text: userSubject.title,
                    backColor: SUBJECT_TO_COLOR[userSubject.title],
                    start: day.start,
                    end: day.end
                };
            });
            events.push(...allSubjects);
        });

        const startDate = "2023-05-22";

        calendarRef.current.control.update({startDate, events});
    }, []);

    const showWindow = () => {
        setDimmerState("dimmer");
        setWindowState("window-popup");
    };

    const hideWindow = () => {
        setDimmerState("dimmer-hide");
        setWindowState("window-hide");
    };

    const removeSubjects = async (args: any) => {
        const currSubject = args.e.data;

        subjects.forEach((userSubject: any) => {
            if (userSubject.title === currSubject["text"]) {
                if (userSubject.days.length === 1) { // only 1 time left
                    const updatedSubjects = subjects.filter((sub: any) => {
                        return sub.title !== userSubject.title;
                    });
                    setSubjects(updatedSubjects);
                } else {
                    const updatedDays = userSubject.days.filter((day: any) => {
                        return day.start !== currSubject.start.value && day.end !== currSubject.end.value;
                    });
                    const updatedSubject = {...userSubject, days: updatedDays};

                    const otherSubjects = subjects.filter((sub: any) => {
                        return sub.title !== userSubject.title;
                    });
                    const updatedSubjects = [updatedSubject, ...otherSubjects];

                    setSubjects(updatedSubjects);
                }
                return;
            }
        });
    };

    const createSubjects = async (e: any) => {
        if (price === "" || description === "") {
            alert("გთხოვთ შეიყვანოთ ყველა მონაცემი");
            return;
        }
        if (!subjects.some((userSubject: any) => userSubject.title === subject)) {
            const newSubject = {
                title: subject,
                description: description,
                image: `subjects/${SUBJECT_IN_ENGLISH[subject]}.png`,
                linkText: "იხილეთ დეტალები",
                link: "https://github.com",
                days: [
                    {
                        start: args.start,
                        end: args.end
                    }
                ]
            };
            setSubjects((oldSubjects: any) => [...oldSubjects, newSubject]);
        } else {
            subjects.forEach((userSubject: any) => {
                if (userSubject.title === subject) {
                    const updatedDays = [...userSubject.days, { start: args.start.value, end: args.end.value }];
                    const updatedSubject = {...userSubject, days: updatedDays};
                    const otherSubjects = subjects.filter((sub: any) => {
                        return sub.title !== userSubject.title;
                    });
                    const updatedSubjects = [updatedSubject, ...otherSubjects];

                    setSubjects(updatedSubjects);
                    return;
                }
            });
        }

        // update times of subject
        const dp = calendarRef.current.control;
        dp.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: subject,
            backColor: SUBJECT_TO_COLOR[subject]
        });
        hideWindow();
    };

    return (
        <div className="calendar-div">
            <div className={dimmerState}></div>
            <div className={windowState}>
                <div className="subject-div">
                    <h5 className="subject-label">საგანი</h5>
                    <select
                        className="subject-select"
                        onChange={e => setSubject(e.target.value)}
                        value={subject}
                    >
                        <option value="მათემატიკა">მათემატიკა</option>
                        <option value="ფიზიკა">ფიზიკა</option>
                        <option value="ქიმია">ქიმია</option>
                        <option value="ბიოლოგია">ბიოლოგია</option>
                        <option value="ისტორია">ისტორია</option>
                    </select>
                </div>
                <input type="number" placeholder="საგნის ფასი" onInput={e => setPrice(e.currentTarget.value)}/>
                <textarea className="description-area" placeholder="მოკლე აღწერა" onChange={e => setDescription(e.target.value)} />
                <div className="verifier-buttons">
                    <div className="verifier-ok" onClick={e => createSubjects(e)}>დადასტურება</div>
                    <div className="verifier-close" onClick={() => {
                        hideWindow();
                    }}>დახურვა</div>
                </div>
            </div>
            <div className="calendar-header"> საგნების განრიგი </div>
            <DayPilotCalendar
                {...calendarConfig}
                ref={calendarRef}
            />
        </div>
    );
};
