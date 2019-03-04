//import preact
import {h, render, Component} from 'preact';

// import stylesheets for iphone & button
import style from './style';

export default class HomepageFuture extends Component{
	render (){
		var day_sec = Date.now();
		var day ="";
		var day_list = ["Tomorrow"];
		let table =[];
		let row=[];
		//Inner loop to create children
		var icon_list = this.props.future_icon_list&&this.props.future_icon_list.map((item,index)=>{
			return item;
		});
		var setIcon = require("components/iphone/setIcon/index.js");
		return (
			<div id = {"below_area"}>
				<div  class ={style.timeline}>
					<div id ={"below_timeline_table"} class ={style.timeline_table}>
						<table>{this.timeline_table()}</table>
					</div>
				</div>
				
				<div id ={"below_future"} class ={style.futureContainer}>
					<div class ={style.future_table}>
						<div id ={style.vertical_line_1}></div>
						<div id ={style.vertical_line_2}></div>
						<div id ={style.horizontal_line_1}></div>
						<div id ={this.props.future_table_id} class ={style.future_box_container}>
							{	
								this.props.future_temp&&this.props.future_temp.map((obj, index) => {
								day_sec += 60*60*24*1000;
								day_list.push(new Date(day_sec).toLocaleDateString().substring(0,5));
								if(index<6){

									return(
										<span id ={"future_day_"+(index+1)} class ={style.future_box} key={`${obj.min}`}>
										<p class = {style.future_temp}>{obj.min}/<span id = {style.future_temp_max}>{obj.max}</span></p>
										<img class ={style.future_icons} src = {setIcon.setUpIcons(icon_list[index])} alt="future icons" width= "50" height = "50" />
										<div>{day_list[index]}</div>
										</span>
									);
								}
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
	timeline_table = () =>{
		let table = [];

		// Outer loop to create parent
		let time = [];
		let temp = [];
		//Inner loop to create children
		var time_list = this.props.timeline_time;
		var temp_list = this.props.timeline_temp;
		time.push(time_list&&time_list.map((item, index) => {
			return (<td id = { style.timeline_time } key={`${index}`}>{item}{"  "} </td>);
		}));
		
		//Create the parent and add the children
		table.push(<tr>{time}</tr>);
		
		temp.push(temp_list&&temp_list.map((item, index) => {
			return (<td id = { style.timeline_temp } key={`${index}`}>{item}</td>);
		}));
		table.push(<tr>{temp}</tr>);
		//console.log(this.state.time_list);
		return table;

	}
	
}