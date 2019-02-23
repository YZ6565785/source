// import preact
import { h, render, Component } from 'preact';
	
export default class Weatherbutton extends Component {

	// rendering a function when the button is clicked
	render() {
		return (
			<div>
				<button onClick={this.props.clickFunction}>
					test page
				</button>
			</div>

		);
	}
}


