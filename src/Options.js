import React, {Component} from 'react';

class Options extends Component {
	render() {
		return(
			<div>
				<div className="row">
					<div className="col-md-3"></div>
					<div className="col-md-6">
						<button onClick={this.props.handleSession}>Start | Pause</button>
						<button onClick={this.props.handleReset}>Reset</button>
						<br></br>
					</div>
					<div className="col-md-3"></div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<h4>Session length</h4>
						<button onClick={this.props.minusMinute}>-</button>
						<h3>{this.props.format(this.props.time)}</h3>
						<button onClick={this.props.addMinute}>+</button>
					</div>
					<div className="col-md-6">
						<button onClick={this.props.setMainTimer}>Work</button>
						<button onClick={this.props.setRestTimer}>Rest</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Options;