$(document).ready(function() {

    showLife();

    // Show Life Div
    $("#life-btn").click(function() {
        hide();
        showLife();
    });

    // Show Education Div
    $("#ed-btn").click(function() {
        hide();
        showEducation();
    });

    // Show Experience Div
    $("#ex-btn").click(function() {
        hide();
        showExperience();
    });


    // Function to show life div and hide others
    function showLife() {
        hide();
        $("#life").css({ display: "block" });

        //Highlight active title
        $("#life-btn li").css({ "color": "#EE6C4D" });
    }

    // Function to show education div and hide others
    function showEducation() {
        hide();
        $("#education").css({ display: "block" });

        //Highlight active title
        $("#ed-btn li").css({ "color": "#EE6C4D" });
    }

    // Function to show experience div and hide others
    function showExperience() {
        hide();
        $("#experience").css({ display: "block" });

        //Highlight active title
        $("#ex-btn li").css({ "color": "#EE6C4D" });
    }

    function hide() {
        $("#experience").css({ display: "none" });
        $("#life").css({ display: "none" });
        $("#education").css({ display: "none" });

        //Defaults the color of the selction buttons
        $("#life-btn li").css({ "color": "white" });
        $("#ed-btn li").css({ "color": "white" });
        $("#ex-btn li").css({ "color": "white" });
    }


});