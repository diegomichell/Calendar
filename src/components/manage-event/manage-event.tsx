import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Dispatch} from 'redux';
import {Button, Form, Modal} from "react-bootstrap";
import {CalendarEvent} from "../../types";
import EventActions from "../../actions/EventActions";
import PropTypes from 'prop-types';
import moment from "moment";
import {CirclePicker} from 'react-color';

import './manage-event.scss';

interface ManageEventProps {
  show: boolean;
  handleClose: Function;
  create: Function;
  update: Function;
  dayOfMonth: number;
  month: number;
  year: number;
  mode: 'create' | 'edit';
  selectedEvent: CalendarEvent;
}

const DEFAULT_EVENT_COLOR = '#f44336';

const ManageEvent = ({show, handleClose, create, update, dayOfMonth, month, year, mode, selectedEvent}: ManageEventProps) => {
  const [validated, setValidated] = useState(false);
  const [color, setColor] = useState('');
  const isEdit = mode === 'edit';
  let formRef: any = null;

  useEffect(() => {
    selectedEvent && setColor(selectedEvent.color);
  }, [selectedEvent]);

  const handleSubmit = (event?: any) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (formRef.checkValidity()) {
      const description = formRef.elements['description'].value;
      const city = formRef.elements['city'].value;
      const color = formRef.elements['color'].value || DEFAULT_EVENT_COLOR;
      const time = formRef.elements['time'].value;
      const timeParts = time.split(':').map(p => Number.parseInt(p));
      const date = isEdit ? moment(formRef.elements['date'].value).hours(timeParts[0]).minutes(timeParts[1]).seconds(0) : moment().year(year).month(month).date(dayOfMonth).hours(timeParts[0]).minutes(timeParts[1]).seconds(0);

      isEdit ? update({
          id: selectedEvent.id,
          description,
          city,
          color,
          date
        }) :
        create({
          description,
          city,
          color,
          date
        });

      handleClose();
    }

    setValidated(true);
  };

  const defaultDate = selectedEvent && moment(selectedEvent.date).date(selectedEvent.date.date());

  return (
    <Modal className="manage-event" show={show} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit' : 'Create'} event
          for {moment().year(year).month(month).date(dayOfMonth).format('LL')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={(ref: any) => {
          formRef = ref
        }} noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control defaultValue={selectedEvent && selectedEvent.description} maxLength={30} required
                          name="description" type="text" placeholder="Event description..."/>
          </Form.Group>
          {isEdit && (
            <Form.Group controlId="formBasicDate">
              <Form.Label>Date</Form.Label>
              <Form.Control defaultValue={defaultDate && defaultDate.toISOString().substring(0, 10)} required
                            name="date" type="date"/>
            </Form.Group>
          )}
          <Form.Group controlId="formBasicTime">
            <Form.Label>Time</Form.Label>
            <Form.Control defaultValue={selectedEvent && selectedEvent.date.format('HH:mm')} required name="time"
                          type="time"/>
          </Form.Group>
          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control defaultValue={selectedEvent && selectedEvent.city} required name="city" type="text"/>
          </Form.Group>
          <Form.Group controlId="formColor">
            <Form.Label>Color</Form.Label>
            <Form.Control value={color} name="color" type="hidden"/>
            <div className="color-picker">
              <CirclePicker color={color} onChangeComplete={color => setColor(color.hex)}/>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {
          handleSubmit();
        }}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = ({events: {selectedMonth, selectedDay, selectedYear, selectedEvent}}) => {
  return {
    dayOfMonth: selectedDay,
    month: Number.parseInt(selectedMonth) - 1,
    year: Number.parseInt(selectedYear),
    selectedEvent
  }
};

const mapDispatchToProp = (dispatch: Dispatch) => {
  return {
    create: (event: CalendarEvent) => {
      dispatch(EventActions.serviceCreateEvent(event));
    },
    update: (event: CalendarEvent) => {
      dispatch(EventActions.serviceUpdateEvent(event));
    }
  }
};

ManageEvent.propType = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  dayOfMonth: PropTypes.number,
  month: PropTypes.number,
  year: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProp)(ManageEvent);