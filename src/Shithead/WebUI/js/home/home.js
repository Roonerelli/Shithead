APP.home = function () {
    function _init() {
        // controller-wide code
        //alert('home init');
    }

    function _index() {
        // action-specific code
        

        (function ($) {
            $(function () {
                $(document).foundationMediaQueryViewer();

                $(document).foundationAlerts();
                $(document).foundationAccordion();
                $(document).tooltips();
                $('input, textarea').placeholder();



                $(document).foundationButtons();



                $(document).foundationNavigation();



                $(document).foundationCustomForms();




                $(document).foundationTabs({ callback: $.foundation.customForms.appendCustomMarkup });




                $("#featured").orbit();


                // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
                // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'left'});
                // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'left'});
                // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'left'});
                // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'left'});
            });

        })(jQuery);

    }

    return {
        init: _init,
        index: _index
    };
} ();
