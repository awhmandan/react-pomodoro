//stateless component to display timer and updates

import React, {Component} from 'react';

class Timer extends Component {
	render() {
		return(
				<div className="col-md-6">
					<br />
					<br />
					<h1 className="time-display">{this.props.format(this.props.time)}</h1>
				</div>
		);
	}
}

export default Timer;