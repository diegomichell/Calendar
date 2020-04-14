import React from 'react';
import {render} from '@testing-library/react';
import moment from "moment";
import {App} from './App';


describe('App component', () => {
  it('renders app', () => {
    const setCurrentDate = jest.fn();
    const hideManageEvent = jest.fn();

    const app = render(
      <App currentDate={moment()}
           manageEventMode="create" setCurrentDate={setCurrentDate}
           hideManageEvent={hideManageEvent}
      />
    );

    expect(app).not.toBeNull();
  });
});