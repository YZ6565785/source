import {h, render, Component} from 'preact';
import $ from 'jquery';
export default class Clock extends Component{
	constructor(props){
		super(props);
		this.setState( {
            time: new Date(Date.now()).toLocaleTimeString(),
            timezone: "0",
            timeoff: 0,
            support: true
        } );
        //alert("clock location: " + this.props.locate);
        this.connect();
    }
    clock = 0;
    componentDidMount =() =>{
        this.connect();
        this.clock = setInterval(() =>{
            this.setState( {
                time: new Date(Date.now()+this.state.timeoff).toLocaleTimeString("en-US")
            } );
        },1000);
        
    }
    componentDidUpdate=(nextProps)=>{
        if(this.props.locate != nextProps.locate){
            console.warn("this: "+ this.props.locate);
            console.warn("next: "+ nextProps.locate);
            this.connect();
        }
    }
	render(){
		return (
            <div>
                {this.state.support? <div id ="clock" name = {this.props.locate}>{this.state.time}</div> : null}
            </div> 
        );
    }
    connect= () =>{
		$.ajax({
			url: "assets/localapi/city_bg_list.json",
			dataType: "json",
			success : this.getData_tz,
			error : function(req, err){ 
				console.log('city not found ' + err); 
			}
		});
    }
    
    // set not found as default
    getData_tz =(parse_json) =>{
        var result = false;
        var timezone ="";
		for (var i =0; i<parse_json.length;i++){
			if (parse_json[i]["name"] == this.props.locate){
				timezone = parse_json[i]["tz"];
				result = true;
				break;
			}
		}
		// if the city is found call the api to fetch weather
		if(result){
            this.setState({
                timezone: timezone,
                timeoff: parseInt(timezone)*60*60*1000,
                support: true
            });
        }
        else{
            this.setState({
                support: false
            });
        }
        
    }
	
}
