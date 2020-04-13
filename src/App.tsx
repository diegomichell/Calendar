import React, {useState} from 'react';
import {Col, Container, Navbar, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import Calendar from "./components/calendar/calendar";
import CalendarActions from "./actions/CalendarActions";
import moment, {Moment} from "moment";
import EventsPopover from "./components/events-popover/events-popover";
import CreateEvent from "./components/create-event/create-event";
import EventActions from "./actions/EventActions";

interface AppProps {
  currentDate: Moment;
  setCurrentDate: (date: Moment) => void;
  hideCreateNewEvent: () => void;
  showCreateEvent: boolean;
}

export function App({currentDate, setCurrentDate, hideCreateNewEvent, showCreateEvent}: AppProps) {
  const onPrev = (showYearTable) => {
    setCurrentDate(moment({...currentDate}).subtract(1, showYearTable ? "year" : "month"));
  };

  const onNext = (showYearTable) => {
    setCurrentDate(moment({...currentDate}).add(1, showYearTable ? "year" : "month"));
  };

  const onYearChange = (year) => {
    setCurrentDate(moment({...currentDate}).set("year", year));
  };

  const onMonthChange = (monthNo) => {
    setCurrentDate(moment({...currentDate}).set("month", monthNo));
  };

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Calendar App</Navbar.Brand>
      </Navbar>
      <Container className="mt-5">
        <h3 className="text-center mb-4">Calendar App <small>By Diego Michel</small></h3>
        <Row className="mb-4">
          <Col md={{span: 4, offset: 4}}>
            <div className="instructions">
              <h4 className="text-center text-success">Instructions</h4>
              <ul className="list-group list-unstyled text-center">
                <li className="text-danger">👍🏻 Click on a day to add an event reminder</li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{span: 4, offset: 4}}>
            <CreateEvent
              handleClose={() => hideCreateNewEvent()}
              show={showCreateEvent}
            />
          </Col>
        </Row>
        <Row>
          <Col md={{span: 8, offset: 2}}>
            <Calendar
              currentDate={currentDate}
              onPrev={onPrev}
              onNext={onNext}
              onYearChange={onYearChange}
              onMonthChange={onMonthChange}
              renderOnDaySelected={EventsPopover}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = ({calendar: {currentDate}, events: {show_create_new_event_modal}}) => {
  return {
    currentDate,
    showCreateEvent: show_create_new_event_modal
  }
};

const mapDispatchToProp = (dispatch: Dispatch) => {
  return {
    setCurrentDate(date: Moment) {
      dispatch(CalendarActions.setCurrentDate(date));
    },
    hideCreateNewEvent() {
      dispatch(EventActions.hideCreateNewEvent());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProp)(App);
