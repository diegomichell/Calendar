import ACTION_TYPES from './action-types';
import {Moment} from "moment";

export default {
  setCurrentDate: (currentDate: Moment) => {
    return {
      type: ACTION_TYPES.SET_CURRENT_DATE,
      payload: {
        currentDate
      }
    }
  }
}