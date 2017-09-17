
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";


function getEvents(teamid) {

    $.ajax({type: "POST",
    url: serviceURL + 'events.php',
    dataType : 'json',
    data: {'teamid': teamid},

        success:function(result){

            //Populate eventsPage, check if > 0
            // if(result.items != 0)
            //     console.warn(`JESSSS`);

            // $.each($.parseJSON(result), function(i, item) {
            //     alert(result[i].teaName);
            // });

            $.each(result, function (key, data) {
                //console.log(key)
                $.each(data, function (index, data) {
                    console.warn('index', data.teamName + ' ' + data.Events_eventID + ' ' + data.name)

                })
            })

        },

        error: function () {
            alert("error");
        }

    });

}
