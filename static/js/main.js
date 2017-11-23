var jaeminsung = (function () {
    'use strict';

    function outboundSiteClick() {
        var qs;
        qs = {
            event: 'exit',
            url: jQuery(this).attr('href').replace(/https?:\/\//, '').replace(/\/$/, '')
        };
        jQuery.get('/tracking', qs);
    }

    function greet(answer) {
        var qs = {
            type: answer
        };

        jQuery.get('/greeting', qs, function (data) {
            jQuery('#who .trigger').addClass('hidden');
            jQuery('#who .answers').addClass('hidden');
            jQuery('#who .response').removeClass('hidden').text(data);
            localStorage.setItem('greeting', answer);
        });
    }

    function testCapabilities() {
        var keyword = 'after all';

        if (!window.localStorage) {
            return;
        }

        if (window.localStorage.getItem('human') === keyword) {
            return;
        }

        jQuery('BODY').one('touchstart mousemove', function (e) {
            jQuery.get('/caps', {
                m: (e.type === 'mousemove')? 1:0,
                w: screen.width,
                h: screen.height,
                ah: screen.availHeight,
                al: screen.availLeft,
                at: screen.availTop,
                aw: screen.availWidth,
                px: screen.pixelDepth,
                sx: window.screenX,
                sy: window.screenY
            });
            window.localStorage.setItem('human', keyword);
        });
    }

    return {
        init: function () {
            var greeting;
            jQuery('A[rel=external]').click(outboundSiteClick);

            jQuery('#who .trigger').on('click', function (e) {
                e.preventDefault();
                jQuery('#who .answers').toggleClass('hidden');
            });

            jQuery('#who .answers A').on('click', function (e) {
                e.preventDefault();

                greet(jQuery(this).attr('data-answer'));

            });

            greeting = localStorage.getItem('greeting');

            if (greeting) {
                greet(greeting);
            } else {
                jQuery('#who .trigger').removeClass('hidden');
            }

            testCapabilities();

        }
    };
}());

jQuery(document).ready(jaeminsung.init);