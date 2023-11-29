import React, { useRef, useEffect, useCallback } from "react";
import { Calendar, EventDropArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Event {
  title: string;
  start: Date;
  end?: Date;
}

interface Props {
  events: Event | Event[];
}

const FullCalendar: React.FC<Props> = ({ events }) => {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const setCalendarRef = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      calendarRef.current = element;
    }
  }, []);

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = new Calendar(calendarRef.current, {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        editable: true,
        events: Array.isArray(events) ? events : [events], // Converte para array se necessário
        eventDrop: handleEventDrop,
      });

      calendar.render();
    }
  }, [events]);

  const handleEventDrop = (arg: EventDropArg) => {
    if (arg.event.start) {
      const newStartDate = arg.event.start.toISOString();
      const newEndDate = arg.event.end?.toISOString();

      console.log(
        `teste nova data:, \n ini: ${newStartDate},  \n fim:${newEndDate}`
      );
    }
  };

  return <div ref={setCalendarRef}></div>;
};

export default FullCalendar;
