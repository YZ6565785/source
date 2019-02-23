// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style_2 from './style_2';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';





export default class CityIndex2 extends Component {
	
	// a constructor with initial set states
		constructor(props){
			super(props);
			// temperature state
			this.state.temp = "";
			// button display state
			this.setState({ display: true });
		}

		// a call to fetch weather data via wunderground
		fetchWeatherData = () => {
			
			// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
			var urll = "https://api.openweathermap.org/data/2.5/weather?q=London&APPID=09bd58ab01a13c8705892ed88691ee30"
			$.ajax({
				url: urll,
				dataType: "jsonp",
				success : this.parseResponse,
				error : function(req, err){ console.log('API call failed for london' + err); }
			})

			// once the data grabbed, hide the button
			this.setState({ display: false });
		}
	
	
		
		// the main render method for the iphone component
		render() {
			// check if temperature data is fetched, if so add the sign styling to the page
			var b = 1;
			const tempStyles = this.state.temp ? `${style.tem} ${style.filled}` : style.temperature;
			
			return ( 
				<div class={ style.container } >
					<Header />
					{london_weather}
					{london_weather1}
					
					<City />
					
					<div class= { style_iphone.container }> 
						{ this.fetchWeatherData }				
					</div>

				</div>
			);
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