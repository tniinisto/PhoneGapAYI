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

function getLogin() {
	$('#busy').show();


	$.getJSON(serviceURL + 'login.php', function(data) {
		$('#busy').hide();

		logininfo = data.items;
		$('#logininfo').text(logininfo[0].playerID + ' ' + logininfo[0].name);
		
		// setTimeout(function(){
		// 	scroll.refresh();
		// });
	});
}