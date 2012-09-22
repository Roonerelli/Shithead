/* Author:

*/


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




