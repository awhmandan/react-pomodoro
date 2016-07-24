import React, {Component} from 'react';

class Timer extends Component {
	render() {
		return(
			<div>
				<h1>{this.props.format(this.props.time)}</h1>
			</div>
		);
	}
}

export default Timer;