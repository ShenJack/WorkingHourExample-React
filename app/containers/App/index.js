/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { nextOccurrenceByYear, nextOccurrenceByMonth, format, formatDate } from 'utils/date';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'index.css';
import moment from 'moment';

const BY_DAY = 0;
const BY_WEEK = 1;
const BY_MONTH = 2;
const BY_YEAR = 3;

const PeriodText = ['Day', 'Week', 'Month', 'Year'];
const repeatCountOptions = [];

const orderArray = ['first', 'second', 'third', 'fourth'];

const dayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const presetDates = [
  {},
  {
    name: 'Thanksgiving Day', repeat: true, startDate: {
      dynamic: true, dynamicDate: { month: 11, week: 4, day: 4 },
    }, repeatPeriod: BY_YEAR, repeatInterval: 1, repeatCound: -1,
  },
  {
    name: 'Mother\'s Day', repeat: true, startDate: {
      dynamic: true, dynamicDate: { month: 5, week: 2, day: 7 },
    }, repeatPeriod: BY_YEAR, repeatInterval: 1, repeatCound: -1,
  },

];


function DateInput(props) {
  let { field, name } = props;
  let { repeatPeriod, repeat } = this.state;
  let self = this;

  function updateCheckbox(subField) {
    return function(e) {
      let changedState = {};
      changedState[field] = { ...self.state[field] };
      changedState[field][subField] = e.target.checked;
      self.setState(changedState);
    };
  }

  function updateDate() {
    return function(e) {
      let changedState = {};
      changedState[field] = { ...self.state[field] };
      changedState[field].date = e;
      self.setState(changedState);
    };
  }

  function updateDynamicDateData(subField) {
    return function(e) {
      let changedState = {};
      changedState[field] = { ...self.state[field] };
      changedState[field]['dynamicDate'] = { ...self.state[field]['dynamicDate'] };
      changedState[field]['dynamicDate'][subField] = e.target.value;
      self.setState(changedState);
    };
  }

  let dateObject = this.state[field];
  return <div>
    <hr/>
    <div className={'form-row'}>
      <div className={'form-item-label'}>{name}</div>
    </div>
    <hr/>
    <div className={'form-row'}
    >
      <label className={'form-item-label'}>Dynamic</label>
      <input type='checkbox' checked={dateObject.dynamic}
             onChange={updateCheckbox('dynamic')}/>
    </div>

    {!dateObject.dynamic && <div className={'form-row-indent'}
    >
      <div className={'form-row'}>
        <label style={{ marginRight: 10 }}>Date</label>
        <div style={{ border: '1px solid black' }}>
          <DatePicker selected={dateObject.date} placeholder="select"
                      onChange={updateDate()}/>
        </div>
      </div>
    </div>}
    {dateObject.dynamic && <div className={'form-row-indent'}>
      <div className={'form-row'} style={{ display: 'flex', flexDirection: 'row' }}>
        {(dateObject.dynamic && repeatPeriod > BY_WEEK || !repeat) &&
        <div className={'custom-control custom-control-inline'} style={{ paddingLeft: 0, marginRight: 0 }}>
          The
          <select className={'custom-select'} style={{ width: 120, marginLeft: 10 }} value={dateObject.dynamicDate.week}
                  onChange={updateDynamicDateData('week')}>
            <option value={1}>First</option>
            <option value={2}>Second</option>
            <option value={3}>Third</option>
            <option value={4}>Fourth</option>
          </select>
        </div>
        }
        {(dateObject.dynamic && repeatPeriod > BY_DAY || !repeat) &&
        <div className={'custom-control custom-control-inline'} style={{ paddingLeft: 0, marginRight: 0 }}>
          <select className={'custom-select'} style={{ width: 120, marginLeft: 10 }}
                  value={dateObject.dynamicDate.day}
                  onChange={updateDynamicDateData('day')}>
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
            <option value={6}>Saturday</option>
            <option value={7}>Sunday</option>
          </select></div>
        }

        {(dateObject.dynamic && repeatPeriod > BY_MONTH || !repeat) &&
        <div style={{ paddingLeft: 0, marginRight: 0 }} className={'custom-control custom-control-inline'}>Of
          <select className={'custom-select'} style={{ width: 120, marginLeft: 10 }}
                  value={dateObject.dynamicDate.month}
                  onChange={updateDynamicDateData('month')}>
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select></div>
        }

      </div>
      {repeatPeriod > BY_WEEK && (
        <div className={'form-row'}>
          <label className={'form-item-label'} style={{ width: 120 }}>Next Occurrence</label>
          <div>{repeatPeriod === BY_YEAR ?
            format(nextOccurrenceByYear(dateObject.dynamicDate.month, dateObject.dynamicDate.week, dateObject.dynamicDate.day)) :
            format(nextOccurrenceByMonth(dateObject.dynamicDate.week, dateObject.dynamicDate.day))}</div>
        </div>
      )}
    </div>}


  </div>;
}


