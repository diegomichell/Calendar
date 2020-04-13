import React from 'react';
import moment, {MomentInput} from 'moment';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

import './calendar.scss';

const getDates = (startDate: MomentInput, stopDate: MomentInput) => {
  const dateArray = [];
  let currentDate = moment(startDate);
  while (currentDate <= moment(stopDate)) {
    dateArray.push(moment(currentDate).format("YYYY"));
    currentDate = moment(currentDate).add(1, "year");
  }
  return dateArray;
};

const MonthList = (props: any) => {
  const months = props.months.map((month: any) => {
    return (
      <td
        key={month}
        className="calendar-month"
        onClick={() => {
          props.onMonthSelected(month);
        }}
      >
        <span>{month}</span>
      </td>
    )
  });

  let rows: any[] = [], cells: any[] = [];

  months.forEach((row: any, i: number) => {
    if (i % 3 !== 0 || i === 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
  });

  rows.push(cells);

  const monthListRows = rows.map((d, i) => <tr key={`${i}-mlr`}>{d}</tr>);

  return (
    <table className="calendar-month">
      <thead>
      <tr>
        <th colSpan={4}>Select month</th>
      </tr>
      </thead>
      <tbody>{monthListRows}</tbody>
    </table>
  );
};

const YearTable = ({year, onYearSelected}: any) => {
  const rows = [];
  let cells: any[] = [];
  const nextEleven = moment()
    .set("year", year)
    .add(11, "year")
    .format("Y");

  const eleven_years = getDates(year, nextEleven);

  const months = eleven_years.map(year => {
    return (
      <td
        key={year}
        className="calendar-month"
        onClick={() => {
          onYearSelected(year);
        }}
      >
        <span>{year}</span>
      </td>
    );
  });


  months.forEach((row, i) => {
    if (i % 3 !== 0 || i === 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
  });

  rows.push(cells);

  const yearListRows = rows.map((d, i) => <tr key={i}>{d}</tr>);

  return (
    <table className="calendar-month">
      <thead>
      <tr>
        <th colSpan={4}>Select year</th>
      </tr>
      </thead>
      <tbody>{yearListRows}</tbody>
    </table>
  );
};

class Calendar extends React.Component {
  state = {
    showYearTable: false,
    showMonthTable: false,
    showDateTable: true,
    currentDate: moment(),
    allMonths: moment.months(),
    selectedDay: null
  };

  daysInMonth = () => {
    return this.state.currentDate.daysInMonth();
  };

  currentYear = () => {
    return this.state.currentDate.format("Y");
  };

  currentDay = () => {
    return Number.parseInt(this.state.currentDate.format("D"));
  };

  firstDayOfMonth = () => {
    let dateObject = this.state.currentDate;

    return Number.parseInt(moment(dateObject)
      .startOf("month")
      .format("d"));
  };

  month = () => {
    return this.state.currentDate.format("MMMM");
  };

  showMonth = () => {
    this.setState({
      showMonthTable: !this.state.showMonthTable,
      showDateTable: !this.state.showDateTable
    });
  };

  setMonth = (month: string) => {
    const monthNo = this.state.allMonths.indexOf(month);
    let currentDate = {...this.state.currentDate};
    currentDate = moment(currentDate).set("month", monthNo);
    this.setState({
      currentDate,
      showMonthTable: !this.state.showMonthTable,
      showDateTable: !this.state.showDateTable
    });
  };

  showYearTable = () => {
    this.setState({
      showYearTable: !this.state.showYearTable,
      showDateTable: !this.state.showDateTable
    });
  };

  onPrev = () => {
    this.setState({
      currentDate: this.state.currentDate.subtract(1, this.state.showYearTable ? "year" : "month")
    });
  };

  onNext = () => {
    this.setState({
      currentDate: this.state.currentDate.add(1, this.state.showYearTable ? "year" : "month")
    });
  };

  setYear = (year: number) => {
    let currentDate = {...this.state.currentDate};
    currentDate = moment(currentDate).set("year", year);
    this.setState({
      currentDate,
      showMonthTable: !this.state.showMonthTable,
      showYearTable: !this.state.showYearTable
    });
  };

  onDayClick = (d: number) => {
    this.setState(
      {
        selectedDay: d
      },
      () => {
        console.log("SELECTED DAY: ", this.state.selectedDay);
      }
    );
  };

  renderWeekDays() {
    return moment.weekdaysShort().map(day => {
      return <th key={day}>{day}</th>;
    });
  }

  render() {
    const firstBlanks = [];
    const lastBlanks = [];
    const daysInMonth = [];
    const rows: any[] = [];
    let cells: any[] = [];
    const daysInPreviousMonth = moment().month(this.state.currentDate.month() - 1).daysInMonth();

    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      firstBlanks.push(<td key={`${i}-empty`} className="calendar-day empty">{daysInPreviousMonth - (this.firstDayOfMonth() - i - 1)}</td>);
    }

    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d === this.currentDay() ? "today" : "";
      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`}>
          <span
            onClick={() => {
              this.onDayClick(d);
            }}
          >
            {d}
          </span>
        </td>
      );
    }

    let totalSlots = [...firstBlanks, ...daysInMonth];
    const daysInNextMonth = 42 - totalSlots.length;

    for (let i = 0; i < daysInNextMonth; i++) {
      lastBlanks.push(<td key={`${i}-empty`} className="calendar-day empty">{i + 1}</td>);
    }

    totalSlots = [...totalSlots, ...lastBlanks];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    const daysInMonthRows = rows.map((d, i) => <tr key={`${i}-dmr`}>{d}</tr>);

    return (
      <div className="calendar">
        <div className="calendar-nav">
          <span className="calendar-button button-prev">
            <IoIosArrowBack
              onClick={() => {
                this.onPrev();
              }}
            />
          </span>
          {!this.state.showMonthTable && (
            <span
              onClick={() => {
                this.showMonth();
              }}
              className="calendar-label"
            >
              {this.month()}
            </span>
          )}
          <span className="calendar-label" onClick={() => this.showYearTable()}>
            {this.currentYear()}
          </span>
          <span className="calendar-button button-next">
            <IoIosArrowForward
              onClick={() => {
                this.onNext();
              }}
            />
          </span>
        </div>

        <div className="calendar-date">
          {this.state.showYearTable && <YearTable onYearSelected={this.setYear} year={this.currentYear()}/>}
          {this.state.showMonthTable && (
            <MonthList onMonthSelected={this.setMonth} months={moment.months()}/>
          )}
        </div>

        {this.state.showDateTable && (
          <div className="calendar-date">
            <table className="calendar-day">
              <thead>
              <tr>{this.renderWeekDays()}</tr>
              </thead>
              <tbody>{daysInMonthRows}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

}

export default Calendar;