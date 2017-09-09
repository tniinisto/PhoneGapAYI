
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";


function getEvents(teamid) {

    $.ajax({type: "POST",
    url: serviceURL + 'events.php',
    dataType : 'json',
    data: {'teamid': teamid},

        success:function(result){

            //Populate eventsPage, check if > 0
            if(result.items != 0)
                if(result.items.lenght > 0) {
                    alert("jess");
                }
        },

        error: function () {
            alert("error");
        }

    });

}
