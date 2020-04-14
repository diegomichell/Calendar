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
  },
  updateEvent: (event: CalendarEvent): Promise<CalendarEvent> => {
    return new Promise((resolve) => {
      const updatedEvent = {...event};

      const eventsData = localStorage.getItem('events');
      let events = eventsData ? JSON.parse(eventsData) : {};
      events = {...events, [updatedEvent.id]: updatedEvent};
      localStorage.setItem('events', JSON.stringify(events));

      resolve(updatedEvent)
    });
  },
  removeEvents: (eventsObject): Promise<void> => {
    return new Promise((resolve) => {
      const eventsData = localStorage.getItem('events');
      const events = eventsData ? JSON.parse(eventsData) : {};
      const newState = {...events};

      Object.keys(eventsObject).forEach(id => {
        delete newState[id]
      });

      localStorage.setItem('events', JSON.stringify(newState));
      resolve();
    });
  }
}