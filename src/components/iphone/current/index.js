//import preact
import {h, render, Component} from 'preact';
import Clock  from '../clock';
// import stylesheets for iphone & button
import style from './style';
import $ from 'jquery';
import {slider} from 'jquery-ui';
export default class HomepageCurrent extends Component{
	constructor(props){
		super(props);
	}
	render (){
		return (
			<div class = {style.current_weather}>
				<label 
				id = "button_close" class ={style.uv_close} 
				style ="display: none" 
				onclick ={ this.close_uv_info}> 
					<p>x</p> 
				</label>
				
				<dialog 
				id="favDialog" class = {style.uv_box} 
				style ="display: none" >
					<div class= {style.uv_info_content}>
						<p>
							<label>UV reference:</label>
						</p>
						<ul>
							<li class = {style.uv_info_list}
							style="background-color: green; border-color: green;">
								<p>{"<=2.9 Low"}</p>
							</li>
							<li class = {style.uv_info_list} 
							style="background-color: rgb(240,240,0); border-color: rgb(240,240,0);">
								<p>{"<=5.9 Moderate"}</p>
							</li>
							<li class = {style.uv_info_list} 
							style="background-color: orange; border-color: orange;">
								<p>{"<=7.9 High"}</p>
							</li>
							<li class = {style.uv_info_list} 
							style="background-color: red; border-color: red;">
								<p>{"<=10.9 Very high"}</p>
							</li>
							<li class = {style.uv_info_list} 
							style="background-color: violet; border-color: violet;">
								<p>{">10.9 Extreme"}</p>
							</li>
						</ul>
					</div>	
				</dialog>
				<span class ={ style.main }>
					<div >
						<img 
						id ={this.props.main_icon} 
						class = {style.icons} 
						alt="conditon icon" 
						width ="100" 
						height = "100" />
					</div>
					<div 
					id = "main_condition" 
					class ={ style.conditions }>
						{ this.props.cond }
					</div>
					<span 
					id = {style.main_temperature} 
					class ={this.props.tempStyles}>
						{ this.props.temp }
					</span>
					<Clock 
					locate = {this.props.locate} 
					/>
				</span>
				<span class = {style.indicators}>
					<div class = {style.indicators_details}>
						<img class = {style.indicators_icon} src = "assets/icons/humidity.png" alt="humidity icon" width ="30" height = "30" />
						<span id ="icon_humidity" class = {style.indicators_content}>{ this.props.humidity + "%"}</span>
					</div>
					<div class = {style.indicators_details}>
						<img class = {style.indicators_icon} src = "assets/icons/uv.png" alt="uv icon" width ="30" height = "30" />
						<p  class = {style.indicators_content}>{this.props.uv }</p>
						<p id ={"icon_uv"} class = {style.indicators_content_button } onclick ={this.getUVInfo}>{this.props.status }</p>
					</div>
					
					<div class = {style.indicators_details}>
						<img class = {style.indicators_icon} src = "assets/icons/wind.png" alt="wind icon" width ="30" height = "30" />
						<p id ="icon_wind" class = {style.indicators_content}>{this.props.wind}</p>
					</div>
					<div class = {style.indicators_details}>
						<img class = {style.indicators_icon} src = "assets/icons/sunrise.png" alt="sunrise icon" width ="30" height = "30" />
						<p id ="icon_sunrise" class = {style.indicators_content}>{this.props.sunrise}</p>
					</div>
					<div class = {style.indicators_details}>
						<img class = {style.indicators_icon} src = "assets/icons/sunset.png" alt="sunset icon" width ="30" height = "30" />
						<p id ="icon_sunset" class = {style.indicators_content}>{this.props.sunset}</p>
					</div>
				</span>
			</div>
		);
	}
	getUVInfo =() =>{
		require("jquery-ui/ui/effects/effect-slide");
		$("#favDialog").show("slide", {direction: "right"}, 100);
		$("#button_close").show("slide", {direction: "left"}, 100);
	}
	close_uv_info =() =>{
		// because you use 'slide' in
		// $('.comment').hide('slide', { direction: 'left' }, 1000);
		require("jquery-ui/ui/effects/effect-slide");
		$("#favDialog").hide("slide", {direction: "right"}, 100);
		$("#button_close").hide("slide", {direction: "left"}, 100);
	}

}