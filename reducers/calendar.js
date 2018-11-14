import { calendarContats } from '../actions/actionTypes'

const calendar = (state = {}, action) => {
  const { payload } = action
  switch (action.type) {
    case calendarContats.GET_CALENDAR:
      return {
        ...state,
        calendar: action.calendar
      }
    case calendarContats.SET_ALL_EVENTS:
      return {
        ...state,
        events: action.payload
      }

    case calendarContats.SET_AN_EVENT:
      return {
        ...state,
        events: action.payload
      }
  
    default:
      return state
  }
}

export { calendar }
