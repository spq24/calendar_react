var Appointment = React.createClass({
  render: function() {
    return (
      <div className="appointment">
        <h3>{this.props.appointment.name}</h3>
        <p>{formatDate(this.props.appointment.time)}</p>
      </div>
    )
  }
});
