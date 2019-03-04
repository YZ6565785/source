// import preact
import { h, render, Component } from 'preact';
import {Progress} from 'preact-progress';
// import stylesheets for ipad & button
import style from './style';
//import style_iphone from '../weather_button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
//import Weatherbutton from '../weather_button';

//import Headerbuttons from '../header_buttons';
import Addcity from 'components/city_page/add_city';
import Clock from 'components/iphone/clock';
export default class Mainframe extends Component {
	// a constructor with initial set states
	constructor(props){
		super(props); 
		console.log("constructor");
		
		var current_city = this.props.locate;
		this.set_city();
		this.setState({
			editing: false,
			loading: true,
			processing: 0,
			cname: "search city here",
			searching: "search city here",
			city_default: this.props.locate,
			city_geo: []
		});

		//this.setDefault_localCityList();
		console.log("now: "+ this.state.city);
		this.handleChange = this.handleChange.bind(this);	
		


		
	}
	setDefault_localCityList=()=>{
		if(localStorage.getItem("city_saved") !=null){
			var localCityList = localStorage.getItem("city_saved").split("/");
			for (var i =0; i< localCityList.length; i++){
				var fields = localCityList[i].split(",");
				var prev_city_list = this.state.default_localCityList+"/";
				this.state = {
					city: this.state.city.concat([{ cname: fields[0], lon: fields[1], lat: fields[2]}]),
					
				};
			}
			
		}
			
		
	}
	componentDidMount =() =>{
		//set defaul city if the user is new
		this.notEditing();
		console.log(this.state.city);
		this.setState({editing: false});
		this.fetchWeatherData ();

		if(localStorage.getItem("city_saved") !=null){
			this.state = {
				city: []
			};
			console.log("set default");
			var localCityList = localStorage.getItem("city_saved").split("/");
			for (var i =0; i< localCityList.length; i++){
				var fields = localCityList[i].split(",");
				var prev_city_list = this.state.default_localCityList+"/";
				this.state = {
					city: this.state.city.concat([{ cname: fields[0], lon: fields[1], lat: fields[2]}]),
					default_localCityList: localStorage.getItem("city_saved")
				};	
				console.log("adding city: "+ fields);
			}
			
		}
	}

