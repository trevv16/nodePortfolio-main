var currDate;
var currTime;
var dayNite = "";


$(document).ready(function () {

  window.setInterval(timeClock, 100);


});


function timeClock()
{
  var myDate = $("#date");
  var myTime = $("#time");
  var dayType = $("#dayType");


  getTime();
  myDate.text(currDate);
  myTime.text(currTime);
  dayType.text(dayNite);


}

function getTime() {

  //Gets date object
  var dt = new Date();

  //Sets date variable
  var days = dt.getDay();

  //Converts weekday int to string representation
  switch (days) {
    case 0:
      weekDay = "Sunday";
      break;

    case 1:
      weekDay = "Monday";
      break;

    case 2:
      weekDay = "Tuesday";
      break;

    case 3:
      weekDay = "Wednesday";
      break;

    case 4:
      weekDay = "Thursday";
      break;

    case 5:
      weekDay = "Friday";
      break;

    case 6:
      weekDay = "Saturday";
      break;

    default:
      weekDay = dt.getDay();
      break;

  }

  //Sets month variable
  var month = "";

  //Converts month int to string representation
  switch (dt.getMonth()) {
    case 1:
      month = "January";
      break;

    case 2:
      month = "February";
      break;

    case 3:
      month = "March";
      break;

    case 4:
      month = "April";
      break;

    case 5:
      month = "May";
      break;

    case 6:
      month = "June";
      break;

    case 7:
      month = "July";
      break;

    case 8:
      month = "August";
      break;

    case 9:
      month = "September";
      break;

    case 10:
      month = "October";
      break;

    case 11:
      month = "November";
      break;

    case 12:
      month = "December";
      break;

    default:
      month = dt.getMonth();
      break;
  } //End of switch


  //Sets date and year variables
  var day = dt.getDate();

  //Ensures two digit integers
  if (day < 10)  day = '0'+day;


  var year = dt.getFullYear();

  //Creates date string
  currDate = weekDay + " " + month + " " + day + ", " + year;



  //Sets time variables
  var hours = dt.getHours();

  //Ensures two digit integers
  if (hours < 10)  hours = '0'+hours;

  //Ensures 12 hour clock
  if (hours >= 12){

    dayNite = "PM"

  }
  else if (hours > 12) {
    hours = hours - 12;
  }
  else {

    dayNite = "AM"
  }


  var min = dt.getMinutes();

  //Ensures two digit integers
  if (min < 10)  min = '0'+min;

  var sec = dt.getSeconds();

  //Ensures two digit integers
  if (sec < 10)  sec = '0'+sec;

  //Creates time string
  currTime = hours + ":" + min + ":" + sec;

  }; //End getTime()