
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";


function getEvents(teamid, afterlogin=0) {

    $.ajax({type: "POST",
    url: serviceURL + 'events.php',
    dataType : 'json',
    data: {'teamid': teamid},

        success:function(result){

            //Clear #event_content_id div contents
            $("#event_content_id").html("");

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
                        areyouin[i][3] = data.location;
                        areyouin[i][4] = data.startTime;
                        areyouin[i][5] = data.endTime;
                        areyouin[i][7] = data.private;
                        areyouin[i][8] = data.pos;
                        if(data.playerid == sessionStorage['playerID']) {
                            areyouin[i][6] = data.EventPlayerID;
                            areyouin[i][7] = 2;
                        }               
                  }
                    else {
                        areyouin[i][2] = participants; 
                        participants = 1;
                        event = parseInt(data.Events_eventID);

                        i++;
                        areyouin[i][0] = event;
                        areyouin[i][1] += parseInt(data.areyouin);
                        areyouin[i][3] = data.location;
                        areyouin[i][4] = data.startTime;
                        areyouin[i][5] = data.endTime;
                        areyouin[i][7] = data.private;
                        areyouin[i][8] = data.pos;
                        if(data.playerid == sessionStorage['playerID']) {
                            areyouin[i][6] = data.EventPlayerID;
                            areyouin[i][7] = 2;
                        }     
                    }
                })

                //Last event's invited participant count                
                areyouin[i][2] += participants;
                
            })
            //Event data end////////////////////////////////////////////////////////////////////////////////////////

            //console.warn('areyouin: ', areyouin)


            //Create events on ui //////////////////////////////////////////////////////////////////////////////////
            i = 0;
            j= 0;
            invited = 0;
            eventcount = 0;
            participant_list = '';
            count = 1;

            //Check if there are no events scheduled
            if(areyouin[0][0] == 0) {

                $("#event_content_id" ).append(

                    "<div style='text-align:center; padding-bottom: 2em; margin-top: 1em; background: #39414b; height: auto; padding-top: 1em;'>"
                    
                        + "<h1 style='font-size: 100%;' id='eventstatus_0' style='background: #39414b; margin-top: -15px;'>No events scheduled at the moment...</h1>"
                                                    
                    + "</div>"  
                
                ).enhanceWithin();

            } else

            {

                while( areyouin[i][0] != 0 ) {
    
                    //Save private event info to variable to show
                    var private_info = ''
                    if(areyouin[i][7] == 1 || areyouin[i][7] == 2)
                        private_info = "<span style='font-size: 50%; text-transform: none;'>private</span>";
                    else    
                        private_info = '';

                    //Show private event only for invited users => 0 = public event, 2 = private event and user is invited, show always for admins and registrar
                    if(areyouin[i][7] == 0 || areyouin[i][7] == 2 || areyouin[i][6] != 0 || sessionStorage['admin'] == 1 || sessionStorage['registrar'] == 1) {

                        //List all event participants, except the logged in user
                        invited += areyouin[i][2];
                        while( j < invited ) {

                            in_out = 'OUT'
                            if(result.items[j].areyouin == 1)                    
                                in_out = 'IN'
                            
                            if(result.items[j].seen == 1) {//Show yellow border if user has seen it

                                if(result.items[j].playerid != sessionStorage['playerID'] && result.items[j].Events_eventID == areyouin[i][0])
                                participant_list += "<div style='margin-bottom: -5px;'><img class='seen' style='display:inline-block; vertical-align:middle;' width='30' height='30' src='https://r-youin.com/images/" + result.items[j].photourl + "'>&nbsp &nbsp" + result.items[j].name + "&nbsp<div style='color:#22aadd; font-size: 100%; display:inline-block; width:20%; text-align:center; float: right; padding-right: 1em; padding-top: 1em; font-weight: bold;'>" + in_out + "</div></div>";
                            }
                            else {
                                if(result.items[j].playerid != sessionStorage['playerID'] && result.items[j].Events_eventID == areyouin[i][0])
                                    participant_list += "<div style='margin-bottom: -5px;'><img class='unseen' style='display:inline-block; vertical-align:middle;' width='30' height='30' src='https://r-youin.com/images/" + result.items[j].photourl + "'>&nbsp &nbsp" + result.items[j].name + "&nbsp<div style='color:#22aadd; font-size: 100%; display:inline-block; width:20%; text-align:center; float: right; padding-right: 1em; padding-top: 1em; font-weight: bold;'>" + in_out + "</div></div>";                           
                            }
                            
                            j++;
                        }

                        if( areyouin[i][3].indexOf('No location set') < 0) { //Location set////////////////////////

                            $("#event_content_id" ).append(
                                
                            //Event div
                            "<div style='margin-top: 20px; margin-bottom: 40px;' id='Event_" + areyouin[i][0]  + "'>"


                                //Rigth panel///////////////////////////////////////////////////////////////////////////////////
                                + "<div style='width: 250px;' data-role='panel' id='eventPanel" + areyouin[i][0]  + "'data-position='right' data-position-fixed='true' data-display='overlay' class='ui-panel ui-panel-position-right ui-panel-display-overlay ui-panel-closed ui-body-b ui-panel-animate'>"
                                    + "<h2 style='padding-bottom: 1em; text-align: center;'>Event participants</h2>"
                                    + "<div>" + participant_list + "</div>"                         
                                + "</div>"

                                //Event main view///////////////////////////////////////////////////////////////////////////////
                                + "<div data-role='header' style='background: none; height:auto; width: auto; margin-bottom: 5px; margin-top: 5px; border-color: #252525;'>"
                                    
                                    + "<div style='text-align:center; padding-bottom: 1em; margin-top: 1em; background: #252525; height: auto; '>"

                                        + "<h1 id='eventstatus_" + areyouin[i][0] + "' style='background: linear-gradient(-90deg, #39414b, #90add2); font-size: 170%; margin-top: -10px; /*color: #CEB425;*/'>" + private_info + " Event #" + count + " status: " + areyouin[i][1] + " / " + areyouin[i][2] +  "</h1>"
                                        + "<h1 style='font-size: 130%; margin-bottom: -20px; margin-top: 10px;'>On " + getWeekday(areyouin[i][4]) + "</h1>" 
                                        + "<h1 style='font-size: 120%;'>From " + getFromToTime(areyouin[i][4], areyouin[i][5]) + "</h1>"

                                        //Location div                                    
                                        + "<div style='margin-top: -5px;' data-role='content'>"
                                            + "<h1 style='font-size: 100%; maring-top: 15px; margin-bottom: -10px; display: inline-block;'>At " + areyouin[i][3] + " </h1>"
                                            + "<a id='modal_map' href='#areyouin-map-page' data-transition='flip' data-shadow='false' style='margin-left: 5px;'>"
                                                + "<img style='vertical-align: middle; margin-left: 5px; margin-top: 5px; ' src='images/GoogleMapsIcon.png' alt='maps' height='40' width='40' onclick='initMap(" + areyouin[i][8] + "," + areyouin[i][9] + ")'>"
                                            + "</a>"
                                        + "</div>"

                                    + "</div>"    
                                    
                                    + "<div style='padding-top: 0px; background: #39414b; text-align: center; margin-top: -5px;' data-role='button' class='ui-content')>"

                                        + "<div style='text-align:center; padding-bottom: 0em; /*background: #252525;*/ height: 40px;'>"
                                            
                                            //In/Out slider
                                            + displayToggle(areyouin[i][0], areyouin[i][6])

                                        + "</div>"    


                                        + "<a style='width:90%; height: 20px; margin-top: 2em; margin-bottom: -5px;' data-role='button' data-icon='star' class='ui-btn ui-btn-inline ui-corner-all ui-shadow' href=#eventPanel" + areyouin[i][0] + "><img style='display:inline-block; vertical-align:middle; margin-left: -5px; margin-top: -6px; margin-right: 2px;' width='30' height='30' src='js/images/group_icon.png'> See participants </a>"
                                    + "</div>"

                                    //+ "<div style='padding-bottom: 1px;  background: #39414b; height: 1px;'</di>"

                                + "</div>"
                            ).enhanceWithin();

                        } else { //No location set ///////////////////////////

                            
                            $("#event_content_id" ).append(
                                
                            //Event div
                            "<div style='margin-top: 20px; margin-bottom: 40px;' id='Event_" + areyouin[i][0]  + "'>"


                                //Rigth panel///////////////////////////////////////////////////////////////////////////////////
                                + "<div style='width: 250px;' data-role='panel' id='eventPanel" + areyouin[i][0]  + "'data-position='right' data-position-fixed='true' data-display='overlay' class='ui-panel ui-panel-position-right ui-panel-display-overlay ui-panel-closed ui-body-b ui-panel-animate'>"
                                    + "<h2 style='padding-bottom: 1em; text-align: center;'>Event participants</h2>"
                                    + "<div>" + participant_list + "</div>"                         
                                + "</div>"

                                //Event main view///////////////////////////////////////////////////////////////////////////////
                                + "<div data-role='header' style='background: none; height:auto; width: auto; margin-bottom: 5px; margin-top: 5px; border-color: #252525;'>"
                                    
                                    + "<div style='text-align:center; padding-bottom: 1em; margin-top: 1em; background: #252525; height: auto;'>"

                                        + "<h1 id='eventstatus_" + areyouin[i][0] + "' style='background: linear-gradient(-90deg, #39414b, #90add2); font-size: 170%; margin-top: -10px; /*color: #CEB425;*/'>" + private_info + " Event #" + count + " status: " + areyouin[i][1] + " / " + areyouin[i][2] +  "</h1>"
                                        + "<h1 style='font-size: 130%; margin-bottom: -20px; margin-top: 10px;'>On " + getWeekday(areyouin[i][4]) + "</h1>" 
                                        + "<h1 style='font-size: 120%;'>From " + getFromToTime(areyouin[i][4], areyouin[i][5]) + "</h1>"

                                        //Location div                                    
                                        + "<div data-role='content'>"
                                            + "<h1 style='font-size: 100%; margin-bottom: -10px; margin-top: -15px; display: inline-block;'>" + areyouin[i][3] + " </h1>"
                                            //+ "<a id='modal_map' href='#areyouin-map-page' data-transition='flip' data-shadow='false' style='margin-left: 5px;'>"
                                                //+ "<img style='vertical-align: middle; margin-left: 15px' src='images/GoogleMapsIcon.png' alt='maps' height='40' width='40' onclick='initMap(" + areyouin[i][8] + "," + areyouin[i][9] + ")'>"
                                            //+ "</a>"
                                        + "</div>"

                                    + "</div>"    
                                    
                                    + "<div style='padding-top: 0px; background: #39414b; text-align: center; margin-top: -5px;' data-role='button' class='ui-content')>"

                                        + "<div style='text-align:center; padding-bottom: 0em; /*background: #252525;*/ height: 40px;'>"
                                            
                                            //In/Out slider
                                            + displayToggle(areyouin[i][0], areyouin[i][6])

                                        + "</div>"    


                                        + "<a style='width:90%; height: 20px; margin-top: 2em; margin-bottom: -5px;' class='ui-btn ui-btn-inline ui-corner-all ui-shadow' href=#eventPanel" + areyouin[i][0] + "><img style='display:inline-block; vertical-align:middle; margin-left: -5px; margin-top: -6px; margin-right: 2px;' width='30' height='30' src='js/images/group_icon.png'> See participants </a>"
                                    + "</div>"

                                    //+ "<div style='padding-bottom: 1px;  background: #39414b; height: 1px;'</di>"

                                + "</div>"
                            ).enhanceWithin();

                        }   

                        //Set that user has seen the event
                        updateUserSeen(areyouin[i][6]);
                    }

                    participant_list = '';
                    i++;                  
                    count++;
                }

                //Set users in/out value per event
                sliderValues(result);
            
            } //If else branch there are events

            //Create events on ui //////////////////////////////////////////////////////////////////////////////////


            //Start event changes polling if coming from login, otherwise waitForEventUpdate calls itself automatically
            if(afterlogin == 1)
                waitForEventUpdate('1900-01-01 10:10:10');

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
        for (j=0;j<10;j++) {
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

//Get day format for From part of event info
function getWeekday(datetime) {

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date(datetime);
    var dayName = days[d.getDay()];

    //Date
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();

    //Time
    var start = new Date(datetime);
    //var start_time = ((start.getHours() < 10) ? '0' + start.getHours() : start.getHours()) + ":" + ((start.getMinutes() < 10) ? '0' + start.getMinutes() : start.getMinutes());

    var result = dayName + " " + day + "." + month + "." + year;

    return result;
}

//Get time format fot event inf0
function getFromToTime(from, to) {

    //From
    var start = new Date(from);
    var start_time = ((start.getHours() < 10) ? '0' + start.getHours() : start.getHours()) + ":" + ((start.getMinutes() < 10) ? '0' + start.getMinutes() : start.getMinutes());

    //To
    var end = new Date(to);

    //Check if event end is on the same day
    if(start.getDate() == end.getDate())
        var end_time = ((end.getHours() < 10) ? '0' + end.getHours() : end.getHours()) + ":" + ((end.getMinutes() < 10) ? '0' + end.getMinutes() : end.getMinutes());
    else {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date(to);
        var dayName = days[d.getDay()];

        var end_time = dayName + ' ' + (end.getDate() < 10 ? '0' + end.getDate() : end.getDate())  + "." + ((end.getMonth() + 1 < 10) ? '0' + (end.getMonth() + 1) : (end.getMonth() + 1)) + " " +  ((end.getHours() < 10) ? '0' + end.getHours() : end.getHours()) + ":" + ((end.getMinutes() < 10) ? '0' + end.getMinutes() : end.getMinutes());
    }

    var time = start_time + " to " + end_time;

    return time;
}

//Update AYI status to db and refresh the events status text and update events last update time
function updateAYI(eventplayerid, toggleValue) {

    //console.warn('updateAYI clicked: ', ayi, ' toggle value: ', toggleValue);

    var state = $("#sliderid_" + toggleValue).val();
    //console.warn('updateAYI value: ',state);

    var areyouin = 0;
    if(state == 'in')
        areyouin = 1;


    //AJAX
    $.ajax({type: "POST",
    url: serviceURL + 'updateAYI.php',
    dataType : 'json',
    data: {'eventplayerid': eventplayerid, 'ayi': areyouin, 'playerid': sessionStorage['playerID'], 'teamid': sessionStorage['teamID'], 'timezone': sessionStorage['timezone'] },
    
        success:function(result) {
            //console.warn('updateAYI success');

            //Update event status text
            var statustext = $('#eventstatus_' + toggleValue).text();
            var in_position = statustext.indexOf(":");
            in_position = in_position + 2
            
            if(state == 'in') {
                var in_value = parseInt(statustext[in_position]);
                in_value++;
                //statustext[in_position] = in_value;
                //statustext.replaceAt(in_position, in_value.toString());
                statustext = statustext.substr(0, in_position - 1) + ' ' + in_value.toString() + statustext.substr(in_position + 1);

                $('#eventstatus_' + toggleValue).text(statustext);
                
            } else {
                var in_value = parseInt(statustext[in_position]);
                in_value--;
                //statustext[in_position] = in_value;
                //statustext.replaceAt(in_position, in_value.toString());
                statustext = statustext.substr(0, in_position - 1) + ' ' + in_value.toString() + statustext.substr(in_position + 1);

                $('#eventstatus_' + toggleValue).text(statustext);                
            }

            

        },

        error: function () {
            console.warn('updateAYI error');
        }           

    });


}

//Update User's seen status db 
function updateUserSeen(eventplayerid) {
    
        //console.warn('updateUserSeen());
    
        //AJAX
        $.ajax({type: "POST",
        url: serviceURL + 'updateUserSeen.php',
        dataType : 'json',
        data: {'eventplayerid': eventplayerid},
    
            success:function(result) {
                //console.warn('updateUserSeen success');            
    
            },
    
            error: function () {
                console.warn('updateUserSeen error');
            }           
    
        });
    
    
    }

//Display toggle only if invited for the event, admins see all events
function displayToggle(event, eventplayer) {

    //User has not been invited, but is admin
    if((sessionStorage['admin'] == 1 || sessionStorage['registrar'] == 1) && eventplayer == 0) {
     
        return "<form id='eform_" + eventplayer + "' style='display:none; height: 100%; vertical-align:middle; margin-top: 5px;' >"
            + "<select name='slider_" + event + "' id='sliderid_" + event + "' data-role='slider' >"
                + "<option value='out'>out</option>"
                + "<option value='in'>in</option>"
            + "</select>"
        + "</form>"
    }

    //User has been invited -> show toggle
    if(eventplayer != 0) {
        
           return  "<img style='display:inline-block; vertical-align:middle; padding-top: 8px;' width='40' height='40' src='https://r-youin.com/images/" + sessionStorage['photourl'] + "'>"
           
           + "<h2 style='display:inline-block; height: 100%; vertical-align:top; margin-left: 1em; margin-right: 1em; font-size: 100%;'> " + sessionStorage['pname'] + "</h2>"

           + "<form id='eform_" + eventplayer + "' style='display:inline-block; height: 100%; vertical-align:middle; margin-top: 5px;' >"
               + "<select name='slider_" + event + "' id='sliderid_" + event + "' data-role='slider' onchange='updateAYI(" + eventplayer + ", " + event + ")'>"
                   + "<option value='out'>out</option>"
                   + "<option value='in'>in</option>"
               + "</select>"
           + "</form>"
       }


}



//var eventparameter = "1900-01-01 10:10:10";
//sessionStorage['firstTimeEvent'] = 1; //This is set on login to 1

//Event change checking
function waitForEventUpdate(eventparameter) {

    $.ajax({
        type: "GET",
        //url: "getChat.php?timestamp=" + parameter,
        url: serviceURL + "eventCheck.php",
        data: { timestamp: JSON.stringify(eventparameter), timezone: JSON.stringify( sessionStorage['timezone']), teamid: JSON.stringify( sessionStorage['teamID']), playerid: JSON.stringify( sessionStorage['playerID']) },
        async: true,
        cache: false,
        //timeout: 40000,
        //dataType: 'json',
        //processData: false,
        success: function (data) {
            var json = eval('(' + data + ')');

            //Testing
            //if (json['timestamp'] != "") {
            //    //alert("jep: " + json['msg']);
            //alert("success param timestamp: " + timestamp);
            //alert("success timestamp: " + json['timestamp']);
            //}

            //Get events only if php not timed out...
            if (json['timeout'] == 0) {
                //alert("success timeout did not happen: " + json['timeout']);
                
                eventparameter = json['timestamp'];
                //getEventsAsync(0);
               
                //Show notifications after first eventCheck and if another player has done something
                if (sessionStorage['firstTimeEvent'] == 0 && sessionStorage['playerID'] != json['playerid']) {

                    //$.getScript("notification.js", function() {});
                    giveNotification();
                    getEvents(sessionStorage['teamID']);

                    //Notify on desktop
                    // var theTitle = 'Event changed';
                    // var theBody = 'An event status has changed in ' + sessionStorage['teamName'];
                    // notifyMe(theTitle, theBody);

                    sessionStorage['firstTimeEvent'] = 0;
                }
                else
                    sessionStorage['firstTimeEvent'] = 0;
            }
            else {
                eventparameter = json['timestamp'];
                sessionStorage['firstTimeEvent'] = 0;
            }

            //alert("success timeout happened: " + json['timeout']);
            //setTimeout('waitForEventUpdate(' + eventparameter + ')', 15000); //15s
            waitForEventUpdate(eventparameter);
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("error: " + textStatus + " (" + errorThrown + ")");
            //setTimeout('waitForEventUpdate(' + eventparameter + ')', 15000);
            waitForEventUpdate(eventparameter);
        }
    });
            
}



function initMap(lat, lon) {

    setTimeout(function() {
        
        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(lat, lon),
            mapTypeId: 'roadmap'
        }
    
        var map = new google.maps.Map(document.getElementById("map_content_id"), mapOptions);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon), 
            map: map
        });

        $("#map_content_id_button").html("");
        $("#map_content_id_button" ).append(
        
        //   + "<br><h1>Position: lat: " + lat + "<br> lon: " +  lon + "</h1>"
            "<a id='backpacker' data-role='button' data-theme='b' data-rel='back' class='ui-link ui-btn ui-btn-b ui-shadow ui-corner-all' role=button>Back</a>"
            
        ).enhanceWithin();

    }, 500);


}

