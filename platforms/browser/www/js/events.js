
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";


function getEvents(teamid) {

    $.ajax({type: "POST",
    url: serviceURL + 'events.php',
    dataType : 'json',
    data: {'teamid': teamid},

        success:function(result){


            //Calculate participants who have marked im for it and create table per event///////////////////////////
            //Max length set to 50 ! ///////////////////////////////////////////////////////////////////////////////
            var areyouin = Create2DArray(50);
            var i = 0;
            var init = 0;
            var event = 0;

            $.each(result, function (key, data) {
                //console.log(key)

                $.each(data, function (index, data) {
                    //console.warn('result: ', data.teamName + ' ' + data.Events_eventID + ' ' + data.name)     

                    if(init == 0) {
                        init++;
                        event = parseInt(data.Events_eventID);
                    }

                    if(event == parseInt(data.Events_eventID)) {
                        areyouin[i][0] = event;
                        areyouin[i][1] += parseInt(data.areyouin);
                    }
                    else {
                        event = parseInt(data.Events_eventID);
                        i++;
                        areyouin[i][0] = event;
                        areyouin[i][1] += parseInt(data.areyouin);
                    }
                })
            })

            console.warn('areyouin: ', areyouin)

        },

        error: function () {
            alert("error");
        }

    });

}

function Create2DArray(rows) {

    var f = new Array();      

    for (i=0;i<rows;i++) {
        f[i]=new Array();
        for (j=0;j<2;j++) {
         f[i][j]=0;
        }
    }

    return f;
  }