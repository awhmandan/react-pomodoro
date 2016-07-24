import React, {Component} from 'react';

class Header extends Component {
	render() {
		return(
			<div className="jumbotron">
				<div className="container">
					<div className="row">
						<h1>Pomodoro <small>Be your most productive self</small></h1>
						<br></br>
						<hr></hr>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;