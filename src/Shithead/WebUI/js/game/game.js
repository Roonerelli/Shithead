APP.game = function () {

    function _init() { }

    function _index() {

        
        var gameHub = $.connection.gameHub;
            
        $.connection.hub.start()
            .done(function () {
                console.log("connected...");
            })
            .fail(function () {
                alert("Could not Connect!");
            });

        var canvas = document.getElementById("gameCanvas");
        var stage = new createjs.Stage(canvas);
        stage.enableMouseOver(50);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addListener(stage);

        gameHub.recieveGameState = function (data) {
            console.log(data);

            var game = new Game(data, gameHub);
            game.draw(stage);
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