import {CalendarEvent} from "../types";

export default {
  createEvent: (event: CalendarEvent): Promise<CalendarEvent> => {
    return new Promise((resolve) => {
      const createdEvent = {...event, id: Date.now()};

      const eventsData = localStorage.getItem('events');
      let events = eventsData ? JSON.parse(eventsData) : {};
      events = {...events, [createdEvent.id]: createdEvent};
      localStorage.setItem('events', JSON.stringify(events));

      resolve(createdEvent)
    });
  }
}