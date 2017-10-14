
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";


function getComments() {

    $.ajax({type: "POST",
    url: serviceURL + 'comments.php',
    dataType : 'json',
    data: {'teamid': sessionStorage['teamID']},

        success:function(result) {



            //Clear #areyouin-chat-page div contents
            $("comments").html("");

            $("#areyouin-chat-page" ).append("<div id='comments' style='padding: 10px;'> <ul data-role='listview' data-inset='true'>");

            $.each(result, function (key, data) {
               
                $.each(data, function (index, data) {

                //var i = 0;
                //while(i < 20) {                

                //$.each(result, function (key, data) {

                    //var photo = result.items[i].photourl;

                    $("#areyouin-chat-page" ).append(
                        "<li>"
                            + "<img src='https://r-youin.com/images/" + data.photourl + "'>"
                            + "<h2>Broken Bells</h2>"
                            + "<p>Broken Bells</p></a>"
                        + "</li>"
                    )

                    //i++;                    

                });
            });
            
            $("#areyouin-chat-page" ).append("</ul></div>").enhanceWithin();

        },

        error: function () {
            alert("comments error"); 
        }

    });

}
