
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";


function getEvents(teamid) {

    $.ajax({type: "POST",
    url: serviceURL + 'events.php',
    dataType : 'json',
    data: {'teamid': teamid},

        success:function(result){

            //Populate eventsPage, check if > 0
            if(result.items != 0)
                console.warn(`JESSSS`);
        },

        error: function () {
            alert("error");
        }

    });

}
