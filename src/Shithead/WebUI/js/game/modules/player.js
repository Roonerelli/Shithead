var Player = function (playerData, playerIndex, game) {

    this.game = game;
    this.playerId = playerData.Id;
    this.playerIndex = playerIndex;
    this.isThisPlayersTurn = playerData.IsThisPlayersTurn;
    this.isAbleToPlay = playerData.IsAbleToPlay;
    this.name = playerData.Name;
    this.container = new createjs.Container();
    this.hand = new Hand(playerData.Hand, this);
};

Player.prototype = {

    constructor: Player,

    draw: function (stage) {
        
        this.hand.setPosition("player" + this.playerIndex, this.container);
        this.hand.draw(this.container);

        stage.addChild(this.container);
    }
};