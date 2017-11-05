
var serviceURL = "https://r-youin.com/pgmobile/services/";


function getEvents(teamid, afterlogin=0) {

    $.ajax({type: "POST",
    url: serviceURL + 'getChart.php',
    dataType : 'json',
    data: {'teamid': sessionStorage['teamID'], 'playerid': sessionStorage['playerID']},

        success:function(result){

        },

        error: function () {
            alert("error"); 
        }

    });

}