	componentDidUpdate=(nextProps, nextState)=>{
		if(nextState.city != undefined){
			if (this.state.city.length > nextState.city.length){
				this.notEditing();
				this.isTyping();
				this.setState({editing: false});
			}
			else{
				if (this.state.editing){
					this.isEditing();
				}
				else{
					this.notEditing();
				}
			}
		}
		
	}
	notEditing=()=>{

		$("#edit").css("color", "white");
		$("#save").hide();
		$(".select").hide();
		this.notTyping();
		//this.setState({editing: false});
	}
	isEditing=()=>{
		$("#save").css("color", "green");
		$("#edit").text("Delete all");
		$("#edit").css("color", "red");
		$("#save").show();
		$(".select").show();
		this.isTyping();
	}
	isTyping =()=>{
		$("#search").show();
		$("#pointer").hide();

	}
	notTyping =()=>{
		$("#search").hide();
		$("#pointer").show();
	}
	//handle city change 
	handleChange = e => {
		e.preventDefault();
		// set the saved cities in an arry
		var arr = this.state.city&&this.state.city.map((obj,index)=>{
			return obj.cname;
		});
		
		// format the user input, remove the end space and make the first character of a word upper case
		var city_searching = e.target.city.value;
			var fields = e.target.city.value.split(" ");
			if (fields.length >1){
				city_searching ="";
				for (var i = 0; i<fields.length; i++){
					city_searching =city_searching + fields[i].charAt(0).toUpperCase()+fields[i].substring(1).toLowerCase()+" ";
				}
			}
			else{
				city_searching = e.target.city.value.charAt(0).toUpperCase() + e.target.city.value.substring(1);
			}
			while(city_searching[city_searching.length-1] == " "){
				city_searching = city_searching.substring(0,city_searching.length-1);
			}
		
		// end of formatting

		if(arr.includes(city_searching)){
			alert("city already exists");
			return;
		}
		//console.log("found locally: "+city_searching+"###############=>"+ city_list.includes(e.target.city.value));
		if (e.target.city.value =="" || e.target.city.value ==" " ){
			alert("Are you looking for a city out of the earth?");
			 //Prevent referesh the whole page
		}
		else{
			this.setState({
				searching: city_searching,
				cname: city_searching
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
			url: "https://raw.githubusercontent.com/YZ6565785/world_city_list/master/city.list.json",
			dataType: "json",
			success : this.getData_city,
			error : function(req, err){ 
				console.log('city not found ' + err); 
			}
		});
	}
	// fetch city information through from local json
	// update the geographical location and the city
	getData_city = (parse_json) =>{
		this.setState({loading: true});
		// set not found as default
		var result = false;
		//check if contains
		for (var i =0; i<parse_json.length;i++){
			this.setState({processing: 50});
			//console.log("processing: " + this.state.processing);
			if (parse_json[i]["name"] == this.state.searching ){
				var geo = [ parse_json[i]["coord"]["lon"], parse_json[i]["coord"]["lat"] ];
				//console.log('city_geo: ' + this.state.city_geo);
				this.setState({
					city_geo: geo
				});	
				result = true;
				break;
			}
		}
		// if the city is found call the api to fetch weather
		if(result){
			this.handleAddCity();
		}
		else if (this.state.searching =="search city here" ){
			console.log("loading completed");
		}
		else{
			alert("Cannot find this city: "+ this.state.searching);
		}
		//this.setState({cname: this.state.locate});
		this.setState({loading: false});
		return result;
		
	}

	//handle adding city 
	handleAddCity = () => {
		console.warn("the local city list "+this.state.default_localCityList);
		this.setState({
			city: this.state.city.concat([{ cname: this.state.searching, lon: this.state.city_geo[0], lat: this.state.city_geo[1] }]),
			default_localCityList: this.state.default_localCityList+ "/"+this.state.searching+","+this.state.city_geo[0]+","+this.state.city_geo[1],
			cname: this.state.searching
		});
		//console.log("You have added a new city: " + this.state.searching);
		
		localStorage.setItem("city_saved",this.state.default_localCityList);
		
		
	};
	//compete editing when press the button
	editComplete =() =>{
		this.setState({editing: false});
		this.notEditing();
	}
	//method for reset the city_page, remove all city apart from the current located city
	handleClear = () => {
		this.isEditing();
		
		console.log("you are editing",this.state.editing);
		if(this.state.editing){
			this.set_city();
			localStorage.setItem("city_saved", this.state.default_localCityList);
		}
		this.setState({editing: true});
		
	}
	set_city =() =>{
		this.setState({
			city: [{cname: this.props.locate, lon: this.props.lon, lat: this.props.lat}],
			default_localCityList: this.props.locate + ","+ this.props.lon + ","+this.props.lat
		});
		
	}
	removeThis = (e) =>{
		var fields = this.state.default_localCityList.split("/");
		console.warn(this.state.default_localCityList);
		var index ="";
		for (var i = 0; i<fields.length; i++){
			var name = fields[i].split(",")[0];
			if (name==e.target.value){
				e.target.checked = false;
				this.state.city.splice(i,1);
				var remove_part = "/"+fields[i];
				if ( i == 0){remove_part = fields[i]+"/";}
				this.setState({
					default_localCityList: this.state.default_localCityList.replace(remove_part,""),
				});
				index = i;
				break;
			}
		}
		localStorage.setItem("city_saved",this.state.default_localCityList);
		this.isEditing();
	}
	back_to_home =() =>{
		this.editComplete();
		this.props.back();
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {		
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/weather?q="+this.props.locate+"&APPID=09bd58ab01a13c8705892ed88691ee30";

		
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('this.props.locate API call failed' + err); }
		})	
	}
	
	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		
		// display all weather data
		//call the props fucntion
		const {onClick} = this.props;
		
		const cities = 
		 this.state.city&&this.state.city.map((cit, idx) => {
			let key = idx;
				return(   <div>
						<Addcity  key ={cit.cname}
						class = {style.eachCity} 
						wname={cit.cname} 
						click_go={()=>{onClick(cit.cname,cit.lon,cit.lat); this.editComplete()}} 
						delete_class ={`${"select"} ${style.remove_button}`} 
						delete_onChange = {this.removeThis}
						delete_value = {cit.cname}
						home_city = {this.props.locate}
						each_city_temp_class = {"each_city_temp"}
						/></div>
				);
				
		});

		
		
		
		return ( 
			<div class ={ style.container } >	
				
				
				<div id ="header" class = {style.theader}>
				
					<button class = {style.return} onclick = {this.back_to_home}>			
					</button>
							
					
					<form id ="search" class = {style.formm} onsubmit = {this.handleChange}>	
						<input class = {style.input} onFocus={this.handleFocus.bind(this)} value ={this.state.cname} name = "city" type = "text" placeholder= "             Add city" />			
						<button  class = {style.add}></button>				
					</form>
					<div id = "pointer" style ="position: absolute; right: 30px; color: white; font-weight: bold;"><h2>Current: {this.props.locate}</h2></div>

				</div>	
					
				<div class ={style.cityContainer}>
				
				{cities}
					
				</div>
				<div class ={style.butcond}>
				
					<button class = {style.but} id ="save" type = "button" onclick={this.editComplete} >✔</button>
					<button id = "edit" class = {style.but} type = "button" onclick={this.handleClear} >Edit</button>
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
