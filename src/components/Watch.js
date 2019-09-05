import React from 'react';

export default class Watch extends React.Component {
  state = {
    hoursText: null,
    minutesText: null,
    interval: null,
  };

  componentDidMount() {
    const self = this;

    function setDate() {
      let now = new Date();

      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours =
        now.getHours() - self.props.moscowOffset + self.props.offset;

      const hoursText = '' + (hours % 24 < 10 ? '0' : ' ') + (hours % 24);
      const minutesText = '' + (minutes < 10 ? '0' : '') + minutes;
      const secondsText = '' + (seconds < 10 ? '0' : '') + seconds;

      self.setState({
        hoursText,
        minutesText,
        secondsText,
      });
    }

    this.interval = setInterval(setDate, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="clock-container">
        <div className="city-and-cross">
          <span className="city">{this.props.city}</span>
          <span
            className="cross"
            onClick={() => this.props.handleDelete(this.props.id)}
          >
            ✕
          </span>
        </div>
        <div className="digital">
          <h1>
            <span id="hours">{this.state.hoursText}:</span>
            <span id="minutes">{this.state.minutesText}:</span>
            <span id="seconds">{this.state.secondsText}</span>
          </h1>
        </div>
      </div>
    );
  }
}
