
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";

function insertComment() {
    
    //console.warn('comment input: ', $('#comment_input').val());

        $.ajax({type: "GET",
        url: serviceURL + 'insertComment.php',
        dataType : 'json',
        data: {'comment': $('#comment_input').val(), 'teamid': sessionStorage['teamID'], 'playerid': sessionStorage['playerID'], 'timezone': sessionStorage['timezone']},

        success:function(result) {

            //&console.warn('areyouin: ', result);
            window.localStorage.setItem("lastseenmsg", result.timestamp);

        },

        error: function () {
            //alert("insert comment error"); 
        }

    });
    
}   

//Form validation
function validateForm() {
    
    if($("#comment_input").val() != '') {

        $('#comment_input').css('border-color', '#1d1d1d');
        insertComment();

        //Add your comment to the list top
        $("#comments_list").prepend(
            "<li style='margin: 2px; background: #39414b'>"
            + "<img style='margin: 8px; width: 50px; height: 50px; display: inline-block;' src='https://r-youin.com/images/" + sessionStorage['photourl'] + "'>"
            + "<p style='font-size: 90%; text-transform: none; color: white; display: inline-block; margin-left: 15px; vertical-align: top; margin-top: 15px; '>Just now...</p>"
            + "<p style='padding-right: 10px; padding-left: 10px; white-space: normal; font-size: 105%; display: inline-block; text-transform: none; color: white;' text-transform: none; white-space: normal;'>"  + $('#comment_input').val() + "</p>"
            + "</li>"
        ).enhanceWithin();

        //Clear comment input
        $('#comment_input').val("");
        
        //Back to comment list page
        $.mobile.back();

    }
    else {

        $('#comment_input').css('border-color', 'red');
    
    }

}

