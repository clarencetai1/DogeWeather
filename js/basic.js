var APPID = "846fd88591fcaf33ab0a8874cffa1a16";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

function update(weather) {
    humidity.innerHTML = weather.humidity;
    wind.innerHtml = weather.wind;
    direction.innerHTML = weather.direction;
    loc.innerHTML = weather.location;
    temp.innerHTML = weather.temp;
    icon.src = "imgs/codes/" + weather.code + ".png"
    console.log(icon.src)
}

window.onload = function () {
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");

{
	var q = window.prompt("Enter a city name?");
	updateByZip(q);
    }

}


function updateByGeo(lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"lat=" + lat +
	"&lon=" + lon +
	"&APPID=" + APPID;
    sendRequest(url);    
}


function updateByZip(q){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"q=" + q +
	"&APPID=" + APPID;
    sendRequest(url);
}


function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
	    var weather = {};
	    weather.code = data.weather[0].id;
	    weather.humidity = data.main.humidity;
	    weather.wind = data.wind.speed;

	    weather.direction = degreesToDirection(data.wind.deg)
	    weather.location = data.name;

	    weather.temp = K2C(data.main.temp);		
	    update(weather);
	}
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();    
}

function degreesToDirection(degrees){
    var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    for( i in angles ) {
	if(degrees >= low && degrees < high){
	    console.log(angles[i]);
	    return angles[i];
	    console.log("derp");
	}
	low = (low + range) % 360;
	high = (high + range) % 360;
    }
    return "N";
    
}

function K2C(k){
    return Math.round(k - 273.15);
}
