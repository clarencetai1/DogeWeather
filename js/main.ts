var APPID = "846fd88591fcaf33ab0a8874cffa1a16";
var temp: any;
var loc: any;
var icon: any;
var humidity: any;
var wind:any;
var direction: any;
var country: any;
var i: any;

function update(weather) : void {
    humidity.innerHTML = weather.humidity;
    wind.innerHTML = weather.wind;
    direction.innerHTML = weather.direction;
    loc.innerHTML = weather.location;
    temp.innerHTML = weather.temp;
    icon.src = "imgs/codes/" + weather.icon + ".png"
    country.innerHTML = weather.country;
}

window.onload = function () {
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind")
    direction = document.getElementById("direction");
    country = document.getElementById("country")

	var q = window.prompt("What is the city's name?");
	updateByZip(q);
    }


function updateByGeo(lat, lon) : void{
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"lat=" + lat +
	"&lon=" + lon +
	"&APPID=" + APPID;
    sendRequest(url);    
}


function updateByZip(q) : void{
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"q=" + q +
	"&APPID=" + APPID;
    sendRequest(url);
}


function sendRequest(url) : void{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
	    var weather : any = {};
	    weather.icon = data.weather[0].id;
	    weather.humidity = data.main.humidity;
        weather.wind = data.wind.speed;
        weather.country = data.sys.country;

	    weather.direction = degreesToDirection(data.wind.deg)
	    weather.location = data.name;

	    weather.temp = K2C(data.main.temp);		
	    update(weather);
	}
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();    
}

function degreesToDirection(degrees) : any{
    var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    for( i in angles ) {
	if(degrees >= low && degrees < high){
	    return angles[i];
	}
	low = (low + range) % 360;
	high = (high + range) % 360;
    }
    return "N";
    
}

function K2C(k) : number{
    return Math.round(k - 273.15);
}
