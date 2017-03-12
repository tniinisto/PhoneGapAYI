/**
 * @author tniinis
 */

localStorage['azureserviceURL'] = "http://pg-areyouin.azurewebsites.net/services/";
var serviceURL = localStorage['azureserviceURL'];

//scroll_events = new iScroll('wrapper_events', { vScrollbar: false, hScrollbar:false, hScroll: false });

$(window).load(function() {
	setTimeout(getEventList, 100);
});

$(document).ajaxError(function(event, request, settings) {
	//alert("Error accessing the server - EventList");
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
			
			// setTimeout(function(){
				// scroll_events.refresh();
			// });			
		}
	};

	//alert("GET gets called.");
	//var variables = "teamid=" + str + "&playerid=" + str2;
	//xmlhttp.open("GET", "event_list.php?" + variables, false);
    xmlhttp.open("GET", "http://localhost:1080/PhoneGapAYIgit/services/getevents.php", false);
	xmlhttp.send();

}

//Show&hide events players in event list
function showPlayers(eventid) {
    
    var id = "#id_playersfull_" + eventid;
    var box = $(id);

    if (box.hasClass('noshow')) {
    
        box.removeClass('noshow');
        setTimeout(function () {
            box.removeClass('visuallynoshow');
        }, 20);

    } else {
    
        box.addClass('visuallynoshow');
    
        box.one('transitionend', function(e) {

            box.addClass('noshow');

        });
    }
}

//Update AYI status
function updateAYI(eventplayerid, ayi, eventid, switchid)
{
	//alert("updateAYI() gets called.");
    //alert(switchid);

    if (eventplayerid == "" || ayi == "") {
		document.getElementById("userlogin").innerHTML = "updateAYI()";
		return;
	}
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function () {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        //alert(xmlhttp.responseText);

	        //getEvents(); //Update events
	    }
	}

	//Update the summary count to client when in/out switch is clicked///////////////////////////
	var summary_id = "id_summary" + eventid;
	var th = document.getElementById(summary_id).innerHTML;
	//alert(th);

	var start = th.indexOf(":")
	var end = th.indexOf("/")
	var value = th.substring(start + 1, end);
	value = value.trim();
	//alert(value);

	//alert(ayi);
    var switch_id = "myonoffswitch" + switchid;
	//var sw = document.getElementById(switch_id).innerHTML;
	//if (ayi == 0) {
    if(document.getElementById(switch_id).checked == false) {
	    //alert("ayi 0");
        //document.getElementById(switch_id).checked = false;
        ayi = 0;
        value--;
	}
	else {
        //alert("ayi 1");
	    //document.getElementById(switch_id).checked = true;
        ayi = 1;
        value++;
	}

	var start2 = th.indexOf("/")
	var value2 = th.substr(start2 + 1);
	value2 = value2.trim();

	document.getElementById(summary_id).innerHTML = "Players IN: " + value + " / " + value2;
    //////////////////////////////////////////////////////////////////////////////////////////////////

	var variables = "event=" + eventplayerid + "&ayi=" + ayi;
	//alert(variables);
	xmlhttp.open("GET", "update_inout.php?" + variables, true);
	xmlhttp.send();
}

