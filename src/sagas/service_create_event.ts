import {call, put, takeEvery} from 'redux-saga/effects'
import ActionTypes from '../actions/action-types';
import EventActions from "../actions/EventActions";
import EventsService from '../services/events.service';

export function* serviceCreateEvent(action: any) {
    const {event} = action.payload;
    const createdEvent = yield call(EventsService.createEvent, event);

    yield put(EventActions.createEvent(createdEvent));
}

export function* service_create_event() {
  yield takeEvery(ActionTypes.SERVICE_CREATE_EVENT, serviceCreateEvent)
}