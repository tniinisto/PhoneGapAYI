
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";

var logininfo;

$(window).load(function() {
 	//setTimeout(getLogin, 100);
    
        $("#loginbutton").click(function(e){
            e.preventDefault();

			//Check if id & password have been entered
			if(checkFields()){
			

				$.ajax({type: "POST",
						url: serviceURL + 'login.php',
						dataType : 'json',
						data: {'ayiloginname': $("#ayiloginid").val(), 'ayipassword': $("#ayipassword").val()},

						success:function(result){
							//$("#logininfo").html(result);					
							//alert("successsss");			

							//No teams
							if($.isEmptyObject(result.items)) { 
								//alert("No teams, try login again.");
								$('#ayilogin_label').css("display", "block"); //login failed, please check your credentials
							} else


							//Multiple teams
							if(result.items[0].count > 1) {
								//alert("multiple teams");

								//Go through the json and populate select items
								// var listitems = '';
								// $.each(result.items, function(teamID, teamName){
								// 	listitems += '<option value=' + items.teamID + '>' + items.teamName + '</option>';
								// });
								// $("#select-native-1").append(listitems);
	
								// $($.parseJSON(result)).map(function () {
								// 	return $('<option>').val(this.teamID).text(this.teamName);
								// }).appendTo('#select-native-1');
	
								var listItems = '<option selected="selected" value="0">- Select -</option>';
								
									 for (var i = 0; i < result.items[0].count; i++) {
											listItems += "<option value='" + result.items[i].teamID + "'>" + result.items[i].teamName + "</option>";
										}
								
								$("#select-native-1").html(listItems);

								$('#ayilogin_label').css("display", "none");
								$('#login_credentials').css("display", "none");								
								$('#login_team_selection').css("display", "block");
							}

							//One team
							else if(result.items[0].count == 1) { 
								$("#logininfo").text(result.items[0].name + ' team ' + result.items[0].teamName); //Login page
								$("#logininfo_e").text(result.items[0].name + ' team ' + result.items[0].teamName); //Events page
								$("#logininfo_c").text(result.items[0].name + ' team ' + result.items[0].teamName); //Chat page

								$('#ayilogin_label').css("display", "none");
								changeToEvents();
							}
						},

						error: function () {
							alert("error");
						}			
				});
		}

        });
		

});

// $(document).ajaxError(function(event, request, settings) {
// 	//$('#busy').hide();
// 	alert("Error accessing the server");
// });

// function getLogin() {
//  	$('#busy').show();

// 	$.getJSON(serviceURL + 'login.php', function(data) {
// 		$('#busy').hide();

// 		logininfo = data.items;
// 		$('#logininfo').text(logininfo[0].playerID + ' ' + logininfo[0].teamName);
// 	});
// }

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
