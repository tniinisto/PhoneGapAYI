
var serviceURL = "https://r-youin.com/pgmobile/services/";


function getComments(afterlogin=0) {

    $.ajax({type: "POST",
    url: serviceURL + 'comments.php',
    dataType : 'json',
    data: {'teamid': sessionStorage['teamID']},

        success:function(result) {

            //Clear #areyouin-chat-page div contents
            $("#comments").html("");

            $("#areyouin-chat-page" ).append("<div id='comments' style='padding: 10px;'>").enhanceWithin();

            $.each(result, function (key, data) {
               
                $.each(data, function (index, data) {

                var i = 0;

                //while(i < 20) {                

                //$.each(result, function (key, data) {

                    //var photo = result.items[i].photourl;
                if(i == 0) {
                    $("#comments" ).append(
                        "<ul id='comments_list' data-role='listview' data-inset='true'>"
                        +"<li style='margin: 2px; background: #39414b'>"
                            + "<img style='margin: 8px; width: 50px; height: 50px;' src='https://r-youin.com/images/" + data.photourl + "'>"
                            //+ "<p style='font-size: 90%;'>"  + data.name + "</p>"
                            + "<p style='font-size: 90%; text-transform: none;'>"  + data.name + ' on ' + data.publishTime.toString().substring(0, 16) + "</p>"
                            + "<div style='font-size: 110%; text-transform: none; white-space: normal;'>"  + data.comment + "</div>"
                        + "</li>"
                    ).enhanceWithin();
                } 
                else {
                    $("#comments" ).append(
                        "<li style='margin: 2px; background: #39414b'>"
                            + "<img style='margin: 8px; width: 50px; height: 50px;' src='https://r-youin.com/images/" + data.photourl + "'>"
                            //+ "<p style='font-size: 90%;'>"  + data.name + "</p>"
                            + "<p style='font-size: 90%; text-transform: none;'>"  + data.name + ' on ' + data.publishTime.toString().substring(0, 16) + "</p>"
                            + "<div style='font-size: 110%'; text-transform: none; white-space: normal;'>"  + data.comment + "</div>"
                            + "</li>"
                    ).enhanceWithin();
                }

                i++;                    

                });
            });
            
            $("#areyouin-chat-page" ).append("</ul></div>").enhanceWithin();


            //Set last seen init value once on the first time if key does not exist
            if (localStorage.getItem(sessionStorage['teamID'] + "lastseenmsg") === null)
                window.localStorage.setItem(sessionStorage['teamID'] + "lastseenmsg", result.items[0].publishTime);
            else { //After that check if there are new messages
                if(window.localStorage.getItem(sessionStorage['teamID'] + "lastseenmsg").toString().localeCompare(result.items[0].publishTime.toString()) != 0 && sessionStorage['playerID'] != result.items[0].Players_playerID)
                    msgNotification();

                window.localStorage.setItem(sessionStorage['teamID'] + "lastseenmsg", result.items[0].publishTime);

            }

            //Start polling
            if(afterlogin == 1)
                waitForChat('1900-01-01 10:10:10');

        },

        error: function () {
            //alert("comments error"); 
        }

    });

}

//Chat LongPolling////////////////
// var parameter = null;
// parameter = "1900-01-01 10:10:10";

function waitForChat(parameter){

    
    //if(timestamp != null) {
    //    // Split timestamp into [ Y, M, D, h, m, s ]
    //    //var t = timestamp.split(/[- :]/);
    //    // Apply each element to the Date function
    //    //php_datetime = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
    //    //alert("1: timestamp: " + timestamp + ", formatted: " + php_datetime);
    //    
    //    //timestamp.toString();
    //    //timestamp.replace('%20', "T");
    //    //timestamp = timestamp.split(' ').join('T');
    //    //alert("1: timestamp: " + timestamp);
    //}

    //var param = 'timestamp=' + timestamp;
    
    $.ajax({
        type: "GET",
        //url: "getChat.php?timestamp=" + parameter,
        url: serviceURL + "getChat.php",
        data: { 'timestamp':  JSON.stringify(parameter), 'timezone': sessionStorage['timezone'], 'playerid': sessionStorage['playerID'], 'teamid': sessionStorage['teamID'] },
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
            
            //Get comments only if php not timed out...and latest comment is not from user itself
               
            if(json['timeout'] == 0 && json['player'] != sessionStorage['playerID']) {
    
                //Get the comments
                setTimeout('getComments()', 100);
                
            }

            var parameter1 = json['timestamp'];
            setTimeout("waitForChat(" + JSON.stringify(parameter1) + ")", 15000);
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("error: " + textStatus + " (" + errorThrown + ")");
            setTimeout("waitForChat(" + JSON.stringify(parameter1) + ")", 15000);
        }
    });
            
}
