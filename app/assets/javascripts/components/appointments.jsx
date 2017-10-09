class Appointments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appointments: this.props.appointments,
      name: 'Team standup meeting',
      time: '25 January 2016 9am'
    }
  }

  handleUserInput (obj) {
    this.setState(obj);
  }

  handleFormSubmit (e) {
    const appointment = {name: this.state.name, time: this.state.time};
    $.post('/appointments',
            {appointment: appointment})
          .done((data) => {
            this.addNewAppointment(data);
          });
  }

  addNewAppointment (appointment) {
    const appointments = React.addons.update(this.state.appointments, { $push: [appointment]});
    this.setState({
      appointments: appointments.sort(function(a,b){
        return new Date(a.time) - new Date(b.time);
      })
    });
  }

  render () {
    return (
      <div>
        <AppointmentForm name={this.state.name}
          time={this.state.time}
          onUserInput={(obj) => this.handleUserInput(obj)}
          onFormSubmit={() => this.handleFormSubmit()} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}
