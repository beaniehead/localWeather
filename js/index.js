/*
Weather Icons API Mapping - https://erikflowers.github.io/weather-icons/api-list.html
Weather Icons - https://erikflowers.github.io/weather-icons/

*/
$(function() {
  //Mapping object between OpenweatherMap Weather ID's and wi Weather icon classes
  var iconMap = {
    200: "thunderstorm",
    201: "thunderstorm",
    202: "thunderstorm",
    210: "lightning",
    211: "lightning",
    212: "lightning",
    221: "lightning",
    230: "thunderstorm",
    231: "thunderstorm",
    232: "thunderstorm",
    300: "sprinkle",
    301: "sprinkle",
    302: "rain",
    310: "rain-mix",
    311: "rain",
    312: "rain",
    313: "showers",
    314: "rain",
    321: "sprinkle",
    500: "sprinkle",
    501: "rain",
    502: "rain",
    503: "rain",
    504: "rain",
    511: "rain-mix",
    520: "showers",
    521: "showers",
    522: "showers",
    531: "storm-showers",
    600: "snow",
    601: "snow",
    602: "sleet",
    611: "rain-mix",
    612: "rain-mix",
    615: "rain-mix",
    616: "rain-mix",
    620: "rain-mix",
    621: "snow",
    622: "snow",
    701: "showers",
    711: "smoke",
    721: "day-haze",
    731: "dust",
    741: "fog",
    761: "dust",
    762: "dust",
    771: "cloudy-gusts",
    781: "tornado",
    800: "day-sunny",
    801: "cloudy-gusts",
    802: "cloudy-gusts",
    803: "cloudy-gusts",
    804: "cloudy",
    900: "tornado",
    901: "storm-showers",
    902: "hurricane",
    903: "snowflake-cold",
    904: "hot",
    905: "windy",
    906: "hail",
    957: "strong-wind",
  };

  $.getJSON("http://ipinfo.io/json", function(locale) {
    var here = locale.loc;
    var coord = here.split(",");
    var long = coord[1];
    var lat = coord[0];
    //units no longer used - API set to default - get units in Kelvin and the they are converted below
    //var units = "metric";
    var tempIcon = "°C";

    // full ipinfo json
    var location = locale;  
    $("#long").html(long);

      
    $("#lat").html(lat);
    $("#fullData").html(location);

    var api = "http://api.openweathermap.org/data/2.5/weather?";
    var locationConcat = "lat=" + lat + "&lon=" + long;
    var apiKey = "&APPID=25e222d34d524e26c76f2300f864d077";

    $.getJSON(api + locationConcat + apiKey, function(json) {
      $("#weatherData").html(json);

      var weatherMain = json.weather[0].main;
      var weatherDes = json.weather[0].description;
      //gets Open Weather Map icon number - not used
      var icon = json.weather[0].icon;
      var tempKelvin = json.main.temp;
      var temp = Math.round(tempKelvin - 273.15);
      var weatherId = json.weather[0].id;
      var location = json.name;
      var country = json.sys.country;

      $("#mainWeather").html("<strong>Weather: </strong>" + weatherMain + " (" + weatherDes + ")");
      $("#weatherId").html(" [ID - " + weatherId + "]");
      $(".icon").attr("title", weatherMain + " (" + weatherDes + ")");
      $("#weatherType").html(weatherMain + " (" + weatherDes + ")");
      //Shows open weather map Icon to html - not used
      //$("#icon").html("<strong>Icon: </strong>" + icon);
      $("#temp").html(temp);
      $("#temp").attr("title", tempKelvin);
      $("#tempIcon").html(tempIcon);
      //gets PNG file for Open Weather Map icon - not used
      //$("#weatherIcon").html("<img src='http://openweathermap.org/img/w/" + icon + ".png'></image>");
      $(".city").html(location + ", " + country);

      var iconMapped = iconMap[weatherId];
      //can use .attr('href', instead of .html
      $(".icon").html("<i class='wi wi-" + iconMapped + " weatherIcon'></i>");

      //Modal mappings and setting html for table

      var humidity = json.main.humidity;
      $(".humidity").html(humidity + "%");

      var pressure = json.main.pressure;
      $(".pressure").html(pressure + " mb");

      var windDirection = "";
      var deg = json.wind.deg;

      if (deg > 11.25 && deg < 33.75) {
        windDirection = "NNE";
      } else if (deg > 33.75 && deg < 56.25) {
        windDirection = "ENE";
      } else if (deg > 56.25 && deg < 78.75) {
        windDirection = "E";
      } else if (deg > 78.75 && deg < 101.25) {
        windDirection = "ESE";
      } else if (deg > 101.25 && deg < 123.75) {
        windDirection = "ESE";
      } else if (deg > 123.75 && deg < 146.25) {
        windDirection = "SE";
      } else if (deg > 146.25 && deg < 168.75) {
        windDirection = "SSE";
      } else if (deg > 168.75 && deg < 191.25) {
        windDirection = "S";
      } else if (deg > 191.25 && deg < 213.75) {
        windDirection = "SSW";
      } else if (deg > 213.75 && deg < 236.25) {
        windDirection = "SW";
      } else if (deg > 236.25 && deg < 258.75) {
        windDirection = "WSW";
      } else if (deg > 258.75 && deg < 281.25) {
        windDirection = "W";
      } else if (deg > 281.25 && deg < 303.75) {
        windDirection = "WNW";
      } else if (deg > 303.75 && deg < 326.25) {
        windDirection = "NW";
      } else if (deg > 326.25 && deg < 348.75) {
        windDirection = "NNW";
      } else {
        return "N";
      }

      $(".windDirection").html(windDirection + " (" + deg + "°)");

      var ws = '<span class="ws">';
      var wsclose = '</span>';
      var windSpeed = json.wind.speed;
      var windSpeedMPH = (Math.round(windSpeed * 22.37)) / 10;
      var windSpeedKPH = (Math.round(windSpeed * 36)) / 10;
      $(".windSpeed").html(windSpeed + " m/s (" + ws + windSpeedKPH + " kph" + wsclose + ")");
      $(".windSpeed").attr("id", "kph");

      $(".windSpeed").click(function() {

        if ($(".windSpeed").attr("id") == "kph") {
          $(".windSpeed").html(windSpeed + " m/s (" + ws + windSpeedMPH + " mph" + wsclose + ")");
          $(".windSpeed").attr("id", "mph");
        } else if ($(".windSpeed").attr("id") == "mph") {

          $(".windSpeed").html(windSpeed + " m/s (" + ws + windSpeedKPH + " kph" + wsclose + ")");
          $(".windSpeed").attr("id", "kph");
        }
      });
      //sunrise in unix time
      var sunrise = json.sys.sunrise;
      //sunrise time in hh:mm:ss format
      var sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
      var sunriseLength = sunriseTime.length;
      //creating sunrise string format hh:mm
      var sunriseShort = sunriseTime.substr(0, sunriseLength - 3);
      //date string in local format
      var sunriseDate = new Date(sunrise * 1000).toLocaleDateString();

      $(".sunrise").html(sunriseShort + " - " + sunriseDate);
      $(".test").html(sunriseTime + " on " + sunriseDate);
      //sunset in unix time
      var sunset = json.sys.sunset;
      //sunset time in hh:mm:ss format
      var sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
      var sunsetLength = sunsetTime.length;
      //creating sunsetstring format hh:mm
      var sunsetShort = sunsetTime.substr(0, sunriseLength - 3);
      //date string in local format
      var sunsetDate = new Date(sunset * 1000).toLocaleDateString();
      $(".sunset").html(sunsetShort + " - " + sunsetDate);
    });

  });

});

