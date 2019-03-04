//import preact
import {h, render, Component} from 'preact';
import BelowButton from '../belowButton';
// import stylesheets for iphone & button
import style from './style';
import { slider } from 'jquery-ui';
import $ from 'jquery';
export default class MusicRecommendation extends Component{
	constructor(props){
		super(props);
		var arr = [];
		this.setState({
			main: this.props.weather_cond,
			current_list: arr,
			display: false,
			color: ""
		});
		//console.log("gggggggggg", this.state.main);
	}
	
	render (){
		var list = this.generateMusic();
		return (
			<div>


			<div  id ="musicRecommendation" class ={style.musicRecommendation}>
				<span class ={style.music}>
				
				<div>
					<div id ="weather">
						Now the weather is {this.props.weather_cond}.
					</div>
					<img src = "assets/icons/musicIcon_white.png" width="20" height ="20" alt = "music icon" /><h3>Music</h3>
				</div>
				
				<div class = {style.mucic_container}>{list}</div>
				
				</span>
				
			</div> 
			<BelowButton id ={"below_button"} content_id = {"content_id"} class ={style.button} musicRecommendation ={this.musicRecommendation} />
			<button id ="refresh" class ={style.button_refresh} onclick ={this.refresh} >
				<img alt ="refresh" src = "assets/icons/refresh-button.png" 
				width = "30" height ="30" />
			</button>
			</div>
		);
	}
	musicRecommendation = () =>{
		
		var show = this.props.showBelow;
		//console.log("show",show);
		
		var button = document.getElementById("below_button");
		var content = document.getElementById("content_id");
		if (show){
			this.props.hiding();
			this.showing_musicRecommendation();
			button.style.top = "0";
			button.style.background = "#0000";
			button.style.height = "736px";
			var main = this.props.getWeather();
			//console.log("main: ===> " + main);
			this.getMusic(main);
			$("#refresh").show();
		}
		else{
			this.props.showing();
			this.hiding_musicRecommendation();
			button.style.top = "95%";
			button.style.height = "37px";
			button.style.background = "#6DA4CC";
			content.style.marginTop = "0";
			content.style.color ="white";
			$("#refresh").hide();
			
		}
		//this.setState({showBelow: false});
	}
	refresh = () =>{
		
		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}
		var code_list = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
		var start_position =1;
		var color = "#";
		for (var i = 0; i < 6; i ++){
			var index = getRandomInt(16);
			color = color + code_list[index];
		}
		this.setState({color: color.substring(1)});
		$('.music_line').animate({
			color: color,
		});
		$('#content_id').animate({
			color: color,
			transition: "1s"
		});
		
		this.getMusic();
	}
	hiding_musicRecommendation = () =>{
		require("jquery-ui/ui/effects/effect-slide");
		$('#musicRecommendation').hide("slide", {direction: "down"}, 1000);
	}
	showing_musicRecommendation = () =>{
		require("jquery-ui/ui/effects/effect-slide");
		$('#musicRecommendation').show("slide", {direction: "right"}, 100);
		
	}
	//=================================
	//							      =
	// generate the future table temp =
	//							      =
	//=================================
	generateMusic = () =>{
		let table =[];
		let row_1=[];
		//Inner loop to create children
		this.state.current_list&&this.state.current_list.map((obj, index) => {
			const link = <a href= {obj.href} style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/embed/v1/app-icon.svg) no-repeat;width:40px;height:40px;"></a>;
			var show = true;
			if (obj.artist == " 👍"){
				show = false;
			}
			row_1.push(
				<li class ="music_line" key={`${obj.name}`}>
						{show? link: null}
						<div id ={style.music_name}>{obj.name }</div>
						<div id ="mucis_artist"> - {obj.artist}</div>
						
				</li>);
		});
		
		return <ul class ={style.music_ul}>{row_1}</ul>;
	}
	
	getMusic =(main)=>{
		
		//console.log("random number: " + Math.ceil(Math.random()*10));
		this.setState({
			current_list: []
		});
		this.fetchMusics();
		
	}
	fetchMusics= () =>{
		$.ajax({
			url: "assets/localapi/music_list.json",
			dataType: "json",
			success : this.getMusics,
			error : function(req, err){ 
				console.log('city not found ' + err); 
			}
		});
		
	}
	
	// a call to fetch weather data via wunderground
	getMusics = (parse_json) =>{
		var main = this.props.getWeather();
		var opt = "";
		if (main == "clear sky" || main == "few clouds" || main == "mist"){
			opt = "1";
		}
		else if(main == "scatterd clouds" || main == "broken clouds" || main == "haze" || main == "fog" ){
			opt = "2";
		}
		else if (main == "shower rain" || main == "rain" || main =="light rain" ){
			opt = "3";
		}
		else if (main == "snow"){
			opt = "4";
		}
		else if (main == "thunderstorm"){
			opt = "5";
		}
		else{
			opt = "0";
		}
		var arr =[];
		var count =0;
		
		count = this.searchingMusic(parse_json, arr, opt, count);
		//=================================
		//							      =
		// duplicate copies of musics     =
		//							      =
		//=================================
		
		while (count !=6){

			arr.push({name: "Developer is too lazy to add more musics", artist:" 👍"});
			count = this.searchingMusic(parse_json, arr, opt, count);
		}

		this.setState({
			current_list: arr
		});
		
	}
	searchingMusic =(parse_json,arr,opt, count) =>{
		var start = Math.ceil(Math.random()*10)
		for (var i =start; i<parse_json.length;i++){
			var obj = parse_json[i];
			if (opt == obj.type){
				count ++;
				arr.push({name:obj.song, artist: obj.artist, href: obj.href});
				
				if (count ==6){
					break;
				}
				
			}
		}
		return count;
	}
	
}