import React, { useRef, useEffect, useCallback } from "react";
import { Calendar, EventClickArg, EventDropArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// https://coolors.co/c69f89-15616d-06a77d-aa4465-462255

interface Event {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  borderColor: string;
  backgroundColor: string;
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
        locale: "pt-br",
        editable: true,
        events: Array.isArray(events) ? events : [events],
        eventDisplay: "block",
        eventDrop: handleEventDrop,
        eventClick: handleEventClick,
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

  const handleEventClick = (info: EventClickArg) => {
    const clickedEvent = info.event;
    const title = clickedEvent.title;
    const eventId = clickedEvent;
    const startDate = clickedEvent.start?.toISOString();
    const endDate = clickedEvent.end?.toISOString();

    console.log(JSON.stringify(clickedEvent, null, 2));

    // console.log(
    //   `Evento clicado: \n Título: ${title}, id: ${eventId}, \n ini: ${startDate}, \n fim: ${endDate}`
    // );
  };
  return <div ref={setCalendarRef} className="p-8"></div>;
};

export default FullCalendar;
