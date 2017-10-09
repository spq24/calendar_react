const Appointment = ({appointment}) =>
    <div className="appointment">
        <h3>{appointment.name}</h3>
        <p>{formatDate(appointment.time)}</p>
    </div>
