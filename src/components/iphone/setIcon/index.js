

module.exports.setUpIcons = (icon) =>{
	switch (icon){
        case "01d":
            return "assets/icons/sunny.png";
            break;
        case "01n":
        case "02n":
            return "assets/icons/moon.png";
            break;
        case "02d":
        case "03d":
            return "assets/icons/cloudy.png";
            break;
        case "04d":
        case "03n":
        case "04n":
            return "assets/icons/clouds.png";
            break;
        case "09d":
        case "10d":
        case "09n":
        case "10n":
            return "assets/icons/rainy.png";
            break;
        case "11d":
        case "11n":
            return "assets/icons/storm.png";
            break;
        case "13d":
        case "13n":
            return "assets/icons/snowy.png";
            break;
        case "50d":
            return "assets/icons/fog_d.png";
            break;
        case "50n":
            return "assets/icons/fog_n.png";
            break;
        default:
            return "assets/icons/lock.png";
    }
};

