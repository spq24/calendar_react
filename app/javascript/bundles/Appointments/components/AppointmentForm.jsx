import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import { validations } from '../utils/validations';
import PropTypes from 'prop-types'

export default class AppointmentForm extends React.Component {
  static PropTypes = {
    name: PropTypes.shape({
      value: PropTypes.string.isRequired,
      valid: PropTypes.bool.isRequired
    }).isRequired,
    time: PropTypes.shape({
      value: PropTypes.instanceOf(Date).isRequired,
      valid: PropTypes.bool.isRequired
    }).isRequired,
    formValid: PropTypes.bool.isRequired,
    onUserInput: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired
  }

  static formValidations = {
    name: [
      (s) => { return(validations.checkMinLength(s, 3)) }
    ],
    time: [
      (t) => { return(validations.timeShouldBeInTheFuture(t))}
    ]
  }

  handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.props.onUserInput(fieldName, fieldValue,
                              AppointmentForm.formValidations[fieldName]);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onFormSubmit();
  }

  setApptTime = (e) => {
    const fieldName = 'time';
    const fieldValue =  e.toDate();
    this.props.onUserInput(fieldName, fieldValue,
                              AppointmentForm.formValidations[fieldName]);
  }

  render () {
    const inputProps = {
        time: 'time'
    };

    return (
      <div>
        <h2>Make a new appointment</h2>
        <form onSubmit={this.handleSubmit} >
          <input name='name' placeholder='Appointment Title'
            value={this.props.name.value}
            onChange={this.handleChange} />
          <Datetime input={false} open={true} inputProps={inputProps} value={moment(this.props.time.value)} onChange={this.setApptTime}/>
          <input type='submit' value='Make Appointment' className="submit-button" disabled={!this.props.formValid} />
        </form>
      </div>
    )
  }
}
