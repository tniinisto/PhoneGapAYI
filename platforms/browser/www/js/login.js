
var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";

var logininfo;

$(window).load(function() {
    //setTimeout(getLogin, 100);

        if(window.localStorage.length != 0) {
            $("#ayiloginid").val(window.localStorage.getItem("user_id"));
            $("#ayipassword").val(window.localStorage.getItem("user_pass"));
        }
    
        $("#loginbutton").click(function(e){
            e.preventDefault();

            //Check if id & password have been entered
            if(checkFields()){
            
                setTimeout(function(){
                    $.mobile.loading('show');
                },1); 

                $.ajax({type: "POST",
                        url: serviceURL + 'login.php',
                        dataType : 'json',
                        data: {'ayiloginname': $("#ayiloginid").val(), 'ayipassword': $("#ayipassword").val()},

                        success:function(result){
                            //$("#logininfo").html(result);                 
                            //alert("successsss");          

                            setTimeout(function(){
                                $.mobile.loading('hide');
                            },300);
                            
                            //No teams
                            if($.isEmptyObject(result.items)) { 
                                //alert("No teams, try login again.");
                                $('#ayilogin_label').css("display", "block"); //login failed, please check your credentials
                            } else

                           
                            //Save user credentials
                            //localStorage['user_id'] = $("#ayiloginid").val();
                            //localStorage['user_pass'] = $("#ayipassword").val();
                            window.localStorage.setItem("user_id", $("#ayiloginid").val());
                            window.localStorage.setItem("user_pass",  $("#ayipassword").val());
                                                       
                            //Multiple teams
                            if(result.items[0].count > 1) {
                                //alert("multiple teams");

                                $(':mobile-pagecontainer').pagecontainer('change', '#login-team-selection', {
                                    //transition: 'flip',
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

									//Save playerID to session
									sessionStorage['playerID'] =  result.items[0].playerID;
									//Save teamID to session
									sessionStorage['teamID'] =  result.items[$("#select-native-1 option:selected" ).index()].teamID;
									//Save name to session
									sessionStorage['pname'] =  result.items[0].name;
									//Save photourl to session
									sessionStorage['photourl'] =  result.items[0].photourl;
									//Save admin status to session
									sessionStorage['admin'] =  result.items[$("#select-native-1 option:selected" ).index()].teamAdmin;
									//Save registrar status to session
									sessionStorage['registrar'] =  result.items[$("#select-native-1 option:selected" ).index()].registrar;
                                    //Save team's timezone to session
                                    sessionStorage['timezone'] =  result.items[$("#select-native-1 option:selected" ).index()].timezone;
                                																		

                                    //Get team's events TODO: check that license is valid
                                    getEvents( $("#select-native-1 option:selected" ).val(), 1);

                                    //Get chat comments
                                    getComments(1);


                                    //Show events page
                                    $(':mobile-pagecontainer').pagecontainer('change', '#areyouin-events-page', {
                                        //transition: 'flip',
                                        changeHash: true,
                                        reverse: true,
                                        showLoadMsg: true
                                    });

									//Set events firstime polling
									sessionStorage['firstTimeEvent'] = 1;
                                });
                            }

                            //One team
                            else if(result.items[0].count == 1) { 
                                $("#logininfo").text(result.items[0].name + ' team ' + result.items[0].teamName); //Login page
                                $("#logininfo_e").text(result.items[0].name + ' team ' + result.items[0].teamName); //Events page
                                $("#logininfo_c").text(result.items[0].name + ' team ' + result.items[0].teamName); //Chat page

								//Save playerID to session
								sessionStorage['playerID'] =  result.items[0].playerID;
								//Save teamID to session
								sessionStorage['teamID'] =  result.items[0].teamID;
								//Save name to session
								sessionStorage['pname'] =  result.items[0].name;
								//Save photourl to session
								sessionStorage['photourl'] =  result.items[0].photourl;
								//Save admin status to session
								sessionStorage['admin'] =  result.items[0].teamAdmin;
								//Save registrar status to session
                                sessionStorage['registrar'] =  result.items[0].registrar;
                                //Save team's timezone to session
								sessionStorage['timezone'] =  result.items[0].timezone;
									
                                $('#ayilogin_label').css("display", "none");

								//Get team's events, check that license is valid
                                getEvents( result.items[0].teamID, 1);

                                //Get chat comments
                                getComments(1);
                                
                                //Show events page
                                $(':mobile-pagecontainer').pagecontainer('change', '#areyouin-events-page', {
                                    //transition: 'flip',
                                    changeHash: true,
                                    reverse: true,
                                    showLoadMsg: true
								});     
								
								//Set events firstime polling
								sessionStorage['firstTimeEvent'] = 1;								
                            }
                        },

                        error: function () {
                            alert("error");
                        }           
                });
        }

        });
        

});

