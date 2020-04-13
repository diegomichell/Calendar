import {call, put, select, takeEvery} from 'redux-saga/effects'
import ActionTypes from '../actions/action-types';
import EventActions from "../actions/EventActions";
import EventsService from '../services/events.service';
import {CalendarEvent} from "../types";

export function* serviceRemoveEventsForDay(action: any) {
  const {selectedMonth, selectedDay, selectedYear} = action.payload;
  const events = yield select(state => state.events.events);

  const filteredEvents = (Object.values(events) as CalendarEvent[]).filter(e => {
    return e.date.year() === Number.parseInt(selectedYear) && e.date.month() === (Number.parseInt(selectedMonth) - 1) && e.date.date() === selectedDay;
  });

  const eventsObject = {};
  filteredEvents.forEach(e => {
    eventsObject[e.id] = e;
  });

  yield call(EventsService.removeEvents, eventsObject);
  yield put(EventActions.removeEvents(eventsObject));
}

export function* service_remove_events_for_day() {
  yield takeEvery(ActionTypes.SERVICE_REMOVE_EVENTS_FOR_DAY, serviceRemoveEventsForDay)
}