var APP = {};

APP.common = function () {
    function _init() {
        // application-wide code
        //alert('common init');

        $(document).ready(function () {
            var canvas = document.getElementById("testCanvas");
            var stage = new Stage(canvas);
            stage.enableMouseOver(50);
            var container = new Container();
            var i1 = new Rectangle(50, 50, 50, 50);
            //i1.x = 50;
            //i1.y = 50;

            var i2 = new Rectangle(60, 60, 60, 60);
            //i2.x = 60;
            //i2.y = 60;

            stage.addChild(i1);
            stage.addChild(i2);

            i1.onClick = function () {
                //stage.setChildIndex(container, 10);
                console.log("1: " + stage.getChildIndex(i1));
                console.log("2: " + stage.getChildIndex(i2));
                //var noOfChildren = container.getNumChildren();
                //var topChild = container.getChildAt(noOfChildren - 1);
                //console.log("top child: " + container.getChildIndex(topChild));

                //container.swapChildren(i2, i1);
                //container.setChildIndex(i1, 1);
                //container.setChildIndex(i2, 0);
                console.log("1: " + stage.getChildIndex(i1));
                console.log("2: " + stage.getChildIndex(i2));
            };

            stage.addChild(container);
            Ticker.setFPS(60);
            Ticker.addListener(stage);
            Ticker.addListener(container);

        });

    }

    return {
        init: _init
    };
} ();