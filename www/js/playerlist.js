/**
 * @author tniinis
 */
localStorage['serviceURL'] = "http://localhost:1080/PhoneGapAYIgit/services/";
var serviceURL = localStorage['serviceURL'];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var players;

$(window).load(function() {
	setTimeout(getPlayerList, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').hide();
	alert("Error accessing the server");
});

function getPlayerList() {
	$('#busy').show();
	alert("Calling getplayers.php...");
	
	$.getJSON(serviceURL + 'getplayers.php', function(data) {
		$('#busy').hide();
		$('#playerList li').remove();
		players = data.items;
		$.each(players, function(index, player) {
			$('#playerList').append(
					'<li>' +
					'<p class="line1">' + player.playerID + '</p>' +
					'<p class="line2">' + player.name + '</p>' +
					'</li>');
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});
	
}
