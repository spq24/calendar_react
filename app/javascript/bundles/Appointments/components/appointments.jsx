import React from 'react';
import AppointmentForm from './AppointmentForm';
import { AppointmentsList } from './AppointmentsList';
import update from 'immutability-helper';
import PropTypes from 'prop-types';

export default class Appointments extends React.Component {
  static propTypes = {
    appointments: PropTypes.array.isRequired
  }

  constructor(props, railsContext) {
    super(props)

    this.state = {
      appointments: this.props.appointments
    }
  }

  static defaultProps = {
    appointments: []
  }

  componentDidMount () {
    if(this.props.match) {
        $.ajax({
            type: "GET",
            url: '/appointments',
            dataType: "JSON"
        }).done((data) => {
            this.setState({appointments: data});
        })
    }
  }

  addNewAppointment = (appointment) => {
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
        <AppointmentForm handleNewAppointment={this.addNewAppointment}/>
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}
