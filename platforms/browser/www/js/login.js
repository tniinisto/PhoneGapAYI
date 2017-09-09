
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

								$(':mobile-pagecontainer').pagecontainer('change', '#login-team-selection', {
									transition: 'flip',
									changeHash: false,
									reverse: true,
									showLoadMsg: true
								});

								//Go through the json and populate select items
								var listItems = '';
								
									 for (var i = 0; i < result.items[0].count; i++) {
											listItems += "<option value='" + result.items[i].teamID + "'>" + result.items[i].teamName + "</option>";
										}
								
								$("#select-native-1").html(listItems);

								$('#ayiloginid_label').css("display", "none");
								$('#login_credentials').css("display", "none");								
								$('#login_team_selection').css("display", "block");

								$("#teambutton").click(function(e){
									e.preventDefault();

									//alert("select button clicked");
									$("#logininfo").text(result.items[0].name + ' team ' + $("#select-native-1 option:selected" ).text()); //Login page
									$("#logininfo_e").text(result.items[0].name + ' team ' + $("#select-native-1 option:selected" ).text()); //Events page
									$("#logininfo_c").text(result.items[0].name + ' team ' + $("#select-native-1 option:selected" ).text()); //Chat page

									//Get team's events, check that license is valid
									getEvents( $("#select-native-1 option:selected" ).val() );

									//Shoe events page
									$(':mobile-pagecontainer').pagecontainer('change', '#areyouin-events-page', {
										transition: 'flip',
										changeHash: false,
										reverse: true,
										showLoadMsg: true
									});

								});
							}

							//One team
							else if(result.items[0].count == 1) { 
								$("#logininfo").text(result.items[0].name + ' team ' + result.items[0].teamName); //Login page
								$("#logininfo_e").text(result.items[0].name + ' team ' + result.items[0].teamName); //Events page
								$("#logininfo_c").text(result.items[0].name + ' team ' + result.items[0].teamName); //Chat page

								$('#ayilogin_label').css("display", "none");

								//Get team's events, check that license is valid
								getEvents( result.items[0].teamID );
								
								//Shoe events page
								$(':mobile-pagecontainer').pagecontainer('change', '#areyouin-events-page', {
									transition: 'flip',
									changeHash: false,
									reverse: true,
									showLoadMsg: true
								});								
							}
						},

						error: function () {
							alert("error");
						}			
				});
		}

        });
		

});
