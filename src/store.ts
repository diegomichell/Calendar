import {createStore, applyMiddleware, compose, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import moment from "moment";
import rootReducer from './reducers';
import rootSaga from "./sagas";
import EventActions from "./actions/EventActions";
import {composeWithDevTools} from 'redux-devtools-extension';
import {CalendarEvent} from "./types";

export default function configureStore(): Store {
  const sagaMiddleware = createSagaMiddleware();
  // @ts-ignore
  const isReduxToolsEnabled: any = window.__REDUX_DEVTOOLS_EXTENSION__ || false;

  const store = createStore(
    rootReducer,
    isReduxToolsEnabled ?
      compose(applyMiddleware(sagaMiddleware), composeWithDevTools())
      : applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  if (localStorage.events) {
    const eventsObject = {};

    (Object.values(JSON.parse(localStorage.events)) as CalendarEvent[]).forEach(e => {
      eventsObject[e.id] = {...e, date: moment(e.date)};
    });

    store.dispatch(EventActions.serviceLoadEvents({...eventsObject}));
  }

  return store;
}

