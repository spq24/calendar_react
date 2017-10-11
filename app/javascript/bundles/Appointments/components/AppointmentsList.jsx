import React from 'react';
import { Appointment } from './appointment';
import PropTypes from 'prop-types'

export const AppointmentsList = ({appointments}) =>
    <div>
        {appointments.map(function(appointment) {
            return (
                <Appointment appointment={appointment} key={appointment.id} />
            )
        })}
    </div>

AppointmentsList.propTypes = {
  appointments: PropTypes.array.isRequired
}
