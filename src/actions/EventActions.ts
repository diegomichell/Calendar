import ACTION_TYPES from './action-types';
import {CalendarEvent} from "../types";

export default {
  serviceCreateEvent: (event: CalendarEvent) => {
    return {
      type: ACTION_TYPES.SERVICE_CREATE_EVENT,
      payload: {
        event
      }
    }
  },
  serviceUpdateEvent: (event: CalendarEvent) => {
    return {
      type: ACTION_TYPES.SERVICE_CREATE_EVENT,
      payload: {
        event
      }
    }
  },
  createEvent: (event: CalendarEvent) => {
    return {
      type: ACTION_TYPES.CREATE_EVENT,
      payload: {
        event
      }
    }
  },
  showCreateNewEvent: (selectedMonth: number, selectedDay: number, selectedYear: number) => {
    return {
      type: ACTION_TYPES.SHOW_CREATE_NEW_EVENT_MODAL,
      payload: {
        selectedMonth,
        selectedDay,
        selectedYear
      }
    }
  },
  hideCreateNewEvent: () => {
    return {
      type: ACTION_TYPES.HIDE_CREATE_NEW_EVENT_MODAL,
      payload: {}
    }
  },
  serviceRemoveEventsForDay: (selectedMonth: number, selectedDay: number, selectedYear: number) => {
    return {
      type: ACTION_TYPES.SERVICE_REMOVE_EVENTS_FOR_DAY,
      payload: {
        selectedMonth,
        selectedDay,
        selectedYear
      }
    }
  },
  serviceRemoveEvent: (event: CalendarEvent) => {
    return {
      type: ACTION_TYPES.SERVICE_REMOVE_EVENT,
      payload: {
        event
      }
    }
  },
  setEvents: (events) => {
    return {
      type: ACTION_TYPES.SET_EVENTS,
      payload: {
        events
      }
    }
  },
  removeEvents: (events) => {
    return {
      type: ACTION_TYPES.REMOVE_EVENTS,
      payload: {
        events
      }
    }
  }
}