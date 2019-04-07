/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Form, Button, DatePicker, message, Switch, LocaleProvider, Radio, Input, RadioGroup, Divider } from 'antd';
import 'react-day-picker/lib/style.css';
import { nextOccurrenceByYear, nextOccurrenceByMonth, format } from 'utils/date';
import enUS from 'antd/lib/locale-provider/en_US';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import jaJP from 'antd/lib/locale-provider/ja_JP';
import esES from 'antd/lib/locale-provider/es_ES';
import frFR from 'antd/lib/locale-provider/fr_FR';
import moment from 'moment';
import 'moment/locale/en-au';
import Select from 'antd/lib/select';
import FormItem from 'antd/lib/form/FormItem';

const AppWrapper = styled.div`
  max-width: calc(1068px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const BY_DAY = 0;
const BY_WEEK = 1;
const BY_MONTH = 2;
const BY_YEAR = 3;

const STATIC_DATE = 'static';
const DYNAMIC_DATE = 'dynamic';

const PeriodText = ['Day', 'Week', 'Month', 'Year'];
const repeatCountOptions = [

];
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const inlineFormItem = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const buttonItemLayout = {
  wrapperCol: { span: 14, offset: 4 },
};

const presetDates = [
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

function fillPresetDates() {
  // presetDates.push(<Select.Option value={}></Select.Option>);
}


function DateInput(props) {
  let { field, name } = props;
  let { repeatPeriod, repeat } = this.state;
  let self = this;

  function updateData(subField) {
    return function(e) {
      let changedState = {};
      changedState[field] = { ...self.state[field] };
      changedState[field][subField] = e;
      self.setState(changedState);
    };
  }

  function updateDynamicDateData(subField) {
    return function(e) {
      let changedState = {};
      changedState[field] = { ...self.state[field] };
      changedState[field]['dynamicDate'] = { ...self.state[field]['dynamicDate'] };
      changedState[field]['dynamicDate'][subField] = e;
      self.setState(changedState);
    };
  }

  let dateObject = this.state[field];
  return <div>
    <Divider orientation={'left'} dashed>{name}</Divider>

    <Form.Item
      label="Dynamic"
      {...formItemLayout}>
      <Switch checked={dateObject.dynamic} onChange={updateData('dynamic')}/>
    </Form.Item>
    {!dateObject.dynamic && <Form.Item
      label="Date"
      {...formItemLayout}
    >
      <DatePicker placeholder="select" onChange={updateData('date')}/>
    </Form.Item>}
    {dateObject.dynamic && <Form.Item label="Date" {...formItemLayout}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {(dateObject.dynamic && repeatPeriod > BY_WEEK || !repeat) &&
        <div>The
          <Select style={{ width: 120, marginLeft: 10 }} value={dateObject.dynamicDate.week}
                  onChange={updateDynamicDateData('week')}>
            <Select.Option value={1}>First</Select.Option>
            <Select.Option value={2}>Second</Select.Option>
            <Select.Option value={3}>Third</Select.Option>
            <Select.Option value={4}>Fourth</Select.Option>
            <Select.Option value={-1}>Last</Select.Option>
          </Select>
        </div>
        }
        {(dateObject.dynamic && repeatPeriod > BY_DAY || !repeat) &&
        <div><Select style={{ width: 120, marginLeft: 10 }} value={dateObject.dynamicDate.day}
                     onChange={updateDynamicDateData('day')}>
          <Select.Option value={1}>Monday</Select.Option>
          <Select.Option value={2}>Tuesday</Select.Option>
          <Select.Option value={3}>Wednesday</Select.Option>
          <Select.Option value={4}>Thursday</Select.Option>
          <Select.Option value={5}>Friday</Select.Option>
          <Select.Option value={6}>Saturday</Select.Option>
          <Select.Option value={7}>Sunday</Select.Option>
        </Select></div>
        }


        {(dateObject.dynamic && repeatPeriod > BY_MONTH || !repeat) &&
        <div style={{ marginLeft: 10 }}>Of<Select style={{ width: 120, marginLeft: 10 }}
                                                  value={dateObject.dynamicDate.month}
                                                  onChange={updateDynamicDateData('month')}>
          <Select.Option value={1}>January</Select.Option>
          <Select.Option value={2}>February</Select.Option>
          <Select.Option value={3}>March</Select.Option>
          <Select.Option value={4}>April</Select.Option>
          <Select.Option value={5}>May</Select.Option>
          <Select.Option value={6}>June</Select.Option>
          <Select.Option value={7}>July</Select.Option>
          <Select.Option value={8}>August</Select.Option>
          <Select.Option value={9}>September</Select.Option>
          <Select.Option value={10}>October</Select.Option>
          <Select.Option value={11}>November</Select.Option>
          <Select.Option value={12}>December</Select.Option>
        </Select></div>
        }

      </div>
    </Form.Item>}
    {dateObject.dynamic && repeatPeriod > BY_WEEK && (
      <Form.Item label={'Next Occurrence'} {...formItemLayout}>
        <div>{repeatPeriod === BY_YEAR ?
          format(nextOccurrenceByYear(dateObject.dynamicDate.month, dateObject.dynamicDate.week, dateObject.dynamicDate.day)) :
          format(nextOccurrenceByMonth(dateObject.dynamicDate.week, dateObject.dynamicDate.day))}</div>
      </Form.Item>
    )}

  </div>;
}


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
      name: '',
      startDate:
        {
          dynamic: false,
          date: {},
          dynamicDate: {
            month: 1,
            week: 1,
            day: 1,
          },
        },
      endDate: {
        dynamic: false, date: {}, dynamicDate: {
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

  handleRepeatChange = (repeat, event) => {
    this.setState({ repeat: repeat });
  };

  handleRepeatTypeChange = (e) => {
    this.setState({ dateType: e.target.value });
  };

  handleRepeatPeriodChange = (e) => {
    this.setState({ repeatPeriod: e.target.value });
  };

  handleNoEndChange = (e) => {
    this.setState({ noEnd: e });
  };

  handleIntervalChange = (e) => {
    this.setState({ repeatInterval: e });
  };

  handleCountChange = (e) => {
    this.setState({ repeatCount: e });
  };

  handlePresetChange = (e) => {
    this.setState(presetDates[e]);
  };


  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  render() {
    const { date, formLayout, repeat, noEnd } = this.state;
    return (
      <LocaleProvider locale={zhCN}>

        <AppWrapper>
          <Helmet
            titleTemplate="Repeat Example for Working Hour Plugin"
            defaultTitle="Repeat Example for Working Hour Plugin"
          >
            <meta name="description" content="A React.js Boilerplate application"/>
          </Helmet>
          <Header/>
          <div>
            <Divider orientation={'left'} dashed>Exclude Date Config</Divider>
            <Form layout={formLayout}>
              <Form.Item label="Name" {...formItemLayout}>
                <Input placeholder={'input date name'} value={this.state.name} style={{ width: 200 }}
                       onChange={this.handleNameChange}/>
              </Form.Item>
              <Form.Item label="Preset" {...formItemLayout}>
                <Select
                  onChange={this.handlePresetChange}
                  style={{ width: 300 }}
                  placeholder="Select preset dates"
                >
                  {presetDates.map((item, index) =>
                    <Select.Option key={index} value={index}>{item.name}</Select.Option>,
                  )}
                </Select>
              </Form.Item>
              <Form.Item
                label="Repeat"
                {...formItemLayout}
              >
                <Switch checked={this.state.repeat} onChange={this.handleRepeatChange}>
                </Switch>
              </Form.Item>
              {repeat && <Form.Item label="Repeat Period" {...formItemLayout}>
                <Radio.Group onChange={this.handleRepeatPeriodChange} value={this.state.repeatPeriod}>
                  <Radio value={BY_WEEK}>Week</Radio>
                  <Radio value={BY_MONTH}>Month</Radio>
                  <Radio value={BY_YEAR}>Year</Radio>
                </Radio.Group>
              </Form.Item>}
              {repeat && <Form.Item label={'Repeat Interval'} {...formItemLayout}>
                <div>Each <Select value={this.state.repeatInterval}
                                  style={{ width: 70, marginLeft: 10, marginRight: 10 }}
                                  onChange={this.handleIntervalChange}>
                  <Select.Option value={1}>1</Select.Option>
                  <Select.Option value={2}>2</Select.Option>
                  <Select.Option value={3}>3</Select.Option>
                  <Select.Option value={4}>4</Select.Option>
                  <Select.Option value={5}>5</Select.Option>
                </Select>
                  {this.getPeriodText() + (this.state.repeatInterval > 1 ? 's' : '')}
                </div>
              </Form.Item>}
              {repeat && <Form.Item label={'Repeat Count'} {...formItemLayout}>
                <div><Select value={this.state.repeatCount}
                             style={{ width: 120, marginLeft: 10, marginRight: 10 }}
                             onChange={this.handleCountChange}>
                  <Select.Option value={-1}>No End</Select.Option>
                  <Select.Option value={1}>1</Select.Option>
                  <Select.Option value={2}>2</Select.Option>
                  <Select.Option value={3}>3</Select.Option>
                  <Select.Option value={4}>4</Select.Option>
                  <Select.Option value={5}>5</Select.Option>
                  <Select.Option value={6}>6</Select.Option>
                  <Select.Option value={7}>7</Select.Option>
                  <Select.Option value={8}>8</Select.Option>
                  <Select.Option value={9}>9</Select.Option>
                  <Select.Option value={10}>10</Select.Option>
                </Select> {this.state.repeatCount > -1 && 'Time'}{this.state.repeatCount > 1 && 's'}
                </div>
              </Form.Item>}
              {repeat && DateInput.call(this, {
                field: 'startDate',
                name: 'Start Date',
              })}
              {repeat && !noEnd && DateInput.call(this, {
                field: 'endDate',
                name: 'End Date',
              })}
              {repeat &&
              <Form.Item label={'No End'} {...formItemLayout}>
                <Switch checked={this.state.noEnd} onChange={this.handleNoEndChange}/>
              </Form.Item>}

              <Form.Item {...buttonItemLayout}>
                <Button type="primary">Submit</Button>
              </Form.Item>
            </Form>
          </div>
          <Footer/>
        </AppWrapper>
      </LocaleProvider>
    );
  }


};
