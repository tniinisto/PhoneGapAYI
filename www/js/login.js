//localStorage['serviceURL'] = "http://coenraets.org/apps/directory/services/";
//var serviceURL = localStorage['serviceURL'];

var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";

//var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var logininfo;

$(window).load(function() {
	setTimeout(getLogin, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').hide();
	alert("Error accessing the server");
});

// function getLogin() {
// 	$('#busy').show();


// 	$.getJSON(serviceURL + 'login.php', function(data) {
// 		$('#busy').hide();

// 		logininfo = data.items;
// 		$('#logininfo').text(logininfo[0].playerID + ' ' + logininfo[0].name);
		
// 		// setTimeout(function(){
// 		// 	scroll.refresh();
// 		// });
// 	});
// }

$("#loginbutton").click(function(){    
        $.ajax({
            url: serviceURL + 'login.php',
            type: "POST",
            data: ({ayiloginid: $("#ayiloginid").text}, {ayipassword: $("#ayipassword").text} ),
            success: function(data){
                // Why were you reloading the page? This is probably your bug
                // location.reload();

                // Replace the content of the clicked paragraph
                // with the result from the ajax call
                $("#login_content").html(data);
            }
        });        
    });