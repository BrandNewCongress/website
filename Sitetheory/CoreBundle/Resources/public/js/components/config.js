//     Config.js 1.0

//     Copyright (c) 2016 by Sitetheory, All Rights Reserved
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

// Configure Require.js
// -------------

/* Gather Development Information */
var dev = (typeof document.cookie === 'string' && document.cookie.indexOf('env=') !== -1);
var local = (typeof document.cookie === 'string' && document.cookie.indexOf('local=') !== -1);
var suffix = (dev) ? '' : '.min';
var dashSuffix = (dev) ? '' : '-min';
var directory = (dev) ? '' : 'min/';
var cacheTime = cacheTime || '1';

/* Deployment Customization */
var cdn = '//bnc.sitetheory.net/';
var relative = 'assets/1/0/bundles/';
var bundle = 'sitetheorystratus/';
var vendorBundle = 'sitetheorycore/';

// Begin Config Object
requirejs.config({

    // Connection Settings
    waitSeconds: 30,

    // Cache Busting
    urlArgs: 'v=' + cacheTime,

    // Version Location (Disabled During Beta Testing)
    baseUrl: (local ? '/' : cdn) + relative,

    // Dependencies
    shim: {
        /* Angular */
        angular: {
            exports: 'angular'
        },
        'angular-aria': { deps: ['angular'] },
        'angular-animate': { deps: ['angular'] },
        'angular-messages': { deps: ['angular'] },
        'angular-material': {
            deps: [
                'angular-aria',
                'angular-animate',
                'angular-messages'
            ]
        },
        'angular-sanitize': { deps: ['angular'] },
        'jquery-cookie': { deps: ['zepto'] },
    },


    // Relative Paths
    paths: {
        /* Require.js Plugins */
        text: bundle + 'stratus/bower_components/text/text',

        /* Stratus Core Library */
        stratus: bundle + 'stratus/stratus' + suffix,
        'stratus-lite': bundle + 'stratus/stratusLite' + suffix,

        /* Stratus Controllers */
        'stratus.controllers.generic': bundle + 'stratus/controllers/generic' + suffix,

        /* Stratus Core Components */

        /* Stratus Core Directives */
        'stratus.directives.trigger': bundle + 'stratus/directives/trigger' + suffix,

        /* Stratus Core Filters */
        'stratus.filters.gravatar': bundle + 'stratus/filters/gravatar' + suffix,
        'stratus.filters.moment': bundle + 'stratus/filters/moment' + suffix,
        'stratus.filters.truncate': bundle + 'stratus/filters/truncate' + suffix,

        /* Stratus Core Services */
        'stratus.services.model': bundle + 'stratus/services/model' + suffix,
        'stratus.services.collection': bundle + 'stratus/services/collection' + suffix,
        'stratus.services.registry': bundle + 'stratus/services/registry' + suffix,

        /* Stratus Core Views */
        'stratus.views.base': bundle + 'stratus/views/base' + suffix,

        /* Stratus Core Plugins */
        'stratus.views.plugins.base': bundle + 'stratus/views/plugins/base' + suffix,
        'stratus.views.plugins.addclass': bundle + 'stratus/views/plugins/addclass' + suffix,
        'stratus.views.plugins.addclose': bundle + 'stratus/views/plugins/addclose' + suffix,
        'stratus.views.plugins.carousel': bundle + 'stratus/views/plugins/carousel' + suffix,
        'stratus.views.plugins.dim': bundle + 'stratus/views/plugins/dim' + suffix,
        'stratus.views.plugins.drawer': bundle + 'stratus/views/plugins/drawer' + suffix,
        'stratus.views.plugins.help': bundle + 'stratus/views/plugins/help' + suffix,
        'stratus.views.plugins.onscreen': bundle + 'stratus/views/plugins/onscreen' + suffix,

        /* Common Libraries */
        bowser: bundle + 'stratus/bower_components/bowser/src/bowser',
        math: bundle + 'stratus/bower_components/mathjs/dist/math' + suffix,
        md5: bundle + 'stratus/bower_components/js-md5/build/md5.min',
        moment: bundle + 'stratus/bower_components/moment/' + directory + 'moment' + suffix,
        'moment-timezone': bundle + 'stratus/bower_components/moment-timezone/builds/moment-timezone-with-data' + suffix,
        'moment-range': bundle + 'stratus/bower_components/moment-range/dist/moment-range' + suffix,
        promise: bundle + 'stratus/bower_components/promise-polyfill/promise' + suffix,
        countUp: bundle + 'stratus/bower_components/countUp.js/countUp',

        /* jQuery */
        jquery: bundle + 'stratus/bower_components/jquery/dist/jquery' + suffix,
        'jquery-cookie': bundle + 'stratus/bower_components/jquery.cookie/jquery.cookie',

        /* Angular */
        angular: bundle + 'stratus/bower_components/angular/angular' + suffix,
        'angular-animate': bundle + 'stratus/bower_components/angular-animate/angular-animate' + suffix,
        'angular-aria': bundle + 'stratus/bower_components/angular-aria/angular-aria' + suffix,
        'angular-material': bundle + 'stratus/bower_components/angular-material/angular-material' + suffix,
        'angular-messages': bundle + 'stratus/bower_components/angular-messages/angular-messages' + suffix,
        'angular-sanitize': bundle + 'stratus/bower_components/angular-sanitize/angular-sanitize' + suffix,
        'angular-countUp': bundle + 'stratus/bower_components/countUp.js/dist/angular-countUp' + suffix,
        'angular-scrollSpy': bundle + 'stratus/bower_components/angular-scroll-spy/angular-scroll-spy',

        /* Backbone */
        underscore: bundle + 'stratus/bower_components/underscore/underscore' + dashSuffix,

        /* Sitetheory Custom */
        backbone: 'sitetheorycore/dist/backbone/backbone' + suffix,
        zepto: 'sitetheorycore/dist/zepto/zepto' + suffix,


        // TODO: add +suffix back to these JS files
        /* Vendor Custom Controllers */
        'stratus.services.tracking': vendorBundle + 'js/services/tracking' + suffix,

        /* Vendor Custom Controllers */
        'stratus.controllers.api': vendorBundle + 'js/controllers/api' + suffix,

        /* Vendor Custom Components */
        'stratus.components.formNominate': vendorBundle + 'js/components/formNominate' + suffix,
        'templates-form-nominate': vendorBundle + 'js/components/formNominate.html'
    }
});
