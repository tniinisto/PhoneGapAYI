/**
 * @author tniinis
 */

localStorage['azureserviceURL'] = "http://pg-areyouin.azurewebsites.net/services/";
var serviceURL = localStorage['azureserviceURL'];

$(window).load(function() {
	setTimeout(getEventList, 100);
});

$(document).ajaxError(function(event, request, settings) {
	alert("Error accessing the server - EventList");
});

function getEventList() {
	
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById("event_content_id").innerHTML = xmlhttp.responseText;
		}
	};

	//alert("GET gets called.");
	//var variables = "teamid=" + str + "&playerid=" + str2;
	//xmlhttp.open("GET", "event_list.php?" + variables, false);
    xmlhttp.open("GET", "http://localhost:1080/PhoneGapAYIgit/services/getevents.php", false);
	xmlhttp.send();

}
