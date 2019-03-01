import {h, render, Component} from 'preact';
import $ from 'jquery';
export default class Clock extends Component{
	constructor(props){
		super(props);
		this.setState( {
            time: new Date(Date.now()).toLocaleTimeString(),
            timezone: "",
            timeoff: 0
        } );
        //alert("clock location: " + this.props.locate);
    }
    componentDidMount =() =>{
        this.startClock();
        
    }
	render(){
		return (
            <div>{this.state.time}</div>
        );
    }
    startClock = () => {
        setInterval(() =>{
            this.setState( {
                time: new Date(Date.now()+this.state.timeoff).toLocaleTimeString()
            } );
        },1000);
    }
    getTimezone =() => {
        
        $.getJSON("assets/city_bg_list.json", function(data){
			$.each(data, function(key,val){
				if(val.name ==currentLocation){
                    this.setState({
                        timezone: val.tz,
                        timeoff: parseInt(this.state.timezone)*360000
                    });
                    console.log("sadfasdfasdfsadsadfadsfadsfasdf", this.state.timeoff);
					return false;
				}
				console.log("test each loop: " + val.name);
			})
		})
    }
	
}
