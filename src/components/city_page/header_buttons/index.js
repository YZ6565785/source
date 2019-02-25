// import preact
import { h, render, Component } from 'preact';
import style from './style.less';
	
export default class Headerbuttons extends Component {

	// rendering a function when the button is clicked
	render() {
		return (
			<div class = {style.container}>
				<button class = {style.return} onclick = {this.props.back1}>			
				</button>
				
				<div class = {style.pm_container}>				
					<button class = {style.minus}>			
					</button>
					
					<button class = {style.add}>			
					</button>
				</div>
			</div>

		);
	}
}


