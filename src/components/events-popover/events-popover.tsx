import React from 'react';
import {Button, ListGroup, ListGroupItem, Popover} from "react-bootstrap";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import EventActions from "../../actions/EventActions";
import {CalendarEvent} from "../../types";
import {MdLocationOn} from 'react-icons/md'

import './events-popover.scss';

const EventsPopoverContent = ({dayOfMonth, month, year, showCreateNewEvent, events}) => {
  const eventsForDay = (events as CalendarEvent[] || []).filter(e => {
    return e.date.year() === Number.parseInt(year) && e.date.month() === (Number.parseInt(month) - 1) && e.date.date() === dayOfMonth;
  }).sort((a, b) => a.date > b.date ? 1 : -1);

  return (
    <ListGroup className="EventsPopoverContent">
      <ListGroupItem>
        <Button block size="sm" variant="success" onClick={() => showCreateNewEvent(month, dayOfMonth, year)}>
          New event
        </Button>
      </ListGroupItem>
      {eventsForDay.map(event => {
        return (
          <ListGroupItem key={event.id} className={"calendar-event-item"} >
            <span style={{color: event.color}}>Event at {event.date.format('hh:mm a')}</span>
            <p>{event.description}</p>
            <small>{event.city} <MdLocationOn/></small>
          </ListGroupItem>
        )
      })}
    </ListGroup>
  );
};

const mapStateToProps = ({events: {events}}) => {
  return {
    events: Object.values(events) as CalendarEvent[]
  }
};

const mapDispatchToProp = (dispatch: Dispatch) => {
  return {
    showCreateNewEvent(selectedMonth: number, selectedDay: number, selectedYear: number) {
      dispatch(EventActions.showCreateNewEvent(selectedMonth, selectedDay, selectedYear));
    }
  }
};

const ConnectedEventsPopoverContent = connect(mapStateToProps, mapDispatchToProp)(EventsPopoverContent);

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
