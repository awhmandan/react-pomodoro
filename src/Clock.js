import React, {Component} from 'react';
import Options from './Options.js';
import Timer from './Timer.js';

class Clock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: 0,
			started: false
		};
		this.tick = this.tick.bind(this);
		this.handleSession = this.handleSession.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.addMinute = this.addMinute.bind(this);
		this.minusMinute = this.minusMinute.bind(this);
		this.setMainTimer = this.setTime.bind(this, 1500000);
		this.setRestTimer = this.setTime.bind(this, 300000);
		this.notificationSettings = this.notificationSettings.bind(this);
	}

	notificationSettings() {
	  if (!("Notification" in window)) {
	    this.setState({notifications: false});
	  }	else if (Notification.permission === "granted") {
	  	this.setState({notifications: true});
	  } else if (Notification.permission !== 'denied') {
	    Notification.requestPermission().then(function(result) {
	      this.setState({notifications: result});
	  	});
		}
	}

	componentDidMount() {
		this.setDefaultTime();
		this.notificationSettings();
	}

	format(ms) {
		let seconds = parseInt((ms/1000) % 60),
				minutes = parseInt((ms/(1000*60)) % 60);

		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return minutes + ":" + seconds;
	}

	tick() {
		if(this.state.time === 0) {
			/*
			TODO
			Add alert sound
			Correct notification behaviour

			******
			******
			******

			if(this.state.notifications === true) {
				return new Notification("Time's up!");
			} else {
				alert("Time's up!");
			}
			*/
			clearInterval(this.interval);
		} else {
			this.setState({
				time: this.state.time - 1000
			});
		}
	}

	handleSession() {
		this.setState({
			started: !this.state.started
		});
		
		if(this.state.started === true) {
			this.interval = setInterval(this.tick, 1000);
		} else {
			clearInterval(this.interval);
		}
	}

	handleReset() {
		clearInterval(this.interval);
		this.setState({
			started: !this.state.started,
			time: 0
		});
	}

	setTime(newTime) {
		this.setState({
			time: newTime,
			started: true
		});
	}

	setDefaultTime() {
		this.setState({
			time: 1500000
		});
	}

	addMinute() {
		this.setState({time: this.state.time + 60000})
	}

	minusMinute() {
		if(this.state.time > 1) {
			this.setState({time: this.state.time - 60000})
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return(
			<div className="container">
				<div className="row">
					<div className="col-md-3"></div>
						<div className="col-md-6">
							<Timer format={this.format} time={this.state.time} />
						</div>
					<div className="col-md-3"></div>
				</div>
				<Options format={this.format} time={this.state.time} handleSession={this.handleSession} handleReset={this.handleReset} addMinute={this.addMinute} minusMinute={this.minusMinute} setMainTimer={this.setMainTimer} setRestTimer={this.setRestTimer} />
			</div>
		);
	}
}

export default Clock;