import {call, put, takeEvery} from 'redux-saga/effects'
import moment from "moment";
import ActionTypes from '../actions/action-types';
import EventActions from '../actions/EventActions';
import EventsService from '../services/events.service';
import WeatherService from '../services/weather.service';
import {CalendarEvent} from '../types';
import Config from '../config';

export function* serviceCreateEvent(action: any) {
  const event: CalendarEvent = action.payload.event;
  const days = event.date.day() - moment().day();
  const weather = yield call(WeatherService.forecast, Config.WEATHER_API_KEY, event.city, days);
  const createdEvent = yield call(EventsService.createEvent, {
    ...event,
    weather
  });

  yield put(EventActions.createEvent(createdEvent));
}

export function* service_create_event() {
  yield takeEvery(ActionTypes.SERVICE_CREATE_EVENT, serviceCreateEvent)
}