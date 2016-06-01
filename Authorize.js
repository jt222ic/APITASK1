// completed code embedded api code given by the developer of javascript
"use strict";

var authorize = {

    CLIENT_ID: '808496123025-jknrq18icm309b4iu7pag392od21fr9g.apps.googleusercontent.com',

    //var apiKey = 'AIzaSyAdjHPT5Pb7Nu56WJ_nlrMGOAgUAtKjiPM';

    SCOPES: ['https://mail.google.com/'],

    // need to check how to obtain the keys and scopes

    checkAuth: function() {
        gapi.auth.authorize({
                'client_id': authorize.CLIENT_ID,
                'scope': authorize.SCOPES.join(''),
                'immediate': true
            },

            authorize.handleAuthClick());
    },



    //@param {object} authresult Authorization result
    // hide auth UI, then laod client library
    handleAuthResult: function(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
            authorizeDiv.style.display = 'none';
            Googlemail.loadGmailApi();
        }
        else {
            authorizeDiv.style.display = 'incline';
        }
        // else if you click on the button it allow me to show the auth UI, initiate Authorization
    },

    handleAuthClick: function(event) {
        gapi.auth.authorize({
                client_id: authorize.CLIENT_ID,
                scope: authorize.SCOPES,
                immediate: false
            },
            authorize.handleAuthResult);
        return false;
    }
}


// https://developers.google.com/gmail/api/quickstart/js
// https://developers.google.com/api-client-library/javascript/start/start-js#how-an-application-makes-an-api-request-using-the-javascript-client-library
// http://www.w3schools.com/googleapi/google_maps_basic.asp