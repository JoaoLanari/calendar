import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchAllEvents, newEvent, getCalendar } from '../../store/actions/index'

import MonthCalendar from './MonthCalendar/MonthCalendar'
import WeekCalendar from './WeekCalendar/WeekCalendar'

const eventsArray = [
  {
    tipo: 1,
    data_inicial: '2018-11-11 14:15:15',
    data_final: '2018-11-11 15:15:15',
    titulo: 'Desenvolvimento Web',
    descricao: 'Prova valendo 15 pontos.',
    criado: '2018-10-11 14:15:15',
    atualizado: '2018-10-11 15:15:15'
  },
  {
    tipo: 2,
    data_inicial: '2018-11-11 16:15:15',
    data_final: '2018-11-11 17:15:15',
    titulo: 'Deseonvolvimento Mobile',
    descricao: 'Trabalho de Aplicativo Todo App',
    criado: '2018-01-01 14:15:15',
    atualizado: '2018-01-01 14:15:15'
  },
  {
    tipo: 3,
    data_inicial: '2018-11-13 14:15:15',
    data_final: '2018-11-23 14:15:15',
    titulo: 'Banco de Dados',
    descricao: 'Exercício valendo 5 pontos',
    criado: '2018-01-01 14:15:15',
    atualizado: '2018-01-01 14:15:15'
  },
  {
    tipo: 4,
    data_inicial: '2018-11-14 08:00:00',
    data_final: '2018-11-14 12:00:00',
    titulo: 'Prova GLobal',
    descricao: 'Prova de todas as material',
    criado: '2018-01-01 14:15:15',
    atualizado: '2018-01-01 14:15:15'
  },
  {
    tipo: 5,
    data_inicial: '2018-11-16 14:00:00',
    data_final: '2018-11-16 20:00:00',
    titulo: 'Calourada',
    descricao: 'Calourada para todos os cursos',
    criado: '2018-01-01 14:15:15',
    atualizado: '2018-01-01 14:15:15'
  }
]

class Calendar extends Component {

  state ={
    calendarType: 'week'
  }

  componentDidMount() {
    this.props.onGetCalendar()
  }

  state = {
    calendar: "month"
  }

  render () {
    return (
      <div>
<<<<<<< HEAD
        {this.state.calendarType === 'month' && (
          <MonthCalendar 
            events={this.props.events}
            onNewEvent={this.props.onNewEvent}
          />
        )}
        {this.state.calendarType === 'week' && (
          <WeekCalendar 
            events={this.props.events}
            onNewEvent={this.props.onNewEvent}
          />
        )}
      </div>
      
=======
        <div className="semanames">
          <div style={{borderRight: "1px solid #ccc"}} onClick={() => {this.setState({calendar: "month"})}}>
            <label>Mês</label>
          </div>
          <div>
            <label onClick={() => {this.setState({calendar: "week"})}}>Semana</label>
          </div>
        </div>
        {this.state.calendar == "month" && <MonthCalendar 
          onNewEvent={this.props.onNewEvent}
        />}
        {this.state.calendar == "week" && <WeekCalendar 
          events={this.props.events}
          onNewEvent={this.props.onNewEvent}
        />}
      </div>
>>>>>>> 2cf6778f3547eab6bc77d046cea9eb9ddfda9ef0
    )
  }
}

const mapStateToProps = ({ calendar }) => {
  return {
    events: calendar.events,
    calendar: calendar.calendar
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetCalendar: () => dispatch(getCalendar()),
    onFetchAllEvents: (eventsArray) => dispatch(fetchAllEvents(eventsArray)),
<<<<<<< HEAD
    onNewEvent: (event) => dispatch(newEvent(event))
=======
    onNewEvent: (calendar_id, event) => dispatch(newEvent(calendar_id, event))
>>>>>>> 2cf6778f3547eab6bc77d046cea9eb9ddfda9ef0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
