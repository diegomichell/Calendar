import React from 'react';
import {Col, Container, Navbar, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import Calendar from "./components/calendar/calendar";
import CalendarActions from "./actions/CalendarActions";
import moment, {Moment} from "moment";

interface AppProps {
  currentDate: Moment,
  setCurrentDate: (date: Moment) => void
}

export function App({currentDate, setCurrentDate}: AppProps) {
  const onPrev = (showYearTable) => {
    setCurrentDate(moment({...currentDate}).subtract(1, showYearTable ? "year" : "month"));
  };

  const onNext = (showYearTable) => {
    setCurrentDate(moment({...currentDate}).add(1, showYearTable ? "year" : "month"));
  };

  const onYearChange= (year) => {
    setCurrentDate( moment({...currentDate}).set("year", year));
  };

  const onMonthChange= (monthNo) => {
    setCurrentDate(moment({...currentDate}).set("month", monthNo));
  };

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Calendar App</Navbar.Brand>
      </Navbar>
      <Container className="mt-5">
        <h3 className="text-center mb-4">Calendar App <small>By Diego Michel</small></h3>
        <Row>
          <Col md={{span: 8, offset: 2}}>
            <Calendar
              currentDate={currentDate}
              onPrev={onPrev}
              onNext={onNext}
              onYearChange={onYearChange}
              onMonthChange={onMonthChange}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = ({calendar: {currentDate}}) => {
  return {
    currentDate
  }
};

const mapDispatchToProp = (dispatch: Dispatch) => {
  return {
    setCurrentDate(date: Moment) {
      dispatch(CalendarActions.setCurrentDate(date));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProp)(App);
