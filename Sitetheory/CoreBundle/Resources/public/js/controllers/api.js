//     Stratus.Controllers.Api.js 1.0

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

// BNC Api Controller
// --------------------------

// Define AMD, Require.js, or Contextual Scope
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['stratus', 'underscore', 'jquery', 'angular', 'angular-material', 'angular-sanitize', 'stratus.services.model', 'stratus.services.tracking'], factory);
    } else {
        factory(root.Stratus, root._, root.$);
    }
}(this, function (Stratus, _, $) {

    // Make Sure NG Sanitize is available (XSS)
    Stratus.Modules.ngSanitize=true;

    // This Controller handles simple element binding
    // for a single scope to an API Object Reference.
    Stratus.Controllers.Api = function ($scope, $element, $http, $attrs, $window, $interpolate, model, tracking) {

        var uid = _.uniqueId('api_');
        Stratus.Instances[uid] = $scope;

        // Options
        $scope.model = new model;
        $scope.tracking = new tracking;

        var host = window.location.hostname.split('.').reverse();
        var tld = host[1]+'.'+host[0];


        // Tracking
        Stratus.DOM.ready(function () {
            $scope.tracking.setRefcode();
        });


        // Custom Easing (Quintic) (for the counter page)
        $scope.easingFn = function (t, b, c, d) {
            var ts = (t /= d) * t;
            var tc = ts * t;
            return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t);
        };



        // OPTIONS
        $scope.options = {
            id: uid,
            pattern: {
                email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                zip: /[a-zA-Z0-9 \-]{5,}/,
                phone: /^[0-9]{10,}$/
            },
            url: null, // required
            controller: null, // e.g. '/people'
            response: {
                invalid: 'There was a validation error, please check the fields below.',
                success: 'Thanks for your information! We review every submission and we\'ll be in touch.',
                error: 'Sorry ;( looks like there was an error saving your info. Please email us directly so we can help.'
            },
            scrollTo: null,
            scrollToOffset: 0,
            redirect: {
                url: false,
                config: null // 'width=400,height=500,toolbar=no,menubar=no,scrollbars=yes,resizable=yes'
            },
            contentType: 'json', // 'form' or 'json'
            prototype: {
                dataType: 'json',
                method: 'GET',
                url: '',
                headers: {},
                data: ''
            },
            // String of method name, or Array of Strings
            onLoad: null,
            // Object or Array of Objects
            onTime: null,
            // Object to reset or clear fields, e.g. reset.reset = ['foo', 'bar'] or reset.clear = ['foo', 'bar']
            reset: {},
            // Allow passing in dynamic options that will be used in select or checkbox fields, e.g. `"dynamicOptions": {"skills":{"web-design": "Web Design"}}`
            dynamicOptions: {}
        };


        // Merge Custom Options
        if ($attrs.options) {
            var optionsHydrated = $interpolate($attrs.options)($scope);
            if(_.isJSON(optionsHydrated)) $scope.options = _.extendDeep($scope.options, JSON.parse(optionsHydrated));
        }

        // Error for required options
        if(!$scope.options.url) console.error('You must provide an API url via the options.url attribute, e.g. https://api.domain.com.');
        if(!$scope.options.controller) console.error('You must provide an API controller via the options.controller attribute, e.g. /people.');

        if($scope.options.url) {
            $scope.options.prototype.url = $scope.options.url + $scope.options.controller;
        }

        $scope.states = [
            {"value": "AL", "text": "Alabama"},
            {"value": "AK", "text": "Alaska"},
            {"value": "AZ", "text": "Arizona"},
            {"value": "AR", "text": "Arkansas"},
            {"value": "CA", "text": "California"},
            {"value": "CO", "text": "Colorado"},
            {"value": "CT", "text": "Connecticut"},
            {"value": "DE", "text": "Delaware"},
            {"value": "FL", "text": "Florida"},
            {"value": "GA", "text": "Georgia"},
            {"value": "HI", "text": "Hawaii"},
            {"value": "ID", "text": "Idaho"},
            {"value": "IL", "text": "Illinois"},
            {"value": "IN", "text": "Indiana"},
            {"value": "IA", "text": "Iowa"},
            {"value": "KS", "text": "Kansas"},
            {"value": "KY", "text": "Kentucky"},
            {"value": "LA", "text": "Louisiana"},
            {"value": "ME", "text": "Maine"},
            {"value": "MD", "text": "Maryland"},
            {"value": "MA", "text": "Massachusetts"},
            {"value": "MI", "text": "Michigan"},
            {"value": "MN", "text": "Minnesota"},
            {"value": "MS", "text": "Mississippi"},
            {"value": "MO", "text": "Missouri"},
            {"value": "MT", "text": "Montana"},
            {"value": "NE", "text": "Nebraska"},
            {"value": "NV", "text": "Nevada"},
            {"value": "NH", "text": "New Hampshire"},
            {"value": "NJ", "text": "New Jersey"},
            {"value": "NM", "text": "New Mexico"},
            {"value": "NY", "text": "New York"},
            {"value": "NC", "text": "North Carolina"},
            {"value": "ND", "text": "North Dakota"},
            {"value": "OH", "text": "Ohio"},
            {"value": "OK", "text": "Oklahoma"},
            {"value": "OR", "text": "Oregon"},
            {"value": "PA", "text": "Pennsylvania"},
            {"value": "RI", "text": "Rhode Island"},
            {"value": "SC", "text": "South Carolina"},
            {"value": "SD", "text": "South Dakota"},
            {"value": "TN", "text": "Tennessee"},
            {"value": "TX", "text": "Texas"},
            {"value": "UT", "text": "Utah"},
            {"value": "VT", "text": "Vermont"},
            {"value": "VA", "text": "Virginia"},
            {"value": "WA", "text": "Washington"},
            {"value": "WV", "text": "West Virginia"},
            {"value": "WI", "text": "Wisconsin"},
            {"value": "WY", "text": "Wyoming"}
        ];


        // DEFAULTS
        $scope.reset = function (form) {


            $scope.response = '';
            $scope.status = 'default';
            // Data Returned
            $scope.results = {};

            if ($scope.options.reset && $scope.options.reset instanceof Object) {
                if ('clear' in $scope.options.reset && $scope.options.reset.clear && $scope.options.reset.clear.length > 0) {
                    _.each($scope.options.reset.clear, function (v) {
                        if (v in $scope.model.data) $scope.model.data[v] = null;
                    });
                } else if ('keep' in $scope.options.reset && $scope.options.reset.keep && $scope.options.reset.keep.length > 0) {
                    // TODO: this is not keeping the fields like it should... it says that 'i' is not contained in the keep list despite console logs that show it does
                    _.each($scope.model.data, function (v, i) {
                        if (!_.contains($scope.options.reset.keep, i)) {
                            $scope.model.data[i] = null;
                        }
                    });
                } else {
                    $scope.model.data = {};
                }
            } else {
                $scope.model.data = {};
            }
            if (form && form in $scope) {
                $scope[form].$setPristine();
                $scope[form].$setUntouched();
            }
            // Track UTM Codes
            $scope.model.data.utmCampaign = $scope.tracking.getUTMCode('utmCampaign');
            $scope.model.data.utmSource = $scope.tracking.getUTMCode('utmSource');
            $scope.model.data.utmMedium = $scope.tracking.getUTMCode('utmMedium');
        };

        $scope.reset();

        // METHODS
        $scope.serialize = function (obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        };

        // General Submit
        $scope.submit = function (form) {
            $scope.status = 'sending';
            $scope.response = '';
            // Success
            function successCallback(response) {
                if (response && (response.status === 200)) {
                    $scope.response = $scope.options.response.success;
                    $scope.status = 'success';
                    $scope.results = response.data;
                    if ($scope.options.redirect.url) {
                        // Get UTM Tracking Referral Code
                        var refcode = '?refcode=' + $scope.customMethods.getRefcode();
                        $window.location = $scope.options.redirect.url + refcode;
                    }
                } else {
                    // @debug add response code
                    $scope.response = $scope.options.response.error + ' [' + response.code + ': ' + response.data + ']';
                    $scope.status = 'error';
                }
            }

            // Error
            function errorCallback(response) {
                $scope.response = $scope.options.response.error + ' [' + response.code + ': ' + response.data + ']';
                $scope.status = 'error';
            }

            if($scope.options.prototype.url) {
                var promise = $http($scope.options.prototype);
                // Hack for Angular 1.6.0 Promise bug
                if (promise.catch) {
                    promise.then(successCallback, errorCallback).catch(errorCallback);
                } else {
                    promise.then(successCallback, errorCallback);
                }
                return promise;
            }
        };

        // CUSTOM METHODS
        // General API Data Method
        $scope.fetch = function () {
            $scope.options.prototype.method = 'GET';
            return $scope.submit();
        };

        // Signup Method
        $scope.send = function (form) {

            console.log($scope.options.scrollTo);
            if ($scope.options.scrollTo && $($scope.options.scrollTo)) {
                $('html,body').animate({
                    scrollTop: $($scope.options.scrollTo).offset().top + $scope.options.scrollToOffset
                }, 500);
            }

            if (!$scope[form].$valid) {
                $scope.response = $scope.options.response.invalid;
                $scope.status = 'error';
                return false;
            }

            $scope.options.prototype.method = 'POST';
            $scope.options.prototype.dataType = $scope.options.contentType;
            if ($scope.options.contentType == 'form') {
                $scope.options.prototype.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                $scope.options.prototype.data = $scope.serialize($scope.model.data);
            } else {
                $scope.options.prototype.headers['Content-Type'] = 'application/json';
                $scope.options.prototype.data = $scope.model.data;
            }
            return $scope.submit(form);
        };

        // Allow Methods on Load
        if ($scope.options.onLoad !== null && $scope.options.onLoad.length > 0) {
            if (Array.isArray($scope.options.onLoad)) {
                _.each($scope.options.onLoad, function (el) {
                    if (_.contains($scope, el)) $scope[el]();
                });
            } else if ($scope.options.onLoad in $scope) {
                $scope[$scope.options.onLoad]();
            }
        }

        // Allow Methods on Timed Schedule
        if ($scope.options.onTime !== null) {
            if (Array.isArray($scope.options.onTime) && $scope.options.onTime.length > 0) {
                _.each($scope.options.onTime, function (el) {
                    if (typeof el === 'object' && el.time && el.method && el.method in $scope) {
                        Stratus.Chronos.add({
                            time: el.time,
                            method: $scope[el.method],
                            enabled: true
                        });
                    }
                });
            } else if (typeof $scope.options.onTime === 'object' && $scope.options.onTime.time && $scope.options.onTime.method && $scope.options.onTime.method in $scope) {
                Stratus.Chronos.add({
                    time: $scope.options.onTime.time,
                    method: $scope[$scope.options.onTime.method],
                    enabled: true
                });
            }
        }


    };
}));
