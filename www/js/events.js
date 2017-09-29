
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
            j= 0;
            invited = 0;
            eventcount = 0;
            participant_list = '';

            while( areyouin[i][0] != 0 ) {
 
                //All event participants, except the logged in user
                invited += areyouin[i][2];
                while( j < invited ) {

                    in_out = 'OUT'
                    if(result.items[j].areyouin == 1)                    
                        in_out = 'IN'
                    
                    if(result.items[j].seen == 1) {//Show yellow border if user has seen it

                        if(result.items[j].playerid != sessionStorage['playerID'] && result.items[j].Events_eventID == areyouin[i][0])
                        participant_list += "<div><img class='seen' style='display:inline-block; vertical-align:middle;' width='40' height='40' src='https://r-youin.com/images/" + result.items[j].photourl + "'>&nbsp" + result.items[j].name + "&nbsp<div style='color:#22aadd; font-size: large; display:inline-block; width:20%; text-align:center; float: right; padding-right: 1em; padding-top: 1em; font-weight: bold;'>" + in_out + "</div></div>";
                    }
                    else {
                        if(result.items[j].playerid != sessionStorage['playerID'] && result.items[j].Events_eventID == areyouin[i][0])
                            participant_list += "<div><img class='unseen' style='display:inline-block; vertical-align:middle;' width='40' height='40' src='https://r-youin.com/images/" + result.items[j].photourl + "'>&nbsp" + result.items[j].name + "&nbsp<div style='color:#22aadd; font-size: large; display:inline-block; width:20%; text-align:center; float: right; padding-right: 1em; padding-top: 1em; font-weight: bold;'>" + in_out + "</div></div>";                           
                    }
                    
                    j++;
                }

                $("#event_content_id" ).append(
                     
                 //Event div
                "<div id='Event_" + areyouin[i][0]  + "'>"


                    //Rigth panel///////////////////////////////////////////////////////////////////////////////////
                    + "<div style='width: 70%;' data-role='panel' id='eventPanel" + areyouin[i][1]  + "'data-position='right' data-position-fixed='true' data-display='overlay' class='ui-panel ui-panel-position-right ui-panel-display-overlay ui-panel-closed ui-body-b ui-panel-animate'>"
                        + "<h2 style='padding-bottom: 1em;'>Event participants</h2>"
                        + "<div>" + participant_list + "</div>"                         
                    + "</div>"

                    //Event main view///////////////////////////////////////////////////////////////////////////////
                    + "<div data-role='header' style='height:auto; width: auto; margin-bottom: 5px; margin-top: 5px;'>"
                        + "<h1>Event Status: 0/9</h1>"
                        + "<h1>Event Location</h1>"
                        + "<h1>Event date</h1>"
                        + "<h1>Event from - to time</h1>"

                        + "<div style='text-align:center; padding-top: 1em; margin-top: 1em;'>"
                            
                            + "<img style='display:inline-block; vertical-align:middle;' width='40' height='40' src='https://r-youin.com/images/" + sessionStorage['photourl'] + "'>"

                            + "<h2 style='display:inline-block; height: 100%; vertical-align:top; margin-left: 1em; margin-right: 1em; font-size: 100%;'> " + sessionStorage['pname'] + "</h2>"

                            //In/Out slider
                            + "<form id='eform_" + areyouin[i][0] + "' style='display:inline-block; height: 100%; vertical-align:middle; margin-top: 5px;'>"
                                + "<select name='slider_" + areyouin[i][0] + "' id='sliderid_" + areyouin[i][0] + "' data-role='slider'>"
                                + "<option value='out'>out</option>"
                                + "<option value='in'>in</option>"
                                + "</select>"
                            + "</form>"

                        + "</div>"    

                        + "<div data-role='button' class='ui-content')>"
                        +  "<a style='width:150px; height: 20px;' class='ui-btn ui-btn-inline ui-corner-all ui-shadow' href=#eventPanel" + areyouin[i][1] + ">See participants</a>"
                        + "</div>"

                    + "</div>"
                ).enhanceWithin();
                
                participant_list = '';
                i++;                    

            }

            //Create events on ui //////////////////////////////////////////////////////////////////////////////////

            //Set users in/out value per event
            sliderValues(result);

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

//Set users in/out value per event
function sliderValues(result) {
    //console.warn('oncreate: ', slider)

    i=0;
    //while( areyouin[i][0] != 0 ) {
    while( i < result.items[0].rowcount ) {        
        //console.warn('oncreate: ', 'sliderid_' + areyouin[i][0]);
        
        if(result.items[i].areyouin == 1 && result.items[i].playerid == sessionStorage['playerID'])
            $("#sliderid_" + result.items[i].Events_eventID).val('in').slider("refresh");

        i++;        
    }

    
}

