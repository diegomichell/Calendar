import ACTION_TYPES from '../actions/action-types';
import moment from "moment";

const initialState = {
  currentDate: moment(),
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CURRENT_DATE: {
      const {currentDate} = action.payload;

      return {...state, currentDate};
    }
    default:
      return state
  }
};