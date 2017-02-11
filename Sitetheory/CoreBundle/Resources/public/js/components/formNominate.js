//     Stratus.Components.FormNominate.js 1.0

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

// BNC Form Nominate Component
// -----------------------

// Define AMD, Require.js, or Contextual Scope
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        var requirements = ['stratus', 'angular', 'stratus.controllers.api'];
        if (typeof document.cookie === 'string' && document.cookie.indexOf('env=') !== -1) {
            requirements.splice(1, 0, 'text!templates-form-nominate');
        }
        define(requirements, factory);
    } else {
        factory(root.Stratus);
    }
}(this, function (Stratus, Template) {

    // This component creates a form to submit nominations
    Stratus.Components.FormNominate = {
        bindings: {
            ngModel: '=',
            elementId: '@',
            redirect: '@',
            // The API URL
            target: '@'
        },
        controller: function ($scope, $element, $parse, $attrs) {
            Stratus.Instances[_.uniqueId('delete_')] = $scope;
            $scope.model = $scope.$parent.model;
        },
        template: (typeof Template === 'string') ? Template : '<p>This is a form...</p>'
    };
}));
