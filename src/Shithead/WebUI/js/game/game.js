APP.game = function () {

    var stage,
        pickupPack = [],
        clearedCards = [];

    var layoutParams = {
        "player0": { x: 200, y: 180, rot: 90, packX: 70, packY: -325 },
        "player1": { x: 450, y: 200, rot: 180, packX: -40, packY: -150 },
        "player2": { x: 700, y: 200, rot: 180, packX: 190, packY: -150 },
        "player3": { x: 750, y: 400, rot: 270, packX: 70, packY: -325 },
        "player4": { x: 250, y: 400, rot: 0, packX: 190, packY: -150 },
        "player5": { x: 500, y: 400, rot: 0, packX: -40, packY: -150 }
    };


    function _init() { }

    function _index() {

        $(document).ready(function () {

            var gameHub = $.connection.gameHub;
            var game;

            $.connection.hub.start()
                .done(function () {
                    console.log("connected...");
                })
                .fail(function () {
                    alert("Could not Connect!");
                });

            var canvas = document.getElementById("gameCanvas");
            stage = new createjs.Stage(canvas);
            stage.enableMouseOver(50);
            createjs.Ticker.setFPS(60);
            createjs.Ticker.addListener(stage);

            gameHub.recieveGameState = function (data) {
                stage.clear();

                data.Players.forEach(function (player, i) {
                    var container = new createjs.Container();

                    var hand = new Hand(player.Hand, gameHub);
                    hand.player = "player" + i;
                    hand.playerId = player.Id;
                    hand.setPosition("player" + i, container, layoutParams);
                    hand.draw(container);

                    stage.addChild(container);
                });
            };

            gameHub.recieveError = function (data) {
                console.log(data);
                alert(data);
            };

            $('#joinGame').click(function () {
                gameHub.joinGame();
            });

            $('#beginGame').click(function () {
                var id = $('#gameId').val();
                gameHub.beginGame(id);
            });
        });
    }

    function _join() {

        $('#newGame').click(function () {
            newGame();
        });

        function newGame() {
            jQuery.support.cors = true;

            $.ajax({
                url: 'http://localhost:50105/api/gameapi',
                type: 'POST',
                //data: JSON.stringify(employee),
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    $('#gameList').append('<li>New Game....</li>');
                },
                error: function (x, y, z) {
                    alert(x + '\n' + y + '\n' + z);
                }
            });
        }
    }

    return {
        init: _init,
        index: _index,
        join: _join
    };

} ();