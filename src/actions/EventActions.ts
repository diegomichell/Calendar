import ACTION_TYPES from './action-types';
import {CalendarEvent} from "../types";

export default {
  serviceLoadEvents: (events: any) => {
    return {
      type: ACTION_TYPES.SERVICE_LOAD_EVENTS,
      payload: {
        events
      }
    }
  },
  serviceCreateEvent: (event: CalendarEvent) => {
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
  }
}