// import preact
import { h, render, Component } from 'preact';
// import stylesheets for the city display
import style from './style';
// import jquery for API calls
import $ from 'jquery';
// import clock for the city
import Clock from 'components/iphone/clock';


export default class Addcity extends Component {
//var Iphone = React.createClass({
	
	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		
		this.state.temp = "";
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData1 = () => {

		// API URL for the weather information
		var url = "https://api.openweathermap.org/data/2.5/weather?q="+this.props.wname+"&APPID=09bd58ab01a13c8705892ed88691ee30";
		//https://api.openweathermap.org/data/2.5/weather?q=london&APPID=daa96efd2e3be69169ef76bff0b6faf2
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('add city API call failed for the city' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}
	
	//immediately invoked after the component is mounted
	componentDidMount (){
		this.fetchWeatherData1();
	}
	
	// the main render method for the city component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		
		let delete_button = null;
		if(this.props.delete_value != this.props.home_city){
			delete_button = <button 
				id = "city_check"
				class ={this.props.delete_class} 
				name = "city" 
				onclick={this.props.delete_onChange} 
				value ={this.props.delete_value}
				>
				Delete
			</button>
		}
		// display all weather data
		var city_weather =  (
					<div class = {style.cont} >
						<div class = {style.left} onclick = {this.props.click_go}>
							<div class={ style.city }>
								
								<div class={ style.city }>
									{ this.state.locate }
								</div>
								<div class={ style.time }><Clock locate ={this.state.locate} /></div>
								<div class={ style.time }>
									{this.state.cond}
								</div>
											
							</div>						
						</div>
						<div class = {style.right}>
							<div class = {`${this.props.each_city_temp_class} ${style.tem} ${style.filled}`} onclick = {this.props.click_go}>
							
							
							{ this.state.temp }
							
							</div>
						</div>
						
						{delete_button}
					</div>					
			
		);
		return city_weather;
	}
	
	
	



	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];		
		
		var time = new Date(Date.now()).toLocaleTimeString();		

		
		var temp_c = Math.round(parsed_json['main']['temp']-273.15);
		var max_temp_c = Math.round(parsed_json['main']['temp_max']-273.15);
		var min_temp_c = Math.round(parsed_json['main']['temp_min']-273.15);
		var conditions = parsed_json['weather']['0']['description'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			max_temp: max_temp_c,
			min_temp: min_temp_c,
			cond : conditions,
			ctime: time
		}); 
 
	}
	
	

}
