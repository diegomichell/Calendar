import ACTION_TYPES from '../actions/action-types';

const initialState = {
  events: {},
  showManageEvent: false,
  manageEventMode: null,
  selectedMonth: null,
  selectedDay: null,
  selectedYear: null,
  selectedEvent: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_EVENTS: {
      return {...state, events: {...action.payload.events}};
    }
    case ACTION_TYPES.UPDATE_EVENT:
    case ACTION_TYPES.CREATE_EVENT:
      return {...state, events: {...state.events, [action.payload.event.id]: action.payload.event}};
    case ACTION_TYPES.SHOW_MANAGE_EVENT_MODAL: {
      const {selectedMonth, selectedDay, selectedYear, manageEventMode, event} = action.payload;
      return {
        ...state,
        showManageEvent: true,
        manageEventMode,
        selectedMonth,
        selectedDay,
        selectedYear,
        selectedEvent: event
      };
    }
    case ACTION_TYPES.HIDE_MANAGE_EVENT_MODAL: {
      return {
        ...state,
        showManageEvent: false,
        manageEventMode: null,
        selectedMonth: null,
        selectedDay: null,
        selectedYear: null,
        selectedEvent: null
      };
    }
    case ACTION_TYPES.REMOVE_EVENTS: {
      const {events} = action.payload;
      const newState = {...state.events};

      Object.keys(events).forEach(id => {
        delete newState[id]
      });

      return {...state, events: {...newState}};
    }
    default:
      return state
  }
};