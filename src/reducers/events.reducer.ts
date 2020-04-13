import ACTION_TYPES from '../actions/action-types';

const initialState = {
  events: {},
  showCreateEvent: false,
  selectedMonth: null,
  selectedDay: null,
  selectedYear: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_EVENTS: {
      return {...state, events: {...action.payload.events}};
    }
    case ACTION_TYPES.CREATE_EVENT: {
      return {...state, events: {...state.events, [action.payload.event.id]: action.payload.event}};
    }
    case ACTION_TYPES.SHOW_CREATE_NEW_EVENT_MODAL: {
      const {selectedMonth, selectedDay, selectedYear} = action.payload;
      return {
        ...state,
        showCreateEvent: true,
        selectedMonth,
        selectedDay,
        selectedYear
      };
    }
    case ACTION_TYPES.HIDE_CREATE_NEW_EVENT_MODAL: {
      return {
        ...state,
        showCreateEvent: false,
        selectedMonth: null,
        selectedDay: null,
        selectedYear: null
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