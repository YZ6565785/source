// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../weather_button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Weatherbutton from '../weather_button';



export default class Addcity extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}
	
	componentDidMount(){
		this.fetchWeatherData1();
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData1 = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/weather?q=Paris&APPID=09bd58ab01a13c8705892ed88691ee30"
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed for the city' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}
	
	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		var b = 1;
		const tempStyles = this.state.temp ? `${style.tem} ${style.filled}` : style.temperature;

		// display all weather data
		var city_weather =  (
				<div>
					<div class = {style.paris}>
						<div class = {style.left}>
							<div class={ style.city }>
								<div class={ style.city }>
									{ this.state.locate }
								</div>
								<div class={ style.time }>
									{this.state.ctime}
								</div>
											
							</div>						
						</div>
						<div class = {style.right}>
							<div class = {tempStyles}>
								{ this.state.temp }
							</div>
						</div>
					</div>
					
					
					<div class= { style_iphone.container }> 
						{ this.state.display ? <Weatherbutton class={ style_iphone.button } clickFunction={ this.fetchWeatherData1 }/ > : null }
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
		setInterval(() => {
			this.setState({
				ctime: new Date(Date.now()+3600000).toLocaleTimeString()
				
			});
		} , 1000);
 
	}
	
	parseResponsep = (parsed_json) => {
		var locationp = parsed_json['name'];		
		
			

		
		var temp_cp = Math.round(parsed_json['main']['temp']-273.15);
		var max_temp_cp = Math.round(parsed_json['main']['temp_max']-273.15);
		var min_temp_cp = Math.round(parsed_json['main']['temp_min']-273.15);
		var conditionsp = parsed_json['weather']['0']['description'];

		// set states for fields so they could be rendered later on
		this.setState({
			locatep: locationp,
			tempp: temp_cp,
			max_tempp: max_temp_cp,
			min_tempp: min_temp_cp,
			condp : conditionsp,
			
		}); 
	}
}
