/* Author:

*/


APP = {
    common: {
        init: function () {
            // application-wide code
            alert('common init');
        }
    },

    home: {
        init: function () {
            // controller-wide code
            alert('home init');
        },

        index: function () {
            // action-specific code
            alert('home index');
        }
    },

    game: {
        init: function () {
            alert('game init');
        },

        index: function () {
            alert('game index');
        }
    }
};

UTIL = {
    exec: function (controller, action) {
        var ns = APP,
        action = (action === undefined) ? "init" : action;

        if (controller !== "" && ns[controller] && typeof ns[controller][action] == "function") {
            ns[controller][action]();
        }
    },

    init: function () {
        var body = document.body,
        controller = body.getAttribute("data-controller").toLowerCase(),
        action = body.getAttribute("data-action").toLowerCase();

        UTIL.exec("common");
        UTIL.exec(controller);
        UTIL.exec(controller, action);
    }
};

$(document).ready(UTIL.init);




