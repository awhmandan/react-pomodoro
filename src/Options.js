//stateless component collecting options available to user to interact with timer

import React, {Component} from 'react';

class Options extends Component {
	render() {
		return(
			<div>
				<div className="options col-md-6">
					<h4>Timer options</h4>
					<hr />
					<button type="button" className="btn btn-info" onClick={this.props.setMainTimer}>Work</button>
					<button type="button" className="btn btn-info" onClick={this.props.setRestTimer}>Rest</button>
					<br />
					<br />
						<button type="button" className="btn btn-secondary" onClick={this.props.addMinute}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
						<button type="button" className="btn btn-secondary" onClick={this.props.minusMinute}><span className="glyphicon glyphicon-minus" aria-hidden="true"></span></button>
					<br />
					<br />
					<button type="button" className="btn btn-success" onClick={this.props.handleSession}><span className="glyphicon glyphicon-play" aria-hidden="true"></span>
						<span className="glyphicon glyphicon-pause" aria-hidden="true"></span>
					</button>
					<button type="button" className="btn btn-danger" onClick={this.props.handleReset}>
						<span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
					</button>
				</div>
			</div>
		);
	}
}

export default Options;