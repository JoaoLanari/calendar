import React from 'react'
import dateFns from 'date-fns'
import { changeToPortuguese } from './helperMonth'
import './MonthCalendar.css'
import NewSchedule from '../../Schedule/NewSchedule'
import { connect } from 'react-redux'

const color = [
  {
    eventId: 1,
    backgroundColor: '#512DA8',
    color: '#ffffff'
  },
  {
    eventId: 2,
    backgroundColor: '#FFEB3B',
    color: '#000000'
  },
  {
    eventId: 3,
    backgroundColor: '#FF5722',
    color: '#ffffff'
  },
  {
    eventId: 4,
    backgroundColor: '#0288D1',
    color: '#ffffff'
  },
  {
    eventId: 5,
    backgroundColor: '#4CAF50',
    color: '#000000'
  }
]

const setColors = (id, type) => {
  if (type === 'background') {
    const selectedColor = color.filter(c => c.eventId === id)
    return selectedColor[0].backgroundColor
  } else if (type === 'text') {
    const selectedColor = color.filter(c => c.eventId === id)
    return selectedColor[0].color
  }
}

class MonthCalendar extends React.Component {

  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    modal: false
  }

  renderHeader() {
    const dateFormatYear = "YYYY";
    const dateFormatMonth = "MMMM";
    return (
      <div className="header">
        <div style={{display: "-webkit-inline-box"}}>
          <div className="">
            <div className="icon" onClick={this.prevMonth}>
              chevron_left
            </div>
          </div>
          <div className="">
            <span>
              {changeToPortuguese(dateFns.format(this.state.currentMonth, dateFormatMonth))} {dateFns.format(this.state.currentMonth, dateFormatYear)}
            </span>
          </div>
          <div className="" onClick={this.nextMonth}>
            <div className="icon">chevron_right</div>
          </div>
        </div>
      </div>
    )
  }

  renderDays() {
    const week = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
    const days = []
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {week[i]}
        </div>
      )
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state
    const monthStart = dateFns.startOfMonth(currentMonth)
    const monthEnd = dateFns.endOfMonth(monthStart)
    const startDate = dateFns.startOfWeek(monthStart)
    const endDate = dateFns.endOfWeek(monthEnd)

    const dateFormat = "D"
    const monthFormat = "M"
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ""
    let formattedMonth = ""
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        formattedMonth = dateFns.format(day, monthFormat)
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
              }`}
            key={day}
            onClick={() => {this.onDateClick(dateFns.parse(cloneDay)); this.setState({modal: true})}}
          >
            <span className="number">{formattedDate}</span>
            <span>{this.props.events && this.renderEvent(formattedDate, formattedMonth)}</span><br />
            <span className="bg">{formattedDate}</span>
          </div>
        )
        day = dateFns.addDays(day, 1)
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      )
      days = []
    }
    return <div className="body">{rows}</div>
  }

  renderEvent = (day, month) => {
    const date = new Date(this.state.currentMonth)
    const currentMonth = date.getMonth() + 1 
    if (parseInt(month) === parseInt(currentMonth)) {
      const filterEvents = this.props.events.filter(e => parseInt(day) === parseInt(dateFns.getDate(e.data_inicial)))
      let eventArray = []
      if (filterEvents.length > 0) {
        filterEvents.map((event, key) => {
          if(parseInt(month) === parseInt(dateFns.getMonth(event.data_inicial) + 1)) {
            eventArray.push(
              <div 
                key={key} 
                className='tag' 
                style={{ backgroundColor: setColors(event.tipo, 'background'), color: setColors(event.tipo, 'text') }}
              ><b>{event.descricao}</b>
              </div>
            )
          }         
        })
      }
      return eventArray
    }
    return
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    })
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    })
  }

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    })
  }

  closeModal = () => {
    this.setState({modal: false})
  }

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        <NewSchedule onNewEvent={this.props.onNewEvent} modal={this.state.modal} closeModal={this.closeModal} />
      </div>
    );
  }
}

const mapStateToProps = ({ calendar }) => {
  return {
    events: calendar.events
  }
}

export default connect(mapStateToProps)(MonthCalendar)