localStorage['serviceURL'] = "http://localhost:1080/PG_php/services/";
var serviceURL = localStorage['serviceURL'];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var employees;

$(window).load(function() {
	setTimeout(getEmployeeList, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').hide();
	alert("Error accessing the server");
});

function getEmployeeList() {
	$('#busy').show();
	//alert("Call getemployees.php...");
	// $.getJSON(serviceURL + 'getemployees.php', function(data) {
		 $('#busy').hide();
		// $('#employeeList li').remove();
		// employees = data.items;
		// $.each(employees, function(index, employee) {
			// $('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
					// '<img src="pics/' + employee.picture + '" class="list-icon"/>' +
					// '<p class="line1">' + employee.firstName + ' ' + employee.lastName + '</p>' +
					// '<p class="line2">' + employee.title + '</p>' +
					// '<span class="bubble">' + employee.reportCount + '</span></a></li>');
		// });
		// setTimeout(function(){
			// scroll.refresh();
		// });
	// });
	
	$('#employeeList').append('<li>jepaa</li>');
}