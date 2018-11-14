import React from 'react'
import dateFns from 'date-fns'
import './WeekCalendar.css'

class Calendar extends React.Component {

  state = {
    currentWeek: new Date(),
    selectedDate: new Date()
  }

  renderHeader() {
    const dateFormat = "DD/MM/YY"
    let startOfWeek = dateFns.startOfWeek(this.state.currentWeek)
    let endOfWeek = dateFns.endOfWeek(this.state.currentWeek)
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {dateFns.format(startOfWeek, dateFormat)} - {dateFns.format(endOfWeek, dateFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    )
  }

  renderDays() {
    const dateFormat = "DD/MM";
    let startDate = dateFns.startOfWeek(this.state.currentWeek)
    let endOfWeek = dateFns.endOfWeek(this.state.currentWeek)
    let days = []

    days.push(
      <div style={{ marginLeft: -15, marginRight: -15 }} className="col col-center" key='hrs'>
        <div>Horário</div>
        {this.renderCells(
          ['02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
          true
        )}
      </div>
    )

    const startDayOfWeek = dateFns.getDate(dateFns.startOfWeek(this.state.currentWeek))
    const finalDayOfWeek = startDayOfWeek + 7
    let weekDayAcumulator = 0
    for (let i = startDayOfWeek; i < finalDayOfWeek; i++) {      
      if (this.props.events) {
        let selectedEvents = this.props.events.filter(event => parseInt(event.objetoData.dataInicial.dia) === i)
        days.push(
          <div style={{ marginLeft: -15, marginRight: -15 }} className="col col-center" key={i}>
            {`${dateFns.format(dateFns.addDays(startDate, weekDayAcumulator), dateFormat)}`}
            {this.renderCells(selectedEvents)}
          </div>
        )
      }
      weekDayAcumulator += 1
    }
    const weekComponent = (
      <div style={{ border: '1px solid', padding: 0 }} className="header row">
        <div className="days row">{days}</div>
      </div>
    )
    return weekComponent;
  }

  weekDayHelper(num) {
    switch (num) {
      case 0:
        return 'Dom'
      case 1:
        return 'Seg'
      case 2:
        return 'Ter'
      case 3:
        return 'Qua'
      case 4:
        return 'Qui'
      case 5:
        return 'Sex'
      case 6:
        return 'Sab'
      default:
        break;
    }
  }

  renderCells(dailyActivity, ruler) {
    let cells = []
    if (ruler) {
      for (let i = 0; i < 12; i++) {
        cells.push(
          <div
            style={{
              borderTop: '1px solid',
              width: '100%',
              height: '50px',
              paddingTop: '15px'
            }}
            key={i}
          >
            {dailyActivity[i]}
          </div>
        )
      }
    } else {
      if (dailyActivity.length > 0) {
        for (let i = 0; i < 12; i++) {
          cells.push(
            <div key={i} style={{ borderTop: '1px solid', width: '100%', height: '50px' }}>
              {/* A style das cores dos eventos deverá ser feito aqui, mas precisa desses dados virem do bd. */}
              <div className="tag">
                {dailyActivity.map(activity => {
                  if (parseInt(activity.objetoData.dataInicial.hora / 2) === i) {
                    return activity.titulo
                  }
                })}
              </div>
            </div>
          )
        }
      } else {
        for (let i = 0; i < 12; i++) {
          cells.push(
            <div key={i + 20} style={{ borderTop: '1px solid', width: '100%', height: '50px' }}>
            </div>
          )
        }
      }
    }
    return cells
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    })
  }

  nextMonth = () => {
    this.setState({
      currentWeek: dateFns.addWeeks(this.state.currentWeek, 1)
    })
  }

  prevMonth = () => {
    this.setState({
      currentWeek: dateFns.subWeeks(this.state.currentWeek, 1)
    })
  }

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
      </div>
    );
  }
}

export default Calendar;