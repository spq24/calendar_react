var AppointmentForm = React.createClass({
  handleChange: function(e) {
    var name = e.target.name;
    obj = {};
    obj[name] = e.target.value;
    this.props.onUserInput(obj);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onFormSubmit();
  },

  setApptTime: function(e) {
    var time = 'time';
    var obj = {};
    if(obj[time] = e.toDate()) {
        this.props.onUserInput(obj);
    }
  },

  render: function() {
    var inputProps = {
        time: 'time'
    };

    return (
      <div>
        <h2>Make a new appointment</h2>
        <form onSubmit={this.handleSubmit} >
          <input name='name' placeholder='Appointment Title'
            value={this.props.name}
            onChange={this.handleChange} />
          <Datetime input={false} open={true} inputProps={inputProps} value={this.props.time} onChange={this.setApptTime}/>
          <input type='submit' value='Make Appointment' className="submit-button" />
        </form>
      </div>
    )
  }
});
