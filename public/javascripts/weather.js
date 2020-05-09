var api = "https://api.openweathermap.org/data/2.5/";
    var city = "Charlotte";
    var apiKey = "d51036fa5916cd001a52f746d4726cd0";
    var callString = "";
    var date = "";
    var temp = "";
    var icon = "";
    var low_temp = "";
    var high_temp = "";
    var desc = "";
    var sunrise = "";
    var sunset = "";
    var precip = 0;
    var humid = 0;
    var wind = 0;
    var windDir = "";
    var dir = "";
    var sun = "";
    var suntime = "";
    var ampm = "";
  
  $(document).ready(function(){
      
    getWeather();
      
    $("#dataBtn").click(function(){
      
      getWeather();
      
      $("#cityQuery").val("");
    });
    
    $("#cityQuery").keypress(function(event) {
      if (event.keyCode == 13 || event.which == 13) {
          getWeather();
          
          $("#cityQuery").val("");
      }
    });
    
    
    function getWeather() {
      
      
      if($("#cityQuery").val() != ""){
        
        city = $("#cityQuery").val();
        
        if (city.length == 5 && city.match(/^\d{5}(-\d{4})?$/)) {
         
         callString = api + "weather?zip=" + city + ",us&appid=" + apiKey + "&units=imperial";
        }
        else {
           
           callString = api + "weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
        }
        
        console.log(callString);
      }
      else {
        
        callString = api + "weather?q=Charlotte&appid=" + apiKey + "&units=imperial";
      }
      
      
        
      $.getJSON(callString, function(weather){
          
          
          city = weather.name;
          date = getDate();
          temp = (Math.floor(weather.main.temp));
          icon = getIcon(weather.weather[0].icon);
          low_temp = Math.floor(weather.main.temp_min);
          high_temp = Math.floor(weather.main.temp_max);
          desc = weather.weather[0].main;
          sunrise = new Date(weather.sys.sunrise*1000);
          sunset = new Date(weather.sys.sunset*1000);
          getSun();
          precip = "0";
          humid = weather.main.humidity;
          wind = Math.round(weather.wind.speed);
          dir = weather.wind.deg;
          windDir = windDirection(dir);
          
          $("#city").text(city);
          $("#icon").attr("src", icon);
          $("#date").text(date);
          $("#temp").html((temp + "&deg; F").trim());
          $("#low_temp").html(low_temp + "&deg; F");
          $("#high_temp").html(high_temp + "&deg; F");
          $("#desc").text(desc);
          $("#sun").text(sun);
          $("#suntime").text(suntime);
          $("#precipVal").text(precip + "%");
          $("#humidVal").text(humid + "%");
          $("#windVal").text(wind + " MPH " + windDir);
          //$("#windDir").text(windDir);
      });
      
      
    }
    
    
    function getDate() {
          
          var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
          var d = new Date();
          
          var weekday = days[d.getDay()];
          var month = months[d.getMonth()];
  
          var date = d.getDate();
          
          return weekday + ", " + month + " " + date;
           
    }
    
    function getSun() {
        
        var tempSunrise;
        var tempSunset;
        
        tempSunrise = formatTime(sunrise);
        
        tempSunset = formatTime(sunset);
        
    }
    
    function getIcon(icon) {
      var iconApiString;
      
      iconApiString = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      
      return iconApiString;
      
    }
    
    function formatTime(time) {
      
      var shortHR = "";
      
      if(time.getHours() > 12){
        
        shortHR = time.getHours() - 12;
        ampm = "PM";
        
      }
      else {
        
        shortHR = time.getHours();
        ampm = "AM";
      }
      
      if (time.getHours() > 9 && time.getHours() < 20) {
            
            sunset = shortHR + ':' + time.getMinutes() + ' ' + ampm;
            suntime = sunset;
            sun = "Sunset"
        }
        else {
            
            sunrise = shortHR + ':' + time.getMinutes() + ' ' + ampm;
            suntime = sunrise;
            sun = "Sunrise"
        }
    }
    
    function windDirection(degr) {
      
      var degrees = Math.floor((degr/22.5) + 0.5);
      
      var arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
      
      return arr[(degrees % 16)] || "";
    }
    
    
  });