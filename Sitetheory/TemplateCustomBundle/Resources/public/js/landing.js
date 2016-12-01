// Use Require.js or Contextual Scope
(function (root, factory) {
    if (typeof require === 'function') {
        require(['stratus', 'jquery', 'underscore'], factory);
    } else {
        factory(root.Stratus, root.$, root._);
    }
}(this, function (Stratus, $, _) {
    Stratus.DOM.ready(function () {

        function trackEvent(el) {
            var trackCategory = el.dataAttr('trackCategory') || 'unknown';
            var trackLabel = el.dataAttr('trackLabel') || null;
            var trackValue = el.dataAttr('trackValue') || null;
            ga('send', 'event', trackCategory, trackLabel, trackValue);
        }

        // Track Version of Page
        if ($('body').dataAttr('contentVersion')) {
            ga('send', 'event', 'content', 'version', $('body').dataAttr('contentVersion'));
        }

        // Track all registered elements
        $.each($('[data-trackCategory]'), function (i, el) {
            $(el).click(function (event) {
                trackEvent($(event.target));
            });
        });

        // Get IP and Zip
        var ip = $('.registerZip').first().data('ip');
        if (ip.length > 0) {
            $.getJSON('https://ipapi.co/' + ip + '/json/', function (data) {
                if (!data) return false;
                if (data.postal) {
                    $.each($('.registerZip'), function (i, el) {
                        $(el).val(data.postal);
                        $(el).parent().hide();
                    });
                } else {
                    $.each($('.registerZip'), function (i, el) {
                        $(el).set('value', '0');
                    });
                }
            });
        }


        /**
         * REGISTRATION
         */
        var formClass = 'registrationForm';

        // Support Multiple Forms inside an element of this class name
        var forms = $('.'+formClass+' form');
        if ( forms.length > 0 ) {
            $.each(forms, function(i, el) {

                // If Javascript is Working...
                // Hide Error Saying JS isn't working
                $(el).find('.formLoadingError').hide();
                // Enable Form
                $(el).find('.formFields').attr('disabled', false);
                $(el).find('.formFields').show();
                // Enable Form Submit Button
                $(el).find('button').attr('disabled', false);
                $(el).submit(function (event) {
                    if (event) event.preventDefault();
                    if (validate_input($(el))) {
                        send($(el));
                    }
                });
            });
        }

        function send($form) {

            // Add Loading Status
            var btnSubmit = $form.find('.signupAction .btnText');
            if(!btnSubmit.dataAttr('text')) btnSubmit.dataAttr('text', btnSubmit.text());
            toggleSubmitButton(btnSubmit, 'off')


            var payload = makePayload($form);
            var meta = {
                'method': 'new'
            };
            Stratus.Internals.Api('User', meta, payload).done(function (response) {
                var success = false;
                var statusMessage = [];
                $.each(response.meta.status, function(i, el) {
                    if(el.code === 'SUCCESS') success = true;
                    statusMessage.push(el.message);
                });
                if (!success) {
                    errorResult($form, 'Oops, there was a problem ;( <br><br>'+statusMessage.join('<br><br>'));
                } else {
                    $form.hide();
                    $.each($form.parent().find('.success_message'), function (i, el) {
                        $(el).removeClass('hide');
                    });
                }
                toggleSubmitButton(btnSubmit, 'on')
            }, function () {
                errorResult($form);
                toggleSubmitButton(btnSubmit, 'on')
            });

        }

        function toggleSubmitButton(btnSubmit, status) {
            if(status == 'off') {
                btnSubmit.addClass('form-status-sending');
                btnSubmit.text('Sending...');
                btnSubmit.prop('disabled', true);
            } else {
                btnSubmit.removeClass('form-status-sending');
                btnSubmit.text(btnSubmit.dataAttr('text'));
                btnSubmit.prop('disabled', true);
            }
        }

        function errorResult($form, message) {
            if(!message) {
                message = 'Oops, there was a problem ;(';
            }
            $form.prepend('<div class="form-error">'+message+' <br><br>Email us at <a href="mailto:help@launchapp.io">help@launchapp.io</a> and we will add you manually.</div>');
            ga('send', 'event', 'error', 'form', $form.find('input[name="email"]').val());
        }


        function validate_email(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        function validate_input($form) {
            var inputs = $form.find('.form-control');
            // remove all errors
            var errors = $form.find('.form-error');
            errors.remove();
            var results = true;
            $.each(inputs, function(i, el) {
                $(el).removeClass('is-error');
                if($(el).hasClass('required')) {
                    var elError = null;
                    if(!$(el).val()) {
                        elError = 'Please provide a valid value.';
                    }
                    if($(el).attr('name')=='email') {
                        var emailValid = validate_email($(el).val());
                        if(!emailValid) {
                            elError = 'Please provide a valid email address.';
                        }
                    }
                    if(elError) {
                        results = false;
                        $(el).addClass('is-error');
                        $(el).before('<div class="form-error">'+elError+'</div>');
                    }
                }
            });
            return results;
        }

        // Customize Payload for this unique form
        function makePayload($form) {
            var dataObject = $form.serializeArray();
            var data = {};
            $.each(dataObject, function(i, el) {
                data[el.name] = el.value;
            });
            var payload = {
                'email': data.email,
                'profile': {
                    'gender': data.gender,
                    'relationshipStatus': data.relationshipStatus,
                    'zip': data.zip,
                    'ageGroup': data.ageGroup,
                    'mailLists': [parseInt(data.listId)]
                }
            };
            return payload;
        }



    });
}));


// Separate Require for Youtube, so that it doesn't slow down the other javascript on the page
(function (root, factory) {
    if (typeof require === 'function') {
        require(['stratus', 'jquery', 'https://www.youtube.com/player_api'], factory);
    } else {
        factory(root.Stratus, root.$);
    }
}(this, function (Stratus, $) {
    Stratus.DOM.ready(function () {

        // Track YouTube Actions
        if($('#launchVideo').length) {
            var player = new window.YT.Player('launchVideo', {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
            var pauseFlag = false;

            function onPlayerReady(event) {
                // do nothing, no tracking needed
            }

            function onPlayerStateChange(event) {
                var state = player.getPlayerState();
                var playerTime = parseInt(player.getCurrentTime()/10)*10;
                // Track Play
                if (state == 1) {
                    ga('send', 'event', 'videos', 'play', 'promo');
                    pauseFlag = true;
                }
                // Track Pause
                if (state == 2 && pauseFlag) {
                    ga('send', 'event', 'videos', 'pause', 'promo');
                    ga('send', 'event', 'videos', 'pauseTime', playerTime);
                    pauseFlag = false;
                }
                // Track Finish
                if (state == 0) {
                    ga('send', 'event', 'Videos', 'finished', 'promo');
                }
            }

            // Track Bounce
            Stratus.DOM.unload(function () {
                var playerTime = parseInt(player.getCurrentTime()/10)*10;
                ga('send', 'event', 'videos', 'bounceTime', playerTime);
            });
        }

    });
}));