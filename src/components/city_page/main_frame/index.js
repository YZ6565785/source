// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../weather_button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Weatherbutton from '../weather_button';

import Headerbuttons from '../header_buttons';

import Addcity from '../add_city'

export default class Mainframe extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		//initial empty city array
		this.state = {
			cname: "london",
			city : []		
		};			
		this.handleChange = this.handleChange.bind(this);		
	}
		
	//handle city change 
	handleChange = e => {
		 //Prevent referesh the whole page
		e.preventDefault();
		this.setState({
			cname: e.target.city.value
		});	
		this.handleAddCity();		
	} 
	
	//handle adding city 
	handleAddCity = () => {
		this.setState({
			city: this.state.city.concat([{ cname: this.state.cname }])
		});
	};
	
	//method for reset the city_page, remove all city apart from the current located city
	handleClear = () => {
		this.setState({
			city: []
		});
	}
	
	componentDidMount (){
		this.fetchWeatherData ();		
	}


	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {		
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/weather?q=london&APPID=09bd58ab01a13c8705892ed88691ee30"
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed' + err); }
		})	
	}
	
	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.tem} ${style.filled}` : style.temperature;	
		// display all weather data
		
		var london_weather = (			
					
				<div class = {style.london}>
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
		);

		
		return ( 
			<div class ={ style.container } >								
				<div class = {style.theader}>
					<button class = {style.return} onclick = {this.props.back}>			
					</button>
					<form class = {style.formm} onsubmit = {this.handleChange}>	
						<input class = {style.input} name = "city" type = "text" placeholder= "             Add city" />			
						<button class = {style.add}></button>				
					</form>
				</div>			
				{london_weather}				
				{this.state.city.map((cit, idx) => (<Addcity wname={this.state.name} onChange={this.changeName} onClick={this.handle}  wname = {cit.cname}/>))}
				<div class ={style.butcond}>
					<button class = {style.but} type = "button" onclick={this.handleClear} >clear</button>	
				</div>			
			</div>
			
		);
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
			ctime: time,
			error: ""
		}); 
		setInterval(() => {
			this.setState({
				ctime: new Date(Date.now()).toLocaleTimeString()
				
			});
		} , 1000);
 
	}

}
