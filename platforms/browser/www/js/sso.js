// var serviceURL = "https://r-youin.com/pgmobile/services/";

$('#sso_form').on('submit', function () {
    //alert("sso start");

    //create AJAX request to submit form
    $.GET(this.action, $(this).serialize(), function (response) {
        //the `response` variable now holds what the server returned after the form submission
        
    });

    //stop regular submission of form
    return false;
});
