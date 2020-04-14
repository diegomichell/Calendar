import {call, put, takeEvery} from 'redux-saga/effects'
import ActionTypes from '../actions/action-types';
import EventActions from '../actions/EventActions';
import EventsService from '../services/events.service';
import {CalendarEvent} from '../types';

export function* serviceRemoveEvent(action: any) {
  const event: CalendarEvent = action.payload.event;

  yield call(EventsService.removeEvents, {
    [event.id]: event
  });
  yield put(EventActions.removeEvents({
    [event.id]: event
  }));
}

export function* service_remove_event() {
  yield takeEvery(ActionTypes.SERVICE_REMOVE_EVENT, serviceRemoveEvent)
}