import React from 'react';
import {Button, ListGroup, ListGroupItem, Popover} from "react-bootstrap";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import EventActions from "../../actions/EventActions";

import './events-popover.scss';

const EventsPopoverContent = ({dayOfMonth, month, year, showCreateNewEvent}) => {
  return (
    <ListGroup>
      <ListGroupItem>
        <Button block size="sm" variant="success" onClick={() => showCreateNewEvent(month, dayOfMonth, year)}>
          New event
        </Button>
      </ListGroupItem>
      <ListGroupItem>Event at 20:20pm of {dayOfMonth} / {month} / {year}</ListGroupItem>
    </ListGroup>
  );
};

const mapDispatchToProp = (dispatch: Dispatch) => {
  return {
    showCreateNewEvent(selectedMonth: number, selectedDay: number, selectedYear: number) {
      dispatch(EventActions.showCreateNewEvent(selectedMonth, selectedDay, selectedYear));
    }
  }
};

const ConnectedEventsPopoverContent = connect(null, mapDispatchToProp)(EventsPopoverContent);

const EventsPopover = (dayOfMonth: number, month: number, year: number) => {
  return (
    <Popover className="EventsPopover" id="events-popover">
      <Popover.Content>
        <ConnectedEventsPopoverContent
          dayOfMonth={dayOfMonth}
          month={month}
          year={year}
        />
      </Popover.Content>
    </Popover>
  );
};

export default EventsPopover;
