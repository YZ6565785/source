//animated icons downloaded from https://www.amcharts.com/free-animated-svg-weather-icons/
//license link: https://creativecommons.org/licenses/by/4.0/

module.exports.setUpIcons = (icon) =>{
	switch (icon){
        case "01d":
            return "assets/amcharts_weather_icons_1-2/animated/day.svg";
            break;
        case "01n":
        case "02n":
            return "assets/amcharts_weather_icons_1-2/animated/night.svg";
            break;
        case "02d":
        case "03d":
            return "assets/amcharts_weather_icons_1-2/animated/cloudy-day-2.svg";
            break;
        case "04d":
        case "03n":
        case "04n":
            return "assets/amcharts_weather_icons_1-2/animated/cloudy.svg";
            break;
        case "09d":
        case "10d":
        case "09n":
        case "10n":
            return "assets/amcharts_weather_icons_1-2/animated/rainy-7.svg";
            break;
        case "11d":
        case "11n":
            return "assets/amcharts_weather_icons_1-2/animated/thunder.svg";
            break;
        case "13d":
        case "13n":
            return "assets/amcharts_weather_icons_1-2/animated/snowy-5.svg";
            break;
        case "50d":
            return "assets/amcharts_weather_icons_1-2/animated/cloudy-day-3.svg";
            break;
        case "50n":
            return "assets/amcharts_weather_icons_1-2/animated/cloudy-night-3.svg";
            break;
        default:
            return "assets/icons/lock.png";
    }
};

