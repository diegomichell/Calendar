import {call, put, takeEvery} from 'redux-saga/effects'
import ActionTypes from '../actions/action-types';
import EventActions from '../actions/EventActions';
import EventsService from '../services/events.service';

export function* serviceUpdateEvent(action: any) {
    const {event} = action.payload;
    const updatedEvent = yield call(EventsService.updateEvent, event);

    yield put(EventActions.updateEvent(updatedEvent));
}

export function* service_update_event() {
  yield takeEvery(ActionTypes.SERVICE_UPDATE_EVENT, serviceUpdateEvent)
}