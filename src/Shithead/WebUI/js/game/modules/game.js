var Game = function (gameData, gameHub) {
    var self = this;

    this.gameHub = gameHub;
    this.pickUpPack = gameData.PickUpPack;
    this.clearedCards = gameData.ClearedCards;
    this.deck = gameData.Deck;

    this.players = gameData.Players.map(function (player, i) {
        return new Player(player, i, self);
    });

    this.layoutParams = {
        "player0": { x: 200, y: 180, rot: 90, packX: 70, packY: -325 },
        "player1": { x: 450, y: 200, rot: 180, packX: -40, packY: -150 },
        "player2": { x: 700, y: 200, rot: 180, packX: 190, packY: -150 },
        "player3": { x: 750, y: 400, rot: 270, packX: 70, packY: -325 },
        "player4": { x: 250, y: 400, rot: 0, packX: 190, packY: -150 },
        "player5": { x: 500, y: 400, rot: 0, packX: -40, packY: -150 }
    };
};

Game.prototype = {

    constructor: Game,

    draw: function (stage) {
        
        this.players.forEach(function (player, i) {
            player.draw(stage);
        });
    }
};