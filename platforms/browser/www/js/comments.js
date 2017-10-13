
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";


function getComments() {

    $.ajax({type: "POST",
    url: serviceURL + 'comments.php',
    dataType : 'json',
    data: {'teamid': sessionStorage['teamID']},

        success:function(result) {



            //$.each(result, function (key, data) {

            $("#areyouin-chat-page" ).append("<div id='comments' style='padding: 10px;'> <ul data-role='listview' data-inset='true'>"

                // var i = 0;

                // while(i < 21) {                

                    // $("#areyouin-chat-page" ).append(
                        + "<li>"
                            + "<img src='images/chat-icon.png'>"
                            + "<h2>Broken Bells</h2>"
                            + "<p>Broken Bells</p></a>"
                        + "</li>"
                    // ).enhanceWithin();
                    + "</ul></div>"
                    // i++;
                    
                // }
            ).enhanceWithin();

            // $("#areyouin-chat-page" ).append("</ul></div>").enhanceWithin();

        },

        error: function () {
            alert("comments error"); 
        }

    });

}
