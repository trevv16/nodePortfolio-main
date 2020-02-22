$(document).ready(function () {

    showLife();

    // Show Life Div
    $("#life-btn").click(function () {
        hide();
        showLife();
    });

    // Show Education Div
    $("#ed-btn").click(function () {
        hide();
        showEducation();
    });

    // Show Experience Div
    $("#ex-btn").click(function () {
        hide();
        showExperience();
    });


});


// Function to show life div and hide others
function showLife() {

  $("#life").show();
  $("#education").hide();
  $("#experience").hide();
}

// Function to show education div and hide others
function showEducation() {

  $("#education").show();
  $("#life").hide();
  $("#experience").hide();
}

// Function to show experience div and hide others
function showExperience() {

  $("#experience").show();
  $("#life").hide();
  $("#education").hide();

}

function hide() {

  $("#experience").hide();
  $("#life").hide();
  $("#education").hide();
}