/* Using stored  temp values from kelvin and calculating the difference without calling API again*/

$(".celcius").on("click", function() {

  if ($("#tempIcon").html() == "°F") {

    var tempIcon = "°C";
    var temp = Math.round(($("#temp").attr("title")) - 273.15);

    $("#temp").html(temp);
    $("#tempIcon").html(tempIcon);
    $(".farenheit").css({
      "background-color": "#535F6B",
      "color": "gray"
    });
    $(".celcius").css({
      "background-color": "#000080",
      "color": "white"
    });
  }
});

$(".farenheit").on("click", function() {
  if ($("#tempIcon").html() == "°C") {
    var tempIcon = "°F";
    var temp = Math.round(($("#temp").attr("title") * 1.8) - 459.67);

    $("#temp").html(temp);
    $("#tempIcon").html(tempIcon);
    $(".farenheit").css({
      "background-color": "#000080",
      "color": "white"
    });
    $(".celcius").css({
      "background-color": "#535F6B",
      "color": "gray"
    });
  }
});

$(".fa-close").on("click",function(){
  $(".modalClick").attr({"class":"btn btn-secondary modalClick","id": "unclicked" , "href":"#modal-close"});
  
$(".modalClick").html("Extra Info"); 
});


$(".modalClick").on("click",function() {

  if ($(".modalClick").attr("id") == "unclicked") {
    $(".modalClick").attr({"class":"btn btn-secondary modalClick","id": "clicked","title": "Close" , "href":"#open-modal"});
     $(".modalClick").html("Close");                     
                         
   

  } else if ($(".modalClick").attr("id") == "clicked") {
 $(".modalClick").attr({"class":"btn btn-secondary modalClick","id": "unclicked" , "href":"#modal-close"});
$(".modalClick").html("Extra Info"); 
  }
});