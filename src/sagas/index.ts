import {all} from 'redux-saga/effects'
import {service_create_event} from "./service_create_event";

export default function* rootSaga() {
  yield all([
    service_create_event()
  ])
}