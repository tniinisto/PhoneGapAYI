//localStorage['serviceURL'] = "http://coenraets.org/apps/directory/services/";
//var serviceURL = localStorage['serviceURL'];

var serviceURL = "https://dev-areyouin.azurewebsites.net/pgmobile/services/";

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

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
		//$('#employeeList li').remove();
		logininfo = data.items;
		 $.each(logininfo, function(index, logininfo) {
			$('#logininfo').append(logininfo.playerID + ' ' + logininfo.name)
		 });
		
		// 	$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
		// 			'<img src="pics/' + employee.picture + '" class="list-icon"/>' +
		// 			'<p class="line1">' + employee.firstName + ' ' + employee.lastName + '</p>' +
		// 			'<p class="line2">' + employee.title + '</p>' +
		// 			'<span class="bubble">' + employee.reportCount + '</span></a></li>');
		// });

		logininfo = data.items;

		setTimeout(function(){
			scroll.refresh();
		});
	});
}