// import preact
import { h, render, Component, } from 'preact';

// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Mainframe from '../city_page/main_frame';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ 
			display: true,
			showBelow: true
		});
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url_today = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=627605be16f00179b6aed833e7f34a27";
		var url_timeline = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=627605be16f00179b6aed833e7f34a27";
		var url_uv = "http://api.openweathermap.org/data/2.5/uvi?&lat=51.509865&lon=-0.118092&APPID=627605be16f00179b6aed833e7f34a27";
	  //url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=627605be16f00179b6aed833e7f34a27"
		$.ajax({
			url: url_timeline,
			dataType: "jsonp",
			success : this.parseResponse_timeline,
			
			error : function(req, err){ console.log('timeline API call failed ' + err); }
		})
		
		$.ajax({
			url: url_today,
			dataType: "jsonp",
			success : this.parseResponse_today,
			
			error : function(req, err){ console.log('today API call failed ' + err); }
		})
		
		$.ajax({
			url: url_uv,
			dataType: "json",
			success : this.parseResponse_uv,
			error : function(req, err){ console.log('uv API call failed ' + err); }
		})
		
		this.setState({ display: false });
		
	}
	
	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		// display all weather data
		
		var table = this.future_table();
		return (
			
			<div id = {"container_main"} class ={ style.container }>
				
				{this.state.display ? null :
				<span id = {"backgroundBlur"} class ={ style.backgroundBlur }>
					<span class ={ style.menu }>
						<img class = {style.menu_icon} src = "../assets/icons/add.png" alt="add icon" width ="30" height = "30" />
						<img class = {style.menu_icon} src = "../assets/icons/share.png" alt="share icon" width ="30" height = "30" />
						
						<button id = "current_city" class ={ style.city } onclick = {this.manageCity}>
							{ this.state.locate }
						</button>
					</span>
					<span class ={ style.header }>
						
						<div id="openweathermap-widget-16"></div>
						<div id = "main_condition_icon"><img id ="main_icon" class = {style.icons} alt="conditon icon" width ="100" height = "100" /></div>
						<div id = "main_condition" class ={ style.conditions }>{ this.state.cond }</div>
						<span id = "main_temperature" class ={ tempStyles }>{ this.state.temp }</span>
					</span>
					<span class = {style.indicators}>
						<div class = {style.indicators_details}>
							<img class = {style.indicators_icon} src = "../assets/icons/humidity.png" alt="humidity icon" width ="30" height = "30" />
							<span id ="icon_humidity" class = {style.indicators_content}>{ this.state.humidity + "%"}</span>
						</div>
						<div class = {style.indicators_details}>
							<img class = {style.indicators_icon} src = "../assets/icons/uv.png" alt="uv icon" width ="30" height = "30" />
							<p  class = {style.indicators_content}>{this.state.uv }</p>
							<p id ={"icon_uv"} class = {style.indicators_content}>{this.state.status }</p>
						</div>
						<div class = {style.indicators_details}>
							<img class = {style.indicators_icon} src = "../assets/icons/wind.png" alt="wind icon" width ="30" height = "30" />
							<p id ="icon_wind" class = {style.indicators_content}>{this.state.wind}</p>
						</div>
						<div class = {style.indicators_details}>
							<img class = {style.indicators_icon} src = "../assets/icons/sunrise.png" alt="sunrise icon" width ="30" height = "30" />
							<p id ="icon_sunrise" class = {style.indicators_content}>{this.state.sunrise}</p>
						</div>
						<div class = {style.indicators_details}>
							<img class = {style.indicators_icon} src = "../assets/icons/sunset.png" alt="sunset icon" width ="30" height = "30" />
							<p id ="icon_sunset" class = {style.indicators_content}>{this.state.sunset}</p>
						</div>
					</span>
					<button id ={"below_button"} class = {style.button_below} onclick ={this.musicRecommendation}>Recommendation</button>
					<div id = {"below_area"}>
						<div  class ={style.timeline}>
							<div id ={"below_timeline_table"} class ={style.timeline_table}>
								<table  >{this.timeline_table()}</table>
							</div>
						</div>
						
						<div id ={"below_future"} class ={style.futureContainer}>
							<div class ={style.future_table}>
								<div id ={style.vertical_line_1}></div>
								<div id ={style.vertical_line_2}></div>
								<div id ={style.horizontal_line_1}></div>
								{table}{this.fillOutDays()}
							</div>
						</div>
					</div>
				</span>}
				{this.state.display ? null : <div id = {"cityManage"} class = {style.cityManage} >
					<Mainframe />
					<button class = {style.cityManage_back} onclick ={this.back_to_home}>back</button>
				</div>}
				
				<div class ={ style.details }></div>
				<div class = { style_iphone.container }> 
					{ this.state.display ? <Button class ={ style_iphone.button } clickFunction={ this.fetchWeatherData}/ > : null }
				</div>
			</div>
		);
		
		
	}
	musicRecommendation = () =>{
		var timeline_table = document.getElementById("below_timeline_table");
		var future_container = document.getElementById("below_future");
		var button = document.getElementById("below_button");
		var show = this.state.showBelow;
		console.log(show);
		if (show){
			//$("#below_timeline_table").empty();
			//$("#below_future").empty();
			//this.state.showBelow = false;
			timeline_table.style.display = "none";
			future_container.style.display = "none";
			button.style.top = "370px";
			button.style.background = "#0000";
			button.style.height = "360px";
			
			this.setState({showBelow: false});
			
			console.log(this.state.future_temp);
		}
		else{
			$("#below_future_table").empty();
			timeline_table.style.display = "flex";
			future_container.style.display = "flex";
			button.style.top = "97%";
			button.style.height = "20px";
			button.style.background = "#6DA4CC";
			this.setState({showBelow: true});
		}
		//this.setState({showBelow: false});
	}
	manageCity = () =>{
		//var container_main = document.getElementById("container_main");
		//container_main.style.display = "none";
		
		//this.musicRecommendation();
		$("#backgroundBlur").hide(1000);
		$("#cityManage").toggle(1000, function(){});
	}
	back_to_home = ()=>{
		$("#backgroundBlur").show(100);
		$("#cityManage").toggle(1000, function(){});
		//setTimeout(function() {
			//var cityManage = document.getElementById("cityManage");
			//cityManage.style.display = "none";
		//}, 200);
	}
	timeline_table = () =>{
		let table = [];

		// Outer loop to create parent
		let time = [];
		let temp = [];
		//Inner loop to create children
		time.push(this.state.timeline_time&&this.state.timeline_time.map((item, index) => {
			return (<td id = { style.timeline_time } key={`${index}`}>{item}{"  "} </td>);
		}));
		
		//Create the parent and add the children
		table.push(<tr>{time}</tr>);
		
		temp.push(this.state.timeline_temp&&this.state.timeline_temp.map((item, index) => {
			return (<td id = { style.timeline_temp } key={`${index}`}>{item}</td>);
		}));
		table.push(<tr>{temp}</tr>);
		//console.log(this.state.time_list);
		return table;
		
		
	}
	future_table = () =>{
		
		let table =[];
		let row_1=[];
		let row_2=[];
		//Inner loop to create children
		this.state.future_temp&&this.state.future_temp.map((obj, index) => {
			
			if (index <=2){
				row_1.push(
					<td class ={style.future_box} key={`${obj.min}`}>
					<p class = {style.future_temp}>{obj.min}/<span id = {style.future_temp_max}>{obj.max}</span></p>
					<img id = {"future_icon_"+(index+1).toString()} class ={style.future_icons} alt="future icons" width= "50" height = "50" />
					<div id = {"future_day_"+(index+1).toString()}></div>
				</td>);
			}
			else{
				row_2.push(<td class ={style.future_box} key={`${obj.min}_{obj.max}`}>
				<p class = {style.future_temp}>{obj.min}/<span id = {style.future_temp_max}>{obj.max}</span></p>
				<img id = {"future_icon_"+(index+1).toString()} class ={style.future_icons} alt="future icons" width= "50" height = "50" />
				<div id = {"future_day_"+(index+1).toString()}></div>
					</td>);
			}
				
		});
		//Create the parent and add the children
		table.push(<tr>{row_1}</tr>);

		//Create the parent and add the children
		table.push(<tr>{row_2}</tr>);
		//console.log(this.state.time_list);
		return <table id ={"below_future_table"}>{table}</table>;
	}
	
	
	fillOutDays = () =>{
			
			var refreshIntervalId = setInterval(() =>{
				
				var icon = this.state.future_icon_list&&this.state.future_icon_list.map((item, index) => {
					return (item);
				});
				for (var i =0; i<6; i++){
					var id = "future_icon_" + (i+1).toString();
					var future_icon_src = document.getElementById(id);
					
					switch (icon[i]){
						case "01d":
							future_icon_src.src="../assets/icons/sunny.png";
							break;
						case "01n":
						case "02n":
							future_icon_src.src="../assets/icons/moon.png";
							break;
						case "02d":
						case "03d":
							future_icon_src.src="../assets/icons/cloudy.png";
							break;
						case "04d":
						case "03n":
						case "04n":
							future_icon_src.src = "../assets/icons/clouds.png";
							break;
						case "09d":
						case "10d":
						case "09n":
						case "10n":
							future_icon_src.src = "../assets/icons/rainy.png";
							break;
						case "11d":
						case "11n":
							future_icon_src.src = "../assets/icons/storm.png";
							break;
						case "13d":
						case "13n":
							future_icon_src.src = "../assets/icons/snowy.png";
							break;
						case "50d":
							future_icon_src.src = "../assets/icons/fog_d.png";
							break;
						case "50n":
							future_icon_src.src = "../assets/icons/fog_n.png";
							break;
						default:
							future_icon_src.src = "../assets/icons/lock.png";
					}
				}
				//console.log(icon);
				
				
				
				
				
				clearInterval(refreshIntervalId);
				
				//document.write(future_icon_src); 
			}, 100);
			

		}
	parseResponse_uv = (parsed_json) => {
		var uv = parsed_json["value"];
		
		var ele = document.getElementById("icon_uv");
		var color = "green";
		var status = "";
		if (uv<=2.9){color = "green";status = "Low";}
		else if (uv<=5.9){color = "yellow";status = "Moderate";}
		else if (uv<=7.9){color = "orange";status = "High";}
		else if (uv<=10.9){color = "red";status = "Very high";}
		else {color = "violet";status = "Extreme";}
		
		ele.style.backgroundColor = color;
		ele.style.border = "1px solid "+color;
		ele.style.borderRadius = "5px";
		ele.style.padding = " 0 5px 0 5px";
		
		this.setState({
			uv: uv+ "\t\t",
			status: status
		});
	}
	parseResponse_today = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = Math.round(parsed_json['main']['temp']);
		var conditions = parsed_json['weather']['0']['description'];
		var condition_main = parsed_json['weather']['0']['main'];
		var currentTime = new Date(Date.now()).toLocaleTimeString();
		var weather_icon_id = parsed_json["weather"]["0"]["icon"];
		
		//showing each weather icon depends on the API feedback[weather.main]
		var weather_list = ["Sun", "Rain", "Snow", "Clouds","Clear"];
		var icon_src = document.getElementById("main_icon");
		
		console.log(weather_icon_id);
		switch (weather_icon_id){
			case "01d":
				icon_src.src="../assets/icons/sunny.png";
				break;
			case "01n":
			case "02n":
				icon_src.src="../assets/icons/moon.png";
				break;
			case "02d":
			case "03d":
				icon_src.src="../assets/icons/cloudy.png";
				break;
			case "04d":
			case "03n":
			case "04n":
				icon_src.src = "../assets/icons/clouds.png";
				break;
			case "09d":
			case "10d":
			case "09n":
			case "10n":
				icon_src.src = "../assets/icons/rainy.png";
				break;
			case "11d":
			case "11n":
				icon_src.src = "../assets/icons/storm.png";
				break;
			case "13d":
			case "13n":
				icon_src.src = "../assets/icons/snowy.png";
				break;
			case "50d":
				icon_src.src = "../assets/icons/fog_d.png";
				break;
			case "50n":
				icon_src.src = "../assets/icons/fog_n.png";
				break;
			default:
				icon_src.src = "../assets/icons/moon.png";
		}

		
		
		
		
		
		//=============================
		//							  =
		// set up for the indicators  =
		//							  =
		//=============================
		var humidity = parsed_json['main']['humidity'];
		
		// wind data in future api
		var sunrise = new Date(parsed_json['sys']['sunrise']*1000).toLocaleTimeString();
		var sunset = new Date(parsed_json['sys']['sunset']*1000).toLocaleTimeString();
		
		// set states for fields so they could be rendered later on
		this.setState({
			
			locate: location,
			temp: temp_c,
			cond : conditions,
			clock: currentTime,
			display: false,
			humidity: humidity,
			//wind: wind,
			sunrise: sunrise,
			sunset: sunset
			
		});
		this.setState( {
			clock: new Date(Date.now()).toLocaleTimeString()
		} );
		
		
	}// end of the today's api
	
	
	parseResponse_timeline = (parsed_json) => {
		var time_list = [];
		var temp_list = [];

		var dt = parsed_json['list']['0']['dt'];
		for (var i = 0; i<9; i++){
			var timeSuffix = "am";
			var time_hour = parseInt(new Date(parsed_json['list'][i]['dt']*1000).toLocaleTimeString().split(":"));
			if (time_hour >= 12){
				timeSuffix = "pm";
				if (time_hour > 12){
					time_hour -=12;
				}
				
			}
			var element = time_hour.toString() + timeSuffix;
			time_list.push(element);
			var temp_hour = Math.round(parsed_json['list'][i]['main']['temp']);
			temp_list.push(temp_hour+"°");
			time_list[0]="Now";
			//document.write(new Date(parsed_json['list'][i]['dt']*1000).toLocaleTimeString());
			//document.write("\t"+parsed_json['list'][i]['main']['temp']+"\n");
			
		}
		
		// wind
		//===================================
		//							        =
		// set up for the indicators: wind  =
		//							        =
		//===================================
		var wind_deg = parsed_json['list'][0]['wind']['deg'];
		console.log(wind_deg);
		var wind_direction = "";
		//var wind_dirction = ["N", "NE", "E", "SE", "SW", "W", "NW"]
		if (wind_deg > 340 && wind_deg <= 10){
			wind_direction = "N";
		}
		else if (wind_deg > 10 && wind_deg <= 70){
			wind_direction = "NE";
		}
		else if (wind_deg > 70 && wind_deg <= 100){
			wind_direction = "E";
		}
		else if (wind_deg > 100 && wind_deg <= 160){
			wind_direction = "SE";
		}
		else if (wind_deg > 160 && wind_deg <= 190){
			wind_direction = "S";
		}
		else if (wind_deg > 190 && wind_deg <= 250){
			wind_direction = "SW";
		}
		else if (wind_deg > 250 && wind_deg <= 280){
			wind_direction = "W";
		}
		else if (wind_deg > 280 && wind_deg <= 340){
			wind_direction = "NW";
		}
		else{
			wind_direction = "";
			console.warn("Direction error: " + wind_deg);
		}
		
		wind_direction +=", ";
		var wind = wind_direction + parsed_json['list'][0]['wind']['speed'] + "mps";
		
		//=================================
		//							      =
		// set up for the future weather  =
		//							      =
		//=================================
		var future_temp_icon_list = [];
		var future_temp_list = [];
		var foo = parsed_json['list']['2']['dt_txt'];
		console.log("this is "+foo);
		var day_count =0;
		for (var i=0; i<parsed_json['list'].length; i++){
			
			var day_time = parsed_json['list'][i]['dt_txt'];
			
			if (day_time.split(' ')[1] == "00:00:00"){
				var j = i;
				var end = i+8;
				if (end>=40){end=39;}
				var day_min = Math.round(parsed_json['list'][i]['main']['temp']);
				var day_max = Math.round(parsed_json['list'][i]['main']['temp']);
				var icon_id = "01d";
				for (j; j<end; j++){
					var temp_eachHour = Math.round(parsed_json['list'][j]['main']['temp']);
					if (temp_eachHour < day_min){
						day_min = temp_eachHour;
					}
					if (temp_eachHour > day_max){
						day_max = temp_eachHour;
					}
					var icon_id_eachHour = parsed_json["list"][j]["weather"]["0"]["icon"];
					if (parsed_json['list'][j]['dt_txt'].split(' ')[1] === "15:00:00"){
						icon_id = icon_id_eachHour;
					}
				}
				day_count++;
				
				console.log(day_count);
				
				console.log("min: " + day_min + ", max: " + day_min);
				future_temp_list.push({"min": day_min+"°", "max": day_max+"°"});
				future_temp_icon_list.push(icon_id);
			}

			console.log("i: " + i + ", temp: " +Math.round(parsed_json['list'][i]['main']['temp'])+", time: "+day_time.split(' ')); 

			// set icons for future weather
			
		}
		
		// when the api does not show 6 days:::
		for (var i=future_temp_list.length; i<6; i++){
			future_temp_list.push({"min": 0+"°", "max": 0+"°"});
			future_temp_icon_list.push("-1");
		}
		
		console.log(future_temp_list);
		
		//for(var key in time) { console.log(key); }
		
		this.setState({
			timeline_time: time_list,
			timeline_temp: temp_list,
			future_temp: future_temp_list,
			future_icon_list: future_temp_icon_list,
			//wind due to today api err
			wind: wind
		});
		
		console.log("icon list: " +future_temp_icon_list);
		
		var icon = this.state.future_icon_list&&this.state.future_icon_list.map((item, index) => {
			return (item);
		});
		
		var id = "future_icon_" + (0+1).toString();
		var future_icon_src = document.getElementById(id);
		//future_icon_src.src = "../assets/icons/moon.png";
	}// end of timeline api
	
}
