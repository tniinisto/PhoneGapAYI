
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";

function insertComment() {
    
    console.warn('comment input: ', $('#comment_input').val());

        $.ajax({type: "GET",
        url: serviceURL + 'insertComment.php',
        dataType : 'json',
        data: {'comment': $('#comment_input').val(), 'teamid': sessionStorage['teamID'], 'playerid': sessionStorage['playerID'], 'timezone': sessionStorage['timezone']},

        success:function(result) {

            console.warn('areyouin: ', result);

        },

        error: function () {
            alert("insert comment error"); 
        }

    });
    
}   


//Form validation
function validateForm() {
    
    if($("#comment_input").val() != '') {

        $('#comment_input').css('border-color', '#1d1d1d');
        insertComment();

    }
    else {

        $('#comment_input').css('border-color', 'red');
    
    }

}

