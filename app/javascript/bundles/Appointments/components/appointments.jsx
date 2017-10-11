import React from 'react';
import AppointmentForm from './AppointmentForm';
import { AppointmentsList } from './AppointmentsList';
import update from 'immutability-helper';
import { FormErrors } from './FormErrors';
import moment from 'moment';
import PropTypes from 'prop-types'

export default class Appointments extends React.Component {
  static propTypes = {
    appointments: PropTypes.array.isRequired
  }

  constructor(props, railsContext) {
    super(props)

    this.state = {
      appointments: this.props.appointments,
      name: {value: '', valid: false},
      time: {value: new Date(), valid: false},
      formErrors: {},
      formValid: false
    }
  }

  handleUserInput = (fieldName, fieldValue, validations) => {
    const newFieldState = update(this.state[fieldName],
                                  {value: {$set: fieldValue}});
    this.setState({[fieldName]: newFieldState},
                  () => { this.validateField(fieldName, fieldValue, validations) });
  }

  validateField (fieldName, fieldValue, validations) {
    let fieldValid;

    let fieldErrors = validations.reduce((errors, v) => {
      let e = v(fieldValue);
      if(e !== '') {
        errors.push(e);
      }
      return(errors);
    }, []);

    fieldValid = fieldErrors.length === 0;

    const newFieldState = update(this.state[fieldName],
                                  {valid: {$set: fieldValid}});

    const newFormErrors = update(this.state.formErrors,
                                  {$merge: {[fieldName]: fieldErrors}});

    this.setState({[fieldName]: newFieldState,
                    formErrors: newFormErrors}, this.validateForm);
  }

  validateForm () {
    this.setState({formValid: this.state.name.valid &&
                              this.state.time.valid
                  });
  }

  handleFormSubmit = () => {
    const appointment = {name: this.state.name.value, time: this.state.time.value};
    $.post('/appointments',
            {appointment: appointment})
          .done((data) => {
            this.addNewAppointment(data);
            this.resetFormErrors();
            this.resetForm();
          })
          .fail((response) => {
            this.setState({formErrors: response.responseJSON})
          });
  }

  resetFormErrors () {
    this.setState({formErrors: {}})
  }

  resetForm () {
    this.setState({
      appointments: this.props.appointments,
      name: {value: '', valid: false},
      time: {value: '', valid: false},
      formErrors: {},
      formValid: false
    })
  }

  addNewAppointment (appointment) {
    const appointments = update(this.state.appointments, { $push: [appointment]});

    this.setState({
      appointments: appointments.sort(function(a,b){
        return new Date(a.time) - new Date(b.time);
      })
    });
  }

  render () {
    return (
      <div>
        <FormErrors formErrors = { this.state.formErrors} />
        <AppointmentForm name={this.state.name}
          time={this.state.time}
          formValid={this.state.formValid}
          onUserInput={this.handleUserInput}
          onFormSubmit={this.handleFormSubmit} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}