class ExcludeDate extends React.Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      formLayout: 'horizontal',
      name: '',
      startDate:
        {
          dynamic: false,
          date: new Date(),
          dynamicDate: {
            month: 1,
            week: 1,
            day: 1,
          },
        },
      endDate: {
        dynamic: false, date: new Date(), dynamicDate: {
          month: 1,
          week: 1,
          day: 1,
        },
      },
      noEnd: true, //No end in repeat
      repeat: true,
      repeatCount: -1,
      repeatInterval: 1,
      repeatPeriod: BY_YEAR,
    };
  }

  getPeriodText = () => {
    return PeriodText[this.state.repeatPeriod];
  };


  handleDateChange = (date) => {

  };

  handleRepeatChange = (event) => {
    this.setState({ repeat: event.target.checked });
  };

  handleRepeatTypeChange = (e) => {
    this.setState({ dateType: e.target.value });
  };

  handleRepeatPeriodChange = (e) => {
    this.setState({ repeatPeriod: Number.parseInt(e.target.value) });
  };

  handleNoEndChange = (event) => {
    this.setState({ noEnd: event.target.checked });
  };

  handleIntervalChange = (e) => {
    this.setState({ repeatInterval: e.target.value });
  };

  handleCountChange = (e) => {
    if (e.target.value === '-1') {
      this.setState({ noEnd: true });
    }
    this.setState({ repeatCount: e.target.value });
  };

  handlePresetChange = (e) => {
    this.setState(presetDates[e.target.value]);
  };


  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };


  toggleEdit = (e) => {
    if (this.props.date.edit) {
      this.props.onEdit(this.props.date.index, false);
    } else {
      this.props.onEdit(this.props.date.index, true);
    }
  };

  deleteDate = (e) => {
    if (window.confirm('Are you sure to delete?')
    ) {
      this.props.onDelete(this.props.date.index);
    } else {

    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('call update');
    this.props.onChange(this.props.date.index, this.state);
  }

  getBrief() {
    let words = [];
    words.push(this.state.name);
    if (this.state.repeat) {
      words.push('repeat');
      words.push('on');
      if (this.state.startDate.dynamic) {
        words.push('each');
        if (this.state.repeatPeriod > BY_WEEK) {
          words.push(orderArray[this.state.startDate.dynamicDate.week - 1]);
        }
        words.push(dayArray[this.state.startDate.dynamicDate.day - 1]);
        if (this.state.repeatPeriod > BY_MONTH) {
          words.push('of');
          words.push(monthArray[this.state.startDate.dynamicDate.month - 1]);
        }
      } else {
        words.push(formatDate(this.state.startDate.date));
      }
      if (!this.state.noEnd) {
        words.push('till');
        if (this.state.endDate.dynamic) {
          words.push('the');
          words.push(orderArray[this.state.endDate.dynamicDate.week - 1]);
          words.push(dayArray[this.state.endDate.dynamicDate.day - 1]);
          words.push('of');
          words.push(monthArray[this.state.endDate.dynamicDate.month - 1]);
        } else {
          words.push(formatDate(this.state.endDate.date));
        }
      } else {

      }

    }else {
      words.push('on');
      if (this.state.startDate.dynamic) {
        if (this.state.repeatPeriod > BY_WEEK) {
          words.push(orderArray[this.state.startDate.dynamicDate.week - 1]);
        }
        words.push(dayArray[this.state.startDate.dynamicDate.day - 1]);
        if (this.state.repeatPeriod > BY_MONTH) {
          words.push('of');
          words.push(monthArray[this.state.startDate.dynamicDate.month - 1]);
        }
      } else {
        words.push(formatDate(this.state.startDate.date));
      }
    }

    return words.join(' ');
  }

  render() {
    const { date, formLayout, repeat, noEnd } = this.state;
    return (
      <div className={'excluded-date'}>
        {this.props.date.edit ? <div>
            <div className={'form-row'}>
              <label className={'form-item-label'}>Name</label>
              <input placeholder={'input date name'} value={this.state.name}
                     style={{ width: 200 }}
                     onChange={this.handleNameChange}/>
            </div>
            <div>
              <label className={'form-item-label'}>Preset</label>
              <select className={'custom-select'}
                      onChange={this.handlePresetChange}
                      style={{ width: 300 }}
                      placeholder="select preset date"
              >
                {presetDates.map((item, index) =>
                  <option key={index} value={index}>{item.name}</option>,
                )}
              </select>
            </div>
            <div className={'form-row'}
            >
              <label className={'form-item-label'} htmlFor="checkbox-repeat">Repeat</label>
              <input id='checkbox-repeat' type='checkbox' checked={this.state.repeat} onChange={this.handleRepeatChange}>
              </input>
            </div>
            {repeat && <div className={'form-row'}>
              <label className={'form-item-label'}>Repeat Period</label>
              <input id='radio-week' name="period" type="radio"
                     checked={this.state.repeatPeriod === BY_WEEK}
                     onChange={this.handleRepeatPeriodChange} value={BY_WEEK}/>
              <label>Week </label>

              <label><input id='radio-month' name="period" type="radio"
                            checked={this.state.repeatPeriod === BY_MONTH}
                            onChange={this.handleRepeatPeriodChange} value={BY_MONTH}/>Month</label>

              <input id='radio-year' name="period" type="radio"
                     checked={this.state.repeatPeriod === BY_YEAR}
                     onChange={this.handleRepeatPeriodChange} value={BY_YEAR}/>
              <label>Year </label>
            </div>
            }

            {repeat && <div className={'form-row'}>
              <label className={'form-item-label'}>Repeat Interval</label>
              <div>Each <select className={'custom-select'} value={this.state.repeatInterval}
                                style={{ width: 70, marginRight: 10 }}
                                onChange={this.handleIntervalChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
                {this.getPeriodText() + (this.state.repeatInterval > 1 ? 's' : '')}
              </div>
            </div>}
            {repeat && <div className={'form-row'}>
              <label className={'form-item-label'}>Repeat Count</label>
              <div><select className={'custom-select'} value={this.state.repeatCount}
                           style={{ width: 120, marginRight: 10 }}
                           onChange={this.handleCountChange}>
                <option value={-1}>No End</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select> {this.state.repeatCount > -1 && 'Time'}{this.state.repeatCount > 1 && 's'}
              </div>
            </div>}
            {DateInput.call(this, {
              field: 'startDate',
              name: 'Start Date',
            })}

            {repeat && !noEnd && DateInput.call(this, {
              field: 'endDate',
              name: 'End Date',
            })}
            {repeat &&
            <div className={'form-row'}>
              <label className={'form-item-label'}>No End</label>
              <input type='checkbox' checked={this.state.noEnd}
                     onChange={this.handleNoEndChange}/>
            </div>}
            <div className={'form-row'}>
              <div className={'form-item-label'}></div>
              {/*<button type="button" className="btn btn-outline-primary">Save</button>*/}
              <button type="button" className={'btn btn-outline-dark'} onClick={this.toggleEdit}>Close</button>
            </div>
          </div> :
          <div>
            {this.getBrief()}
            <button type="button" className={'btn btn-outline-dark'} onClick={this.toggleEdit}>Edit</button>
            <button type="button" className={'btn btn-outline-danger'} onClick={this.deleteDate}>Delete</button>
          </div>}
      </div>
    );
  }

  componentDidMount() {
    this.setState(this.props.date);
  }
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      excludedDate: [],
      htmlContainer: undefined,
    };
  }

  handleChildEdit = (index, show) => {
    let list = this.state.excludedDate;
    if (show) {
      list.forEach(item => {
        item.edit = false;
      });
      list[index].edit = true;
    } else {
      list[index].edit = false;
    }
    this.setState({
      excludedDate: list,
    });
  };

  handleChildDelete = (index) => {
    let list = this.state.excludedDate;
    list.splice(index, index + 1);
    list.forEach((item, index) => {
      item.index = index;
    });
    this.state.htmlContainer.children[index].remove();
    this.setState({
      excludedDate: list,
    });
  };

  addChild = () => {

    let list = this.state.excludedDate;
    let newItem = {};
    list.push({});
    this.serialize(newItem);
    list.forEach((item, index) => {
      item.index = index;
    });
    this.setState({
      excludedDate: list,
    });
  };

  update = (index, data) => {
    this.state.htmlContainer.children[index].firstElementChild.value = JSON.stringify(data);
  };

  serialize = (item) => {
    let nameWrapper = document.createElement('div');
    nameWrapper.setAttribute('name', 'excludedDates');
    let singleDataContainer = document.createElement('input');
    singleDataContainer.setAttribute('name', '_.jsonData');
    singleDataContainer.setAttribute('value', JSON.stringify(item));
    nameWrapper.appendChild(singleDataContainer);
    this.state.htmlContainer.appendChild(nameWrapper);
  };

  render() {
    return (
      <div>
        {this.state.excludedDate.length <= 0 ?
          <div>There's no excluded dates</div> : this.state.excludedDate.map((item, index) => (
            <ExcludeDate key={index} date={item} onEdit={this.handleChildEdit} onDelete={this.handleChildDelete}
                         onChange={this.update}/>
          ))}
        <button type={'button'} className='btn btn-outline-primary form-row' onClick={this.addChild}>Add</button>
      </div>
    );
  }

  componentDidMount() {
    let elements = document.getElementsByClassName('excluded-date-data-container');
    let list = [];
    for (let i = 0; i < elements.length; i++) {
      try {
        list.push(JSON.parse(elements[i].firstElementChild.value));
      }catch (e) {

      }
      console.log(i);
    }
    let htmlContainer = document.getElementById('excluded-repeat-container');
    //Clear container
    htmlContainer.firstElementChild.remove();

    this.setState({
      htmlContainer: htmlContainer,
    },()=>{

      //refill container with custom data
      list.forEach((item) => {
        this.serialize(item);
      });

      list.forEach((item, index) => {
        item.edit = false;
        item.index = index;
      });

      this.setState({
        excludedDate: list,
      });
    });
  }
}
