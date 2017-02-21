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
/*
<script src="https://brandnewcongress.org/assets/1/0/bundles/sitetheorycore/js/components/load.js">
<stratus-form-nominate
     data-url="https://api.brandnewcongress.org"
     data-controller="/nominations"
     data-wording-person="1"
     data-wording-pronoun="You"
     data-wording-possessive="Your"
     data-wording-possessive-direct="Your"
     data-reset-keep='["nominatorName","nominatorEmail", "nominatorPhone"]'
     data-reset-clear='[]'
     data-response-success=""
     data-redirect-url=""
     data-dynamic-options=""
 ></stratus-form-nominate>
 */



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
            // Custom Properties
            options: '@',
            url: '@',
            controller: '@',
            wordingPerson: '@',
            wordingPronoun: '@',
            wordingPossessive: '@',
            wordingPossessiveDirect: '@',
            responseSuccess: '@',
            resetKeep: '@',
            resetClear: '@',
            redirectUrl: '@',
            scrollTo: '@',
            scrollToOffset: '@',
        },
        controller: function ($scope, $element, $http, $attrs, $window, model) {
            var uid = _.uniqueId('formNominate_');
            Stratus.Instances[uid] = $scope;
            $scope.model = $scope.$parent.model;

            // OPTIONS: These extend the options from Stratus.Controller.Api. If we need more control, we can add more
            // bindings via data attributes and add them here. These options are passed in via the template, which are
            // then merged with the API controller's default options.
            var host = window.location.hostname.split('.').reverse();
            var tld = host[1]+'.'+host[0];

            $scope.options = {
                id: $element.id ? $element.id+'Component' : uid,
                url: $attrs.url || 'https://api.'+tld,
                controller: $attrs.controller || '/nominations',
                response: {
                    success: $attrs.responseSuccess || 'Thank you for submitting your nomination! We review every nomination we get.'
                },
                redirect: {
                    url: $attrs.redirectUrl || false
                },
                // Object to reset or keep fields, e.g. resetOptions.reset = ['foo', 'bar'] or resetOptions.keep = ['foo', 'bar']
                reset: {
                    keep: _.isJSON($attrs.resetKeep) ? JSON.parse($attrs.resetKeep) : ["nominatorName", "nominatorEmail", "nominatorPhone"],
                    clear: _.isJSON($attrs.resetClear) ? JSON.parse($attrs.resetClear) : null
                },
                scrollTo: $attrs.scrollTo || null,
                scrollToOffset: $attrs.scrollToOffset || 0
            };
            // Scroll to top of form
            $scope.options.scrollTo = $scope.options.scrollTo ? $scope.options.scrollTo : '#'+$scope.options.id;

            $scope.wording = {
                person: $attrs.wordingPerson || 1,
                pronoun: $attrs.wordingPronoun || 'You',
                possessive: $attrs.wordingPossessive || 'Your',
                possessiveDirect: $attrs.wordingPossessiveDirect || 'Your'
            };

            // Merge Custom Options (in case you want to pass in any options to the API controller.
            //if ($attrs.options && _.isJSON($attrs.options)) $scope.options = _.extendDeep($scope.options, JSON.parse($attrs.options));

        },
        template: (typeof Template === 'string') ? Template : '<form id="{{ $parent.options.id }}" name="Nominate" ng-submit="send(\'Nominate\')" ng-controller="Api" ng-sanitize="true" options="{{ $parent.options }}" ng-class="status" class="positionAnchor" ng-cloak ng-cloak-reveal><input type="hidden" name="utmSource" ng-model="model.data.utmSource"> <input type="hidden" name="utmMedium" ng-model="model.data.utmMedium"> <input type="hidden" name="utmCampaign" ng-model="model.data.utmCampaign"><md-progress-circular md-mode="indeterminate" ng-show="status === \'sending\'"></md-progress-circular><p class="message" ng-show="response.length" ng-bind-html="response"></p><div class="reset" ng-show="status == \'success\'"><md-button class="btn" ng-click="reset(\'Nominate\')">Submit Another</md-button></div><div ng-class="{sending: status === \'sending\'}" ng-show="status !== \'success\'"><div ng-if="$parent.wording.person == 2" class="whiteframePadding" md-whiteframe="2"><h2 flex="100">About You (the Submitter)</h2><div layout="row" flex="100"><md-input-container class="md-input-has-placeholder" flex="100" flex-gt-sm="45"><md-select-label md-no-float class="noFloat">Source <span class="required">*</span></md-select-label><md-select aria-label="Submitter Source" name="source" ng-model="model.data.source" md-no-asterisk required><md-option value="Nominator Call">Nominator Call</md-option><md-option value="Research">Research</md-option><md-option value="Personal Contact">Personal Contact</md-option></md-select><div ng-messages="Nominate.source.$error" role="alert"><div ng-message-exp="[\'required\']">Please select source.</div></div><div class="md-errors-spacer"></div></md-input-container><div flex-gt-sm="10"></div><md-input-container ng-if="$parent.options.url" class="md-input-has-placeholder" flex="100" flex-gt-sm="45" ng-controller="Api" options=\'{"url": "{{ $parent.options.url }}", "controller": "/teams", "onLoad": "fetch"}\'><md-select-label md-no-float class="noFloat">Your Team <span class="required">*</span></md-select-label><md-select aria-label="Submitter Team" name="sourceTeamName" ng-model="$parent.model.data.sourceTeamName" md-no-asterisk required><md-option ng-repeat="team in results" ng-value="team.name">{{ team.name }}</md-option></md-select><div ng-messages="$parent.Nominate.sourceTeamName.$error" role="alert"><div ng-message-exp="[\'required\']">Please select your team.</div></div><div class="md-errors-spacer"></div></md-input-container></div><div layout="row" flex="100"><md-input-container flex="100" flex-gt-sm="45"><label md-no-float class="noFloat">Source details</label><textarea aria-label="Submitter Source Details" name="sourceDetails" type="text" ng-model="model.data.sourceDetails" row="1" placeholder="" required></textarea><div ng-messages="Nominate.sourceDetails.$error" role="alert"><div ng-message-exp="[\'required\']">Please enter info.</div></div></md-input-container><div flex-gt-sm="10"></div><md-input-container flex="100" flex-gt-sm="45"><label md-no-float class="noFloat">Your Email</label><input aria-label="Submitter Email" name="submitterEmail" type="text" ng-pattern="options.pattern.email" ng-model="model.data.submitterEmail" placeholder="" required><div ng-messages="Nominate.submitterEmail.$error" role="alert"><div ng-message-exp="[\'required\', \'pattern\']">Please enter a valid email.</div></div></md-input-container></div></div><div layout="row" layout-wrap><div flex="100" flex-gt-sm="40"><div class="whiteframePadding" md-whiteframe="2"><h2>About {{ $parent.wording.pronoun }}</h2><div layout="column"><md-input-container><label md-no-float class="noFloat">{{ $parent.wording.possessive }} Name</label><input name="nominatorName" type="text" ng-model="model.data.nominatorName" placeholder="" required><div ng-messages="Nominate.nominatorName.$error" role="alert"><div ng-message-exp="[\'required\']">Please enter a name.</div></div></md-input-container><md-input-container><label md-no-float class="noFloat">{{ $parent.wording.possessive }} Email</label><input name="nominatorEmail" type="text" ng-pattern="options.pattern.email" ng-model="model.data.nominatorEmail" placeholder="" required><div ng-messages="Nominate.nominatorEmail.$error" role="alert"><div ng-message-exp="[\'required\', \'pattern\']">Please enter a valid email.</div></div></md-input-container><md-input-container><label md-no-float class="noFloat">{{ $parent.wording.possessive }} Phone</label><input name="nominatorPhone" type="text" ng-model="model.data.nominatorPhone" placeholder="" required><div ng-messages="Nominate.nominatorPhone.$error" role="alert"><div ng-message-exp="[\'required\']">Please enter a valid phone.</div></div></md-input-container></div></div><div class="whiteframePadding" md-whiteframe="2"><h2>About the Nominee</h2><div layout="column"><md-input-container><label md-no-float class="noFloat">Nominee\'s Name</label><input name="nomineeName" ng-model="model.data.nomineeName" placeholder="" required><div ng-messages="Nominate.nomineeName.$error" role="alert"><div ng-message-exp="[\'required\']">Please enter a name.</div></div></md-input-container><md-input-container><label md-no-float class="noFloat">Nominee\'s City</label><input name="nomineeCity" ng-model="model.data.nomineeCity" placeholder="" required><div ng-messages="Nominate.nomineeCity.$error" role="alert"><div ng-message-exp="[\'required\']">Please enter a city.</div></div></md-input-container><md-input-container class="md-input-has-placeholder"><md-select-label md-no-float class="noFloat">Nominee\'s State <span class="required">*</span></md-select-label><md-select aria-label="Nominee\'s State" name="nomineeState" ng-model="model.data.nomineeState" md-no-asterisk required="true"><md-option ng-repeat="state in states" ng-value="state.value">{{ state.text }}</md-option></md-select><div ng-messages="Nominate.nomineeState.$error" role="alert"><div ng-message-exp="[\'required\']">Please a select a state.</div></div><div class="md-errors-spacer"></div></md-input-container><md-input-container><label md-no-float class="noFloat">Nominee\'s Congressional District</label><input name="nomineeDistrict" ng-model="model.data.nomineeDistrict" placeholder="a number or \'AL\' for at-large"></md-input-container><md-input-container><md-checkbox name="nominatorPersonal" ng-model="model.data.nominatorPersonal" ng-value="1">{{ $parent.wording.pronoun }} know<span ng-show="$parent.wording.person == 2">s</span> this nominee personally.</md-checkbox></md-input-container></div></div></div><div flex="5"></div><div flex="100" flex-gt-sm="55"><div class="whiteframePadding" md-whiteframe="2"><h2>Why this nominee?</h2><div layout="column"><md-input-container><label md-no-float class="noFloat">Why would this person make a good candidate in {{ $parent.wording.possessiveDirect }} district?</label><textarea name="nomineeProfile" ng-model="model.data.nomineeProfile" placeholder="" rows="3" required></textarea><div ng-messages="Nominate.nomineeProfile.$error" role="alert"><div ng-message-exp="[\'required\']">Please enter an answer.</div></div><p class="hint">Tell us about their background, why they represent {{ $parent.wording.possessiveDirect }} district well, their service and leadership work, background, public speaking abilities, political views, and anything else {{ $parent.wording.pronoun }} think we should know.</p></md-input-container><md-input-container><label md-no-float class="noFloat">Links about {{ $parent.wording.possessiveDirect }} candidate.</label><textarea name="nomineeLinks" ng-model="model.data.nomineeLinks" placeholder="" rows="2"></textarea><p class="hint">Include personal homepage, Youtube videos of them, etc.</p></md-input-container></div></div><div class="whiteframePadding" md-whiteframe="2"><h2>Nominee\'s Contact</h2><div layout="column"><md-input-container><label md-no-float class="noFloat">Nominee\'s Email</label><input name="nomineeEmail" type="text" ng-pattern="options.pattern.email" ng-model="model.data.nomineeEmail" placeholder=""><div ng-messages="Nominate.nomineeEmail.$error" role="alert"><div ng-message-exp="pattern">Please enter a valid email.</div></div></md-input-container><md-input-container><label md-no-float class="noFloat">Nominee\'s Phone</label><input name="nomineePhone" type="text" ng-model="model.data.nomineePhone" placeholder="Separate multiple phone numbers with a semicolon"></md-input-container><md-input-container><label md-no-float class="noFloat">Nominee\'s Facebook</label><input name="nomineeFacebook" ng-model="model.data.nomineeFacebook" placeholder="e.g. facebook.com/gwashington"></md-input-container><md-input-container><label md-no-float class="noFloat">Nominee\'s LinkedIn</label><input name="nomineeLinkedIn" ng-model="model.data.nomineeLinkedIn" placeholder="e.g. linkedin.com/in/george-washington"></md-input-container><md-input-container><label md-no-float class="noFloat">Nominee\'s Twitter</label><input name="nomineeTwitter" ng-model="model.data.nomineeTwitter" placeholder="e.g. twitter.com/gwashington"></md-input-container></div></div></div></div><br><div class="submitArea textCenter"><button type="submit" class="btn btnBig formSubmit">Nominate this Person!</button></div></div></form>'
    };
}));
