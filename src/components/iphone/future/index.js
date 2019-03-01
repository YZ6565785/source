//import preact
import {h, render, Component} from 'preact';

// import stylesheets for iphone & button
import style from './style';

export default class HomepageFuture extends Component{
	render (){
		return (
			<div id = {"below_area"}>
				<div  class ={style.timeline}>
					<div id ={"below_timeline_table"} class ={style.timeline_table}>
						<table>{this.props.timeline_table}</table>
					</div>
				</div>
				
				<div id ={"below_future"} class ={style.futureContainer}>
					<div class ={style.future_table}>
						<div id ={style.vertical_line_1}></div>
						<div id ={style.vertical_line_2}></div>
						<div id ={style.horizontal_line_1}></div>
						{this.future_table()}{this.fillOutDays()}
					</div>
				</div>
			</div>
		);
	}
	future_table = () =>{
		//console.log("##############"+ "calling HomepageFuture");
		var day_sec = Date.now()
		var day ="";
		var day_list = ["Tomorrow"]
		let table =[];
		let row=[];
		//Inner loop to create children
		this.props.future_temp&&this.props.future_temp.map((obj, index) => {
			day_sec += 60*60*24*1000;
			day_list.push(new Date(day_sec).toLocaleDateString().substring(0,5));

			row.push(
				<span class ={style.future_box} key={`${obj.min}`}>
				<p class = {style.future_temp}>{obj.min}/<span id = {style.future_temp_max}>{obj.max}</span></p>
				<img id = {"future_icon_"+(index+1).toString()} class ={style.future_icons} alt="future icons" width= "50" height = "50" />
				<div id = {"future_day_"+(index+1).toString()}>{day_list[index]}</div>
			</span>);
				
		});
		//Create the parent and add the children
		table.push(<div id ={"below_future_table"} class ={style.future_box_container}>{row}</div>);

		//console.log(this.state.time_list);
		return table;
	}
	//=================================
	//							      =
	// generate the future table temp =
	//							      =
	//=================================
	fillOutDays = () =>{
		var refreshIntervalId = setInterval(() =>{
			var icon = this.props.future_icon_list&&this.props.future_icon_list.map((item, index) => {
				//console.log("##############"+ index);
				var id = "future_icon_" + (index+1).toString();
				var future_icon_src = document.getElementById(id);
				var setIcon = require("components/iphone/setIcon/index.js");
				setIcon.setUpIcons(item,future_icon_src);
			});
					
			clearInterval(refreshIntervalId);
					
		//document.write(future_icon_src); 
		}, 0);
		

	}
}