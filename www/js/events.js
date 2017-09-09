var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";


function getEvents(teamid) {

    $.ajax({type: "POST",
    url: serviceURL + 'events.php',
    dataType : 'json',
    data: {'teamid': teamid},

        success:function(result){

            //Populate eventsPage
            if(result.items[0].count > 1) {
                alert("jess");
            }
        },

        error: function () {
            alert("error");
        }

    });

}
