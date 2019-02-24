import {h, render, Component} from 'preact';
import Iphone from './index.js';
export default class Message extends Component{
	constructor(props){
		super(props);
		var obj = new Iphone();
		
		this.setState({ 
			message: obj.state.city
		});
		
		
	}
	render(){
		return ;
	}
	
}

module.exports.sayHelloInSpanish = function() {
	var msg = require("./Message");
	return "sfas";
};
