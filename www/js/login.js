
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";

var logininfo;

$(window).load(function() {
 	//setTimeout(getLogin, 100);
    
        $("#loginbutton").click(function(e){
            e.preventDefault();

            $.ajax({type: "POST",
                    url: serviceURL + 'login.php',
                    data: {'ayiloginname': $("#ayiloginid").val(), 'ayipassword': $("#ayipassword").val()},

                    success:function(result){
		                $("#logininfo").html(result);
					},

					error: function () {
        				alert("error");
      				}			
			});
        });

});

$(document).ajaxError(function(event, request, settings) {
	//$('#busy').hide();
	alert("Error accessing the server");
});

function getLogin() {
 	$('#busy').show();

	$.getJSON(serviceURL + 'login.php', function(data) {
		$('#busy').hide();

		logininfo = data.items;
		$('#logininfo').text(logininfo[0].playerID + ' ' + logininfo[0].name);
	});
}


// $("#loginbutton").click(function(e){    
// 	e.preventDefault();
	
// 	// $.ajax({
//     //     type: 'POST',
// 	// 	url: 'https://dev-areyouin.azurewebsites.net/pgmobile/services/login.php',
// 	// 	data: ( {ayiloginname: $("#ayiloginid").value} & {ayipassword: $("#ayipassword").value} ),		
// 	// 	success: function(data){

// 	// 		// Replace the content of the clicked paragraph with the result from the ajax call
// 	// 		$("#login_content").html(data);
// 	// 	}
// 	// });        

// var name = $("#ayiloginid").value;
// var password = $("#ayipassword").value;

// 	$.ajax({
//         type: 'POST',
// 		url: 'https://dev-areyouin.azurewebsites.net/pgmobile/services/login.php',
// 		data: { ayiloginname: name, ayipassword: password },		
// 		success: function(data){

// 			// Replace the content of the clicked paragraph with the result from the ajax call
// 			$("#login_content").html(data);

// 		}
// 	});        		
// });

/*
$(function() { // equivalent of "$(document).ready(function(){"
    $('body').on('submit', '#loginform', function(event) {
        event.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type : 'POST',
            url : 'https://dev-areyouin.azurewebsites.net/pgmobile/services/login.php',
            data : formData,
            success : function(data) {
                $('#login_content').text(data);
            }
        });
    });
});
*/
