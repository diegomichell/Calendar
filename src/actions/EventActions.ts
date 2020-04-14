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
      type: ACTION_TYPES.SERVICE_UPDATE_EVENT,
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
  updateEvent: (event: CalendarEvent) => {
    return {
      type: ACTION_TYPES.UPDATE_EVENT,
      payload: {
        event
      }
    }
  },
  showManageEvent: (selectedMonth: number, selectedDay: number, selectedYear: number, manageEventMode: 'create' | 'edit', event?: CalendarEvent) => {
    return {
      type: ACTION_TYPES.SHOW_MANAGE_EVENT_MODAL,
      payload: {
        selectedMonth,
        selectedDay,
        selectedYear,
        manageEventMode,
        event
      }
    }
  },
  hideManageEvent: () => {
    return {
      type: ACTION_TYPES.HIDE_MANAGE_EVENT_MODAL,
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