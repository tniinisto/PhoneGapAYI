
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";

function insertComment() {
    
        $.ajax({type: "GET",
        url: serviceURL + 'insertComment.php',
        dataType : 'json',
        data: {'comment': $('#comment_input').val(), 'teamid': sessionStorage['teamID'], 'playerid': sessionStorage['playerID']},

        success:function(result) {

            //Clear form
            //$("comments").html("");

        },

        error: function () {
            alert("insert comment error"); 
        }

    });
    
}   