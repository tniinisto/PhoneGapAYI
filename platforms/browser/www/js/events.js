
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";


function getEvents(teamid) {

    $.ajax({type: "POST",
    url: serviceURL + 'events.php',
    dataType : 'json',
    data: {'teamid': teamid},

        success:function(result){


            //Calculate participants who have marked in for it and create table per event///////////////////////////
            //Max length set to 100 events ! ///////////////////////////////////////////////////////////////////////
            var areyouin = Create2DArray(500); //Areyouin [eventID, participants in, participants invited]
            var i = 0;
            var init = 0;
            var event = 0;
            var participants = 0;

            $.each(result, function (key, data) {
                //console.log(key)

                $.each(data, function (index, data) {
                    //console.warn('result: ', data.teamName + ' ' + data.Events_eventID + ' ' + data.name)     

                    if(init == 0) {
                        init++;
                        event = parseInt(data.Events_eventID);
                    }

                    if(event == parseInt(data.Events_eventID)) {
                        participants++;
                        areyouin[i][0] = event;
                        areyouin[i][1] += parseInt(data.areyouin);                        
                  }
                    else {
                        areyouin[i][2] = participants; 
                        participants = 1;
                        event = parseInt(data.Events_eventID);

                        i++;
                        areyouin[i][0] = event;
                        areyouin[i][1] += parseInt(data.areyouin);
                    }
                })

                //Last event's invited participant count
                areyouin[i][2] += participants;
                
            })
            //Event data end////////////////////////////////////////////////////////////////////////////////////////

            console.warn('areyouin: ', areyouin)


            //Create events on ui //////////////////////////////////////////////////////////////////////////////////
            i = 0;
            while( areyouin[i][0] != 0 ) {
                
                $("#event_content_id" ).append(
                
                //Event div
                "<div id='Event_" + areyouin[i][1]  + "'>"


                    //Rigth panel///////////////////////////////////////////////////////////////////////////////////
                    + "<div style='width: 70%;' data-role='panel' id='eventPanel" + areyouin[i][1]  + "'data-position='right' data-position-fixed='true' data-display='overlay' class='ui-panel ui-panel-position-right ui-panel-display-overlay ui-panel-closed ui-body-b ui-panel-animate'>"
                        + "<h2>participants on event: " + areyouin[i][1] + "</h2>"
                        + "<p>You can close the panel by clicking outside the panel, pressing the Esc key or by swiping.</p>"
                    + "</div>"

                    //Event main view///////////////////////////////////////////////////////////////////////////////
                    + "<div data-role='header' style='height:auto; width: auto; margin-bottom: 5px; margin-top: 5px;'>"
                        + "<h1>Event Status: 0/9</h1>"
                        + "<h1>Event Location</h1>"
                        + "<h1>Event date</h1>"
                        + "<h1>Event from - to time</h1>"
                        + "<h1><img width='40' height='40' src='https://r-youin.com/images/1400431068_iceman.jpg'> Tupu</h1>"

                        + "<div data-role='button' class='ui-content')>"
                        +  "<a style='width:150px; height: 20px;' class='ui-btn ui-btn-inline ui-corner-all ui-shadow' href=#eventPanel" + areyouin[i][1] + ">See participants</a>"
                        + "</div>"

                    + "</div>"
                ).enhanceWithin();
                
                i++;                    

            }

            //Create events on ui //////////////////////////////////////////////////////////////////////////////////

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
        for (j=0;j<3;j++) {
         f[i][j]=0;
        }
    }

    return f;
  }

//   function showPanel (panel) {
        
//     $( panel ).on( 'click', panel, function () {
    
//         console.warn('onclick: ', panel)

//     });
  
// }
