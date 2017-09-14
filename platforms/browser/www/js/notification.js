// document.addEventListener('deviceready', function () {
//     // window.plugin.notification.local is now available


//     // window.plugin.notification.local.add({
//     //     id:         '',  // A unique id of the notifiction
//     //     date:       Date,    // This expects a date object
//     //     message:    String,  // The message that is displayed
//     //     title:      String,  // The title of the message
//     //     repeat:     String,  // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
//     //     badge:      Number,  // Displays number badge to notification
//     //     sound:      String,  // A sound to be played
//     //     json:       String,  // Data to be passed through the notification
//     //     autoCancel: Boolean, // Setting this flag and the notification is automatically canceled when the user clicks it
//     //     ongoing:    Boolean, // Prevent clearing of notification (Android only)
//     // }, callback, scope);

//     // var now                  = new Date().getTime(),
//     // _30_seconds_from_now = new Date(now + 30*1000);

//     // window.plugin.notification.local.add({
//     //     id:      1,
//     //     title:   'Reminder',
//     //     message: 'RYouIN event test!',
//     //     date:    _30_seconds_from_now
//     // });

//     console.warn(`Phonegap notifications here...`);

// }, false);

//document.addEventListener('deviceready', function () {

    $(window).load(function() {

        setTimeout( function() {
        
            if ('Notification' in window) {
                Notification.requestPermission(function (permission) {

                //If the user accepts, let’s create a notification
                if (permission === "granted") {
                    var notification = new Notification('R\'YouIN', {
                        tag: 'notification', 
                        body: 'R\'YouIN notifications look like this',
                        //sound: "file://js/tone.wav",
                        icon: "images/events-icon.png"
                    }); 
                    
                    navigator.notification.beep(1);

                    notification.onshow  = function() { console.warn('show'); };
                    notification.onclose = function() { console.log('close'); };
                    notification.onclick = function() { console.log('click'); };
                    
                }

                });
        };

        }, 5000);

    });

//});