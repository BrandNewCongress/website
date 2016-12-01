//     Shell.js 1.0

//     Copyright (c) 2015 by Sitetheory, All Rights Reserved
//
//     All information contained herein is, and remains the
//     property of Sitetheory and its suppliers, if any.
//     The intellectual and technical concepts contained herein
//     are proprietary to Sitetheory and its suppliers and may be
//     covered by U.S. and Foreign Patents, patents in process,
//     and are protected by trade secret or copyright law.
//     Dissemination of this information or reproduction of this
//     material is strictly forbidden unless prior written
//     permission is obtained from Sitetheory.
//
//     For full details and documentation:
//     http://docs.sitetheory.io

// Home Page (Article 35194) Controller
// -------------

// Require Dependencies
require([

    // Libraries
    "stratus",
    "jquery"

], function (Stratus, $) {

    // When the DOM is ready, begin.
    Stratus.DOM.ready(function () {

        var ip = $('#registerZip').data('zip');
        var location = null;
        if(ip) {
            $.getJSON('https://ipapi.co/' + ip + '/json', function (data) {
                if(!data) return false;
                if (data.postal) {
                    Stratus.Instances.UserManifest.set('profile.zip', data.postal);
                    $('#registerZip').remove();
                } else {
                    $('#registerZip').show();
                }
                if (data.latitude) {
                    Stratus.Instances.UserManifest.set('settings.lat', data.latitude);
                }
                if (data.longitude) {
                    Stratus.Instances.UserManifest.set('settings.lng', data.longitude);
                }
            });
        }

    });

});

