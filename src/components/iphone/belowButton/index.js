//import preact
import {h, render, Component} from 'preact';

// import stylesheets for iphone & button
import style from './style';

export default class BelowButton extends Component{
	render (){
		return (
			<button id ={this.props.id} class = {style.button_below} onclick ={this.props.musicRecommendation}><p id ={this.props.content_id}>Music Recommendation</p></button>
		);
	}
}