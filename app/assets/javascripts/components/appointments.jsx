var Appointments = React.createClass({
  getInitialState: function() {
    return {
      appointments: this.props.appointments,
      name: 'Team standup meeting',
      time: '25 January 2016 9am'
    }
  },

  handleUserInput: function(obj) {
    this.setState(obj);
  },

  handleFormSubmit: function(e) {
    var appointment = {name: this.state.name, time: this.state.time};
    $.post('/appointments',
            {appointment: appointment})
          .done(function(data) {
            this.addNewAppointment(data);
          }.bind(this));
  },

  addNewAppointment: function(appointment) {
    var appointments = React.addons.update(this.state.appointments, { $push: [appointment]});
    this.setState({
      appointments: appointments.sort(function(a,b){
        return new Date(a.time) - new Date(b.time);
      })
    });
  },

  render: function() {
    return (
      <div>
        <AppointmentForm name={this.state.name}
          time={this.state.time}
          onUserInput={this.handleUserInput}
          onFormSubmit={this.handleFormSubmit} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
});
