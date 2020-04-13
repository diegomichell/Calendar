import React, {useState} from 'react';
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
}

const DEFAULT_EVENT_COLOR = '#f44336';

const ManageEvent = ({show, handleClose, create, update, dayOfMonth, month, year, mode}: ManageEventProps) => {
  const [validated, setValidated] = useState(false);
  const [color, setColor] = useState('');
  const isEdit = mode === 'edit';
  let formRef: any = null;

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
      const date = moment().year(year).month(month).date(dayOfMonth).hours(timeParts[0]).minutes(timeParts[1]).seconds(0);

      isEdit ? update({
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
            <Form.Control maxLength={30} required name="description" type="text" placeholder="Event description..."/>
          </Form.Group>
          <Form.Group controlId="formBasicTime">
            <Form.Label>Time</Form.Label>
            <Form.Control required name="time" type="time"/>
          </Form.Group>
          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control required name="city" type="text"/>
          </Form.Group>
          <Form.Group controlId="formColor">
            <Form.Label>Color</Form.Label>
            <Form.Control value={color} name="color" type="hidden"/>
            <div className="color-picker">
              <CirclePicker onChangeComplete={color => setColor(color.hex)}/>
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
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = ({events: {selectedMonth, selectedDay, selectedYear}}) => {
  return {
    dayOfMonth: selectedDay,
    month: Number.parseInt(selectedMonth) - 1,
    year: Number.parseInt(selectedYear)
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