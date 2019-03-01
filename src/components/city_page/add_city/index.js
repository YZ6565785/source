// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
//import style_iphone from '../weather_button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component



export default class Addcity extends Component {
//var Iphone = React.createClass({
	
	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		
		this.state.temp = "";
		// button display state
		this.handleChange = this.handleChange.bind(this);

	}
	
	handleChange(e) {
		const cname = e.target.value;
		this.props.onChange(cname);
	}


	// a call to fetch weather data via wunderground
	fetchWeatherData1 = () => {

		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/weather?q="+this.props.wname+"&APPID=daa96efd2e3be69169ef76bff0b6faf2";
		//https://api.openweathermap.org/data/2.5/weather?q=london&APPID=daa96efd2e3be69169ef76bff0b6faf2
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed for the city' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}
	
	componentDidMount (){
		this.fetchWeatherData1();
	}
	
	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		var b = 1;
		const tempStyles = this.state.temp ? `${style.tem} ${style.filled}` : style.temperature;

		// display all weather data
		var city_weather =  (
				<div onclick = {this.props.click_go}>
					<div class = {style.cont}>
						<div class = {style.left}>
							<div class={ style.city }>
								<div class={ style.city }>
									{ this.state.locate }
								</div>
								<div class={ style.time }>
									{this.state.cond}
								</div>
											
							</div>						
						</div>
						<div class = {style.right}>
							<div class = {tempStyles}>
								{ this.state.temp }
							</div>
						</div>
					</div>					
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
