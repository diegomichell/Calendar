import React from 'react';
import {Col, Container, Navbar, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import Calendar from "./components/calendar/calendar";
import CalendarActions from "./actions/CalendarActions";
import moment, {Moment} from "moment";
import EventsPopover from "./components/events-popover/events-popover";
import ManageEvent from "./components/manage-event/manage-event";
import EventActions from "./actions/EventActions";
import {CalendarEvent} from "./types";

interface AppProps {
  currentDate: Moment;
  setCurrentDate: (date: Moment) => void;
  hideManageEvent: () => void;
  showManageEvent?: boolean;
  events?: CalendarEvent[];
  manageEventMode: 'create' | 'edit';
}

export function App({currentDate, setCurrentDate, hideManageEvent, showManageEvent, events, manageEventMode}: AppProps) {
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
                <li className="text-danger"><span role="img" aria-label="thump up">👍🏻</span> Click on a day to add an event reminder</li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{span: 4, offset: 4}}>
            {showManageEvent && <ManageEvent
              mode={manageEventMode}
              handleClose={() => hideManageEvent()}
              show={showManageEvent}
            />
            }
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
              events={events}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = ({calendar: {currentDate}, events: {showManageEvent, events, manageEventMode}}) => {
  return {
    currentDate,
    showManageEvent,
    manageEventMode,
    events: Object.values(events) as CalendarEvent[]
  }
};

const mapDispatchToProp = (dispatch: Dispatch) => {
  return {
    setCurrentDate(date: Moment) {
      dispatch(CalendarActions.setCurrentDate(date));
    },
    hideManageEvent() {
      dispatch(EventActions.hideManageEvent());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProp)(App);
