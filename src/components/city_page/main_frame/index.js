// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
//import style_iphone from '../weather_button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
//import Weatherbutton from '../weather_button';

//import Headerbuttons from '../header_buttons';
import Addcity from 'components/city_page/add_city';

export default class Mainframe extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props); 
		//initial empty city array
		this.state = {
			cname: "loading_default",
			city : [{cname: this.props.locate}]		
		};			
		this.handleChange = this.handleChange.bind(this);	
		
		// initialize two states that are used for checking contains
		this.setState({
			city_default: "London",
			city_geo: [],
			maximum: 1
		})
	}
	componentDidMount =() =>{
		
		this.checkCity();
		
	}
	//handle city change 
	handleChange = e => {
		console.log(this.state.maximum);
		e.preventDefault();
		if (e.target.city.value ==""){
			alert("Are you looking for a city out of the earth?");
			 //Prevent referesh the whole page
		
			
		}
		else if (this.state.maximum >=6){
			alert("The developer only allows you add maximum five cities.");
		}
		else{
			this.setState({
				cname: e.target.city.value.charAt(0).toUpperCase() + e.target.city.value.substring(1)
			});	
			this.checkCity();
		}
		
			
	} 
	handleFocus = function(event) {
		event.target.select();
		this.setState({ cname: "" });
		//event.target.value ="";
	}
	checkCity= () =>{
		$.ajax({
			url: "assets/localapi/city.list.json",
			dataType: "json",
			success : this.getData_city,
			error : function(req, err){ 
				console.log('city not found ' + err); 
			}
		});
	}
	
	// fetch city information through a json file
	// update the geographical location and the city
	getData_city = (parse_json) =>{
		// set not found as default
		var result = false;
		//check if contains
		var city_list = this.state.city;
		console.log(city_list);
		for (var i =0; i<parse_json.length;i++){
			if (parse_json[i]["name"] == this.state.cname ){
				if (city_list.includes(this.state.cname)){
					break;
				}
				var geo = [ parse_json[i]["coord"]["lon"], parse_json[i]["coord"]["lat"] ];
				this.setState({city_geo: geo});
				//console.log('city_geo: ' + this.state.city_geo);
				this.setState({
					maximum: this.state.maximum+1
				});	
				console.log(this.state.maximum);
				result = true;
				break;
			}
		}
		// if the city is found call the api to fetch weather
		if(result){
			this.handleAddCity();
		}
		else if (this.state.cname =="loading_default" ){
			console.log("loading completed");
		}
		else{
			alert("Cannot find this city: "+ this.state.cname);
		}
		//this.setState({cname: this.state.locate});
		return result;
	}
	
	
	//handle adding city 
	handleAddCity = () => {
		var arr = this.state.city&&this.state.city.map((obj,index)=>{
			return obj.cname;
		});
		if(arr.includes(this.state.cname)){
			alert("city already exists");
		}
		else{
			this.setState({
				city: this.state.city.concat([{ cname: this.state.cname, lon: this.state.city_geo[0], lat: this.state.city_geo[1] }])
			});
		}
		
	};
	
	//method for reset the city_page, remove all city apart from the current located city
	handleClear = () => {
		this.setState({
			city: [{cname: this.state.city_default}],
			maximum: 1
		});
	}
	
	componentDidMount (){
		this.fetchWeatherData ();		
	}


	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {		
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/weather?q="+this.props.locate+"&APPID=daa96efd2e3be69169ef76bff0b6faf2";

		
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
		//call the props fucntion
		const {onClick} = this.props;
		

		
		return ( 
			<div class ={ style.container } >								
				<div class = {style.theader}>
					<button class = {style.return} onclick = {this.props.back}>			
					</button>
					<form class = {style.formm} onsubmit = {this.handleChange}>	
						<input class = {style.input}onFocus={this.handleFocus.bind(this)} value ={this.state.cname} name = "city" type = "text" placeholder= "             Add city" />			
						<button class = {style.add}></button>				
					</form>
				</div>		
				<div class ={style.cityContainer}>
					{this.state.city.map((cit, idx) => (<Addcity  class = {style.eachCity} wname={this.state.name} onChange={this.changeName} click_go={()=>onClick(cit.cname)}  wname = {cit.cname}/>))}
					<div class ={style.butcond}>
					<button class = {style.but} type = "button" onclick={this.handleClear} >clear</button>	
				</div>
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
		
 
	}
	

}
