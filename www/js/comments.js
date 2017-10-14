
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";


function getComments() {

    $.ajax({type: "POST",
    url: serviceURL + 'comments.php',
    dataType : 'json',
    data: {'teamid': sessionStorage['teamID']},

        success:function(result) {



            //Clear #areyouin-chat-page div contents
            $("comments").html("");

            $("#areyouin-chat-page" ).append("<div id='comments' style='padding: 10px;'>").enhanceWithin();

            $.each(result, function (key, data) {
               
                $.each(data, function (index, data) {

                var i = 0;

                //while(i < 20) {                

                //$.each(result, function (key, data) {

                    //var photo = result.items[i].photourl;
                if(i == 0) {
                    $("#comments" ).append(
                        "<ul data-role='listview' data-inset='true'>"
                        +"<li style='margin: 2px; background: #39414b'>"
                            + "<img style='margin: 8px; width: 50px; height: 50px;' src='https://r-youin.com/images/" + data.photourl + "'>"
                            + "<p style='font-size: 90%;'>"  + data.publishTime.toString().substring(0, 16) + "</p></a>"
                            + "<div style='font-size: 105%; text-transform: none; white-space: normal;'>"  + data.comment + "</div>"
                        + "</li>"
                    ).enhanceWithin();
                } 
                else {
                    $("#comments" ).append(
                        "<li style='margin: 2px; background: #39414b'>"
                            + "<img style='margin: 8px; width: 50px; height: 50px;' src='https://r-youin.com/images/" + data.photourl + "'>"
                            + "<p style='font-size: 90%;'>"  + data.publishTime.toString().substring(0, 16) + "</p></a>"
                            + "<div style='font-size: 105%'; text-transform: none; white-space: normal;'>"  + data.comment + "</div>"
                            + "</li>"
                    ).enhanceWithin();
                }

                i++;                    

                });
            });
            
            $("#areyouin-chat-page" ).append("</ul></div>").enhanceWithin();

        },

        error: function () {
            alert("comments error"); 
        }

    });

}
