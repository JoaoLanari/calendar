import dateFns, { getHours } from 'date-fns'
import { calendarContats } from './actionTypes'
import { calendarService } from '../../services'
import { userActions } from './authentication'



export const fetchAllEvents = (calendar_id) => {
  return dispatch => {
    calendarService.getEvents(calendar_id).then((response) => {
      dispatch(setAllEvents(response))
    }, error => {
      dispatch(userActions.logout())
    })
  }
}

const setAllEvents = (eventsArray) => {
  return {
    type: calendarContats.SET_ALL_EVENTS,
    payload: eventsArray
  }
}

export const newEvent = (calendar_id, event) => {
  return (dispatch, getState) => {
    event.criado = new Date()
    event.atualizado = new Date()
    calendarService.createEvent(event, calendar_id).then(response => {
      dispatch(fetchAllEvents(calendar_id))
    }, err => {
      dispatch(userActions.logout())
    })
  }
}

<<<<<<< HEAD
=======
export const getCalendar = () => {
  return dispatch => {
    calendarService.getCalendario().then(calendar => {
      dispatch({type: calendarContats.GET_CALENDAR, calendar: calendar[0]})
      if (calendar){
        dispatch(fetchAllEvents(calendar[0].id))
      }
    }, err => {
      dispatch(userActions.logout())
    })
  }
}

>>>>>>> 2cf6778f3547eab6bc77d046cea9eb9ddfda9ef0
// helper date
const formatDates = (initialDate, finalDate) => {

  return {
    dataInicial: {
      ano: dateFns.getYear(initialDate),
      mes: dateFns.getMonth(initialDate) + 1,
      dia: dateFns.getDate(initialDate),
      hora: dateFns.getHours(initialDate),
      minuto: dateFns.getMinutes(initialDate)
    },
    dataFinal: {
      ano: dateFns.getYear(finalDate),
      mes: dateFns.getMonth(finalDate) + 1,
      dia: dateFns.getDate(finalDate),
      hora: dateFns.getHours(finalDate),
      minuto: dateFns.getMinutes(finalDate)
    }
  }
}
