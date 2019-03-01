

module.exports.setUpIcons = (icon,icon_src) =>{
	switch (icon){
        case "01d":
            icon_src.src="assets/icons/sunny.png";
            break;
        case "01n":
        case "02n":
            icon_src.src="assets/icons/moon.png";
            break;
        case "02d":
        case "03d":
            icon_src.src="assets/icons/cloudy.png";
            break;
        case "04d":
        case "03n":
        case "04n":
            icon_src.src = "assets/icons/clouds.png";
            break;
        case "09d":
        case "10d":
        case "09n":
        case "10n":
            icon_src.src = "assets/icons/rainy.png";
            break;
        case "11d":
        case "11n":
            icon_src.src = "assets/icons/storm.png";
            break;
        case "13d":
        case "13n":
            icon_src.src = "assets/icons/snowy.png";
            break;
        case "50d":
            icon_src.src = "assets/icons/fog_d.png";
            break;
        case "50n":
            icon_src.src = "assets/icons/fog_n.png";
            break;
        default:
            icon_src.src = "assets/icons/lock.png";
    }
};

