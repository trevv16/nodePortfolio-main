var previousCalc = 0;
var calc = "";

$(document).ready(function() {


  var calcScreen = $("#txtNumber");

  //Number button selectors
  var btn1 = $("#1");
  var btn2 = $("#2");
  var btn3 = $("#3");
  var btn4 = $("#4");
  var btn5 = $("#5");
  var btn6 = $("#6");
  var btn7 = $("#7");
  var btn8 = $("#8");
  var btn9 = $("#9");
  var btn0 = $("#0");
  var deciBtn = $("#deci");



  //Func button selectors
  var addBtn = $("#add");
  var subBtn = $("#sub");
  var multiBtn = $("#multi");
  var divBtn = $("#divide");
  var clearBtn = $("#clear");
  var calcBtn = $("#calculate");
  var pmBtn = $("#pm");
  var percentBtn = $("#percent");


  // Num buttons event handlers
  btn1.click(function () {
    calcScreen.val(parseFloat(calcScreen.val() + btn1.val()));

  });

  btn2.click(function () {
    calcScreen.val(parseFloat(calcScreen.val() + btn2.val()));

  });

  btn3.click(function () {
    calcScreen.val(parseFloat(calcScreen.val() + btn3.val()));

  });

  btn4.click(function () {
    calcScreen.val(parseFloat(calcScreen.val() + btn4.val()));

  });

  btn5.click(function () {
    calcScreen.val(parseFloat(calcScreen.val() + btn5.val()));

  });

  btn6.click(function () {
    calcScreen.val(parseFloat(calcScreen.val() + btn6.val()));

  });

  btn7.click(function () {
    calcScreen.val(parseFloat(calcScreen.val() + btn7.val()));

  });

  btn8.click(function () {
    calcScreen.val(parseFloat(calcScreen.val() + btn8.val()));

  });

  btn9.click(function () {
    calcScreen.val(parseFloat(calcScreen.val() + btn9.val()));

  });

  btn0.click(function () {
    calcScreen.val(parseFloat(calcScreen.val() + btn0.val()));

  });

  deciBtn.click(function () {
    calcScreen.val(parseFloat(calcScreen.val()) + deciBtn.val());

  });




  // Func button event handlers
  addBtn.click(function () {
    calc = "add";
    previousCalc = parseFloat(calcScreen.val());
    calcScreen.val("");

  });

  subBtn.click(function () {
    calc = "sub";
    previousCalc = parseFloat(calcScreen.val());
    calcScreen.val("");
  });

  divBtn.click(function () {
    calc = "divide";
    previousCalc = parseFloat(calcScreen.val());
    calcScreen.val("");
  });

  multiBtn.click(function () {
    calc = "multi";
    previousCalc = parseFloat(calcScreen.val());
    calcScreen.val("");
  });

  clearBtn.click(function () {
    clear();
  });

  calcBtn.click(function () {
    math();
  });

  pmBtn.click(function () {
    calcScreen.val(parseFloat(calcScreen.val() * (-1)));
  });

  percentBtn.click(function () {
    calcScreen.val(parseFloat((calcScreen.val()/100.00)));
  });
});



function clear() {

  $("txtNumber").val("");

  previousCalc = 0;
  calc = "";
  answer = 0;
}

function math() {
  var answer = 0;

  switch (calc) {
    case "add":
      answer = previousCalc + parseFloat($("#txtNumber").val());
      break;

    case "sub":
      answer = previousCalc - parseFloat($("#txtNumber").val());
      break;

    case "multi":
      answer = previousCalc * parseFloat($("#txtNumber").val());
      break;

    case "divide":
      answer = previousCalc / parseFloat($("#txtNumber").val());
      break;

    default:
      $("#txtNumber").val("Error");
      break;
  }

  if(answer / answer.toFixed() == 0) {
    $("#txtNumber").val(answer.toFixed(2));
  }
  else {
    $("#txtNumber").val(answer);
  }

  previousCalc = 0;
  calc = "";
}