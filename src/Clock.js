//Majority of project code & all state here

import React, {Component} from 'react';
import Options from './Options.js';
import Timer from './Timer.js';

class Clock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: 0,
			started: true,
			notifications: true
		};

		//binding all methods to correct context
		this.tick = this.tick.bind(this);
		this.handleSession = this.handleSession.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.addMinute = this.addMinute.bind(this);
		this.minusMinute = this.minusMinute.bind(this);
		this.setMainTimer = this.setTime.bind(this, 1500000);
		this.setRestTimer = this.setTime.bind(this, 300000);
		this.notificationSettings = this.notificationSettings.bind(this);
		this.askPermission = this.askPermission.bind(this);
		this.createNotification = this.createNotification.bind(this);
		this.alert = this.alert.bind(this);
	}

	componentDidMount() {
		this.setDefaultTime();
		this.notificationSettings();
	}

	//check user notification settings
	notificationSettings() {
	  if (!("Notification" in window)) {
	    this.setState({notifications: false});
	  }	else if (Notification.permission === "granted") {
	  	this.setState({notifications: true});
	  } else if (Notification.permission !== 'denied') {
	  	this.askPermission();
		}
	}

	//called in notificationSettings method if user permission not set as granted and not denied
	askPermission() {
		Notification.requestPermission((permission) => {
			if (permission === "granted") {
			  this.setState({notifications: true});
			} else {
				this.setState({notifications: false});
			}
		});
	}

	//creates HTML5 notification for use in tick method
	createNotification() {
		var notification = new Notification("Time's up!", {
			body: "Pomodoro update - time's up on your current counter!",
		});
		setTimeout(notification.close.bind(notification), 5000);
	}

	//method to format ms to minutes and seconds for display purposes
	format(ms) {
		let seconds = parseInt((ms/1000) % 60),
				minutes = parseInt((ms/(1000*60)) % 60);

		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return minutes + ":" + seconds;
	}

	//called handleSession, checks if timer above 0 - if yes, reduces timer by 1 second
	//if no, calls notification/alert based on user settings to confirm current timer finished
	tick() {
		if(this.state.time === 0) {
			this.alert();			
		} else {
			this.setState({
				time: this.state.time - 1000
			});
		}
	}

	alert() {
		if(this.state.notifications === true) {
			this.createNotification();
			clearInterval(this.interval);
		} else {
			alert("Time's up!");
			clearInterval(this.interval);
		}
	}

	//toggles if current timer is counting down
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

	//stops current countdown, resets timer amount
	handleReset() {
		clearInterval(this.interval);
		this.setState({
			started: !this.state.started,
			time: 1500000
		});
	}

	//sets timer depending on user selection - times defined in bind calls at start of class
	setTime(newTime) {
		this.setState({
			time: newTime,
			started: true
		});
	}

	//called on componentDidMount
	setDefaultTime() {
		this.setState({
			time: 1500000
		});
	}

	//adds 1 minute to timer
	addMinute() {
		this.setState({time: this.state.time + 60000})
	}

	//subtracts 1 minute from timer
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
				<Timer format={this.format} time={this.state.time} />
				<Options format={this.format} time={this.state.time} handleSession={this.handleSession} handleReset={this.handleReset} addMinute={this.addMinute} minusMinute={this.minusMinute} setMainTimer={this.setMainTimer} setRestTimer={this.setRestTimer} />
			</div>
			</div>
		);
	}
}

export default Clock;