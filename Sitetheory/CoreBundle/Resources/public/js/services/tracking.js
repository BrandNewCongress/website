//     Stratus.Services.Tracking.js 1.0

// BNC Tracking Service
// --------------------------

// Define AMD, Require.js, or Contextual Scope
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['stratus', 'underscore'], factory);
    } else {
        factory(root.Stratus, root._);
    }
}(this, function (Stratus, _) {

    Stratus.Services.Tracking = ['$provide', function ($provide) {
        $provide.factory('tracking', function ($document, $window) {
            return function () {

                this.parseURL = function (url) {
                    var a = document.createElement('a');
                    a.href = url;
                    return a.hostname;
                };
                this.getParameterByName = function (name, url) {
                    if (!url) url = window.location.href;
                    name = name.replace(/[\[\]]/g, "\\$&");
                    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
                    if (!results) return null;
                    if (!results[2]) return '';
                    return decodeURIComponent(results[2].replace(/\+/g, " "));
                };
                this.getUTMCode = function (name) {
                    var value = this.getParameterByName(name);
                    if (!value && name == 'utmSource') value = this.parseURL(document.referrer);
                    return value
                };
                this.getRefcode = function () {
                    var utmCampaign = this.getUTMCode('utmCampaign');
                    var utmSource = this.getUTMCode('utmSource');
                    var utmMedium = this.getUTMCode('utmMedium');
                    return (utmCampaign ? (utmCampaign + "/") : "") + (utmSource ? utmSource : "") + (utmMedium ? ("/" + utmMedium) : "");
                };
                this.setRefcode = function (options) {
                    options = !options ? {} : options;
                    options.url = !options.url ? 'https://secure.actblue.com' : options.url;
                    var links = document.querySelectorAll('[href^="' + options.url + '"]');
                    if (links.length > 0) {
                        var refCode = this.getRefcode();
                        for (var index = 0; index < links.length; index++) {
                            var link = links[index];
                            link.href = link.href + '?refcode=' + refCode;
                        }
                    }
                };
                this.send = function (category, action) {
                    ga('send', 'event', category, action);
                    return true;
                };

            };
        });
    }];
}));
