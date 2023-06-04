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

    const [subjectOpacity, setSubjectOpacity] = useState<any>(new Map());

    const allSubjectsList = ["მათემატიკა", "ფიზიკა", "ქიმია", "ბიოლოგია", "ისტორია"];
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
            await changeSubjectTimes(args, true);
        },
        onEventMove: async (args: any) => {
            await changeSubjectTimes(args);
        },
        onEventClick: undefined
    };

    // 2023-05-22 default date / 05-21 for sunday
    // INITIAL PROCESSING OF SUBJECTS
    useEffect(() => {
        const events: any = [];
        initOpacities();

        subjects.map((userSubject: any) => {
            const allSubjects = userSubject.days.map((day: any) => {
                return {
                    id: DayPilot.guid(),
                    text: userSubject.title,
                    backColor: hexToRgba(SUBJECT_TO_COLOR[userSubject.title], 0.5),
                    resource: "vaaax",
                    start: day.start,
                    end: day.end
                };
            });
            events.push(...allSubjects);
        });

        const startDate = "2023-05-22";
        calendarRef.current.control.update({startDate, events});
    }, []);

    // all 0.5 initially
    const initOpacities = () => {
        const opacityMap = new Map();
        allSubjectsList.map((sub: string) => {
            opacityMap.set(sub, 0.5);
        });
        setSubjectOpacity(opacityMap);
    };

    const updateOpacities = (currSubject: string) => {
        const events = calendarRef.current.control.events.list;
        const updatedEvents: any = [];

        if (subjectOpacity.get(currSubject) == 1) {
            for (let i = 0; i < events.length; i++) {
                const event = events[i];
                event.backColor = hexToRgba(SUBJECT_TO_COLOR[event.text], 0.5);
                updatedEvents.push(event);
            }
            allSubjectsList.map((sub: any) => {
                subjectOpacity.set(sub, 0.5);
            });
        } else {
            for (let i = 0; i < events.length; i++) {
                const event = events[i];

                if (event.text === currSubject) {
                    event.backColor = hexToRgba(SUBJECT_TO_COLOR[event.text], 1);
                } else {
                    event.backColor = hexToRgba(SUBJECT_TO_COLOR[event.text], 0.1);
                }
                updatedEvents.push(event);
            }
            allSubjectsList.map((sub: any) => {
                if (sub == currSubject) {
                    subjectOpacity.set(sub, 1);
                } else {
                    subjectOpacity.set(sub, 0.1);
                }
            });
        }
        calendarRef.current.control.update({updatedEvents});
    };

    const hexToRgba = (hex: string, opacity: number): string => {
        hex = hex.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
    };

    const showWindow = (): void => {
        setDimmerState("dimmer");
        setWindowState("window-popup");
    };

    const hideWindow = (): void => {
        setDimmerState("dimmer-hide");
        setWindowState("window-hide");
        setPrice("");
        setDescription("");
    };

    const containsSubject = (): boolean => {
        return subjects.some((userSubject: any) => userSubject.title === subject);
    };

    const containsDay = (userSubject: any, newDay: string): boolean => {
        return userSubject.days.some((day: any) => {
            const oldDay = day.start.split("T")[0];
            return newDay.includes(oldDay);
        });
    };

    // 0 - 10 000
    const priceInRange = (price: string): string => {
        return Math.min(10000, Math.max(0, parseFloat(price))) + "";
    };

    const createSubjects = async (e: any): Promise<void> => {
        if (!containsSubject() && (price === "" || description === "")) {
            alert("გთხოვთ შეიყვანოთ ყველა მონაცემი");
            return;
        }
        if (!containsSubject()) {
            const newSubject = {
                title: subject,
                description,
                image: `subjects/${SUBJECT_IN_ENGLISH[subject]}.png`,
                linkText: "იხილეთ დეტალები",
                link: "https://github.com",
                price,
                days: [
                    {
                        start: args.start.value,
                        end: args.end.value
                    }
                ]
            };
            setSubjects((oldSubjects: any) => [...oldSubjects, newSubject]);
        } else {
            let containsCurrentDay = false;
            subjects.forEach((userSubject: any) => {
                if (userSubject.title === subject) {
                    if (containsDay(userSubject, args.start.value)) {
                        containsCurrentDay = true;
                        return;
                    }
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
            if (containsCurrentDay) {
                alert("ამ დღეს უკვე გაქვთ მონიშნული ეს საგანი!");
                return;
            }
        }

        // update times of subject
        const dp = calendarRef.current.control;
        dp.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: subject,
            backColor: hexToRgba(SUBJECT_TO_COLOR[subject], subjectOpacity.get(subject))
        });
        hideWindow();
    };

    const removeSubjects = async (args: any): Promise<void> => {
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

    const changeSubjectTimes = async (args: any, isResize = false): Promise<void> => {
        const currSubject = args.e.data;

        const newStart = args.newStart.value;
        const newEnd = args.newEnd.value;

        let restrictSameDay = false;
        subjects.forEach((userSubject: any) => {
            if (userSubject.title === currSubject["text"]) {
                if (!isResize && containsDay(userSubject, newStart)) {
                    restrictSameDay = true;
                    return;
                }
                const otherDays = userSubject.days.filter((day: any) => {
                    return day.start !== currSubject.start.value && day.end !== currSubject.end.value;
                });
                const updatedDays = [...otherDays, {
                    start: newStart,
                    end: newEnd
                }];
                const updatedSubject = {...userSubject, days: updatedDays};

                const otherSubjects = subjects.filter((sub: any) => {
                    return sub.title !== userSubject.title;
                });
                const updatedSubjects = [updatedSubject, ...otherSubjects];

                setSubjects(updatedSubjects);
                return;
            }
        });

        if (restrictSameDay) {
            args.preventDefault();
            alert("ამ დღეს უკვე გაქვთ მონიშნული ეს საგანი!");
            return;
        }
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
                { containsSubject() ? null :
                    <>
                        <input type="number" min={"0"} max={"10000"} placeholder="საგნის ფასი" onInput={e => setPrice(priceInRange(e.currentTarget.value))}/>
                        <textarea className="description-area" maxLength={185} placeholder="მოკლე აღწერა" onChange={e => setDescription(e.target.value)} />
                    </>
                }
                <div className="verifier-buttons">
                    <div className="verifier-ok" onClick={e => createSubjects(e)}>დადასტურება</div>
                    <div className="verifier-close" onClick={() => {
                        hideWindow();
                    }}>დახურვა</div>
                </div>
            </div>
            <div className="calendar-header">
                <section className={"math"} onClick={() => updateOpacities("მათემატიკა")}>მათემატიკა</section>
                <section className={"physics"} onClick={() => updateOpacities("ფიზიკა")}>ფიზიკა</section>
                <section className={"chemistry"} onClick={() => updateOpacities("ქიმია")}>ქიმია</section>
                <section className={"biology"} onClick={() => updateOpacities("ბიოლოგია")}>ბიოლოგია</section>
                <section className={"history"} onClick={() => updateOpacities("ისტორია")}>ისტორია</section>
            </div>
            <DayPilotCalendar
                {...calendarConfig}
                ref={calendarRef}
            />
        </div>
    );
};
