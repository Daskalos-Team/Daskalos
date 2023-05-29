// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import React, { useState, useRef, useEffect } from "react";
import "./styles/Calendar.css";

export const Calendar = (): React.JSX.Element => {
    const calendarRef = useRef<any>();
    const [calendarConfig, setCalendarConfig] = useState<any>({
        viewType: "Week",
        headerDateFormat: "ddd",
        durationBarVisible: true,
        eventDeleteHandling: "Update", // Disabled
        timeRangeSelectedHandling: "Enabled", // Disabled
        // eventMoveHandling: "Disabled",
        onTimeRangeSelected: async (args: any) => {
            const dp = calendarRef.current.control;
            const modal = await DayPilot.Modal.prompt("დაამატეთ საგანი ამ დროებში:", "საგანი");
            dp.clearSelection();
            if (!modal.result) { return; }
            dp.events.add({
                start: args.start,
                end: args.end,
                id: DayPilot.guid(),
                text: modal.result
            });
        },
        onEventDelete: async (args: any) => {
            console.log("event deleted, ", args);
        },
        onEventResize: async (args: any) => {
            console.log("event resized, ", args);
        },
        onEventMove: async (args: any) => {
            console.log("event moved, ", args);
        },
        onEventClick: undefined
    });

    // 2023-05-22 default date / 05-21 for sunday
    useEffect(() => {
        const events = [
            {
                id: 1,
                text: "მათემატიკა",
                backColor: "green",
                start: "2023-05-22T10:30:00",
                end: "2023-05-22T13:00:00"
            },
            {
                id: 1,
                text: "ქართული",
                backColor: "red",
                start: "2023-05-23T10:22:00",
                end: "2023-05-23T12:00:00"
            }
        ];

        const startDate = "2023-05-22";

        calendarRef.current.control.update({startDate, events});
    }, []);

    return (
        <div className="calendar-div">
            <div className="calendar-header"> საგნების განრიგი </div>
            <DayPilotCalendar
                {...calendarConfig}
                ref={calendarRef}
            />
        </div>
    );
};
