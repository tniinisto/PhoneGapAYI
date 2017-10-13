
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";


function getComments() {

    $.ajax({type: "POST",
    url: serviceURL + 'comments.php',
    dataType : 'json',
    data: {'teamid': sessionStorage['teamID']},

        success:function(result) {

            $.each(result, function (key, data) {
                
                $("#areyouin-chat-page" ).append(

                    "<h1> Hello hello </h1>"

                ).enhanceWithin();

            });
            
            
        },
        
        error: function () {
            alert("comments error"); 
        }

    });

}
