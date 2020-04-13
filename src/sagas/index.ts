import {all} from 'redux-saga/effects'
import {service_create_event} from "./service_create_event";
import {service_remove_events_for_day} from "./service_remove_events_for_day";
import {service_remove_event} from "./service_remove_event";

export default function* rootSaga() {
  yield all([
    service_create_event(),
    service_remove_events_for_day(),
    service_remove_event(),
  ])
}