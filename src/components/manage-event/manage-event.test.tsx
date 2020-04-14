import React from 'react';
import {shallow, mount} from 'enzyme';
import ConnectedManageEvent, {ManageEvent} from './manage-event';
import {Form} from 'react-bootstrap';
import {Provider} from 'react-redux';
import configureStore from '../../store';
import EventActions from '../../actions/EventActions';

describe('ManageEvent component', () => {

  it('renders component', () => {
    const create = jest.fn();
    const handleClose = jest.fn();
    const update = jest.fn();

    const app = shallow(
      <ManageEvent
        mode='create'
        create={create}
        dayOfMonth={13}
        month={4}
        year={2020}
        show={true}
        handleClose={handleClose}
        update={update}
      />
    );

    expect(app).not.toBeNull();
  });

  it('create event is called', () => {
    const create = jest.fn();
    const handleClose = jest.fn();
    const update = jest.fn();

    const app = mount(
      <ManageEvent
        mode='create'
        create={create}
        dayOfMonth={13}
        month={4}
        year={2020}
        show={true}
        handleClose={handleClose}
        update={update}
      />
    );

    const form = app.find(Form).first();
    const controls = form.find('input');
    // @ts-ignore
    controls.at(0).instance().value = 'Play soccer';
    controls.at(0).simulate('change');
    // @ts-ignore
    controls.at(1).instance().value = '17:00';
    controls.at(1).simulate('change');
    // @ts-ignore
    controls.at(2).instance().value = 'Santo Domingo';
    controls.at(2).simulate('change');
    // @ts-ignore
    controls.at(3).instance().value = '#fff';
    controls.at(3).simulate('change');

    form.simulate('submit');

    expect(create).toHaveBeenCalled();
  });

  it('create event is called', () => {
    const handleClose = jest.fn();

    const store = configureStore();
    store.dispatch(EventActions.showManageEvent(4,13,2020,'create'));

    const app = mount(
      <Provider store={store}>
        <ConnectedManageEvent
          mode='create'
          show={true}
          handleClose={handleClose}
        />
      </Provider>
    );

    const form = app.find(Form).first();
    const controls = form.find('input');
    // @ts-ignore
    controls.at(0).instance().value = 'Play soccer';
    controls.at(0).simulate('change');
    // @ts-ignore
    controls.at(1).instance().value = '17:00';
    controls.at(1).simulate('change');
    // @ts-ignore
    controls.at(2).instance().value = 'Santo Domingo';
    controls.at(2).simulate('change');
    // @ts-ignore
    controls.at(3).instance().value = '#fff';
    controls.at(3).simulate('change');

    form.simulate('submit');

    setTimeout(() => {
      expect(Object.values(store.getState().events.events)).toHaveLength(1);
    }, 1500);

  });
});