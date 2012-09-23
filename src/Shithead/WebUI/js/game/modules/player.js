var Player = function (playerData) {
    var self = this;
    this.hand = playerData.Hand;
    this.playerId = playerData.Id;
    this.isThisPlayersTurn = playerData.IsThisPlayersTurn;
    this.isAbleToPlay = playerData.IsAbleToPlay;
    this.name = playerData.Name;
};

Player.prototype = {

    constructor: Player,

    draw: function (container) {

        this.faceDownCards.forEach(function (card, i) {
            card.draw(container);
        });

        this.faceUpCards.forEach(function (card, i) {
            card.draw(container);
        });

        this.inHandCards.forEach(function (card, i) {
            card.draw(container);
        });
    },

    setPosition: function (playerIndex, container) {

        container.x = layoutParams[playerIndex].x;
        container.y = layoutParams[playerIndex].y;
        container.rotation = layoutParams[playerIndex].rot;

        this.faceDownCards.forEach(function (card, i) {
            card.setPosition(i * 70, 0);
        });
        this.faceUpCards.forEach(function (card, i) {
            card.setPosition(i * 70, 60);
        });
        this.inHandCards.forEach(function (card, i) {
            card.setPosition(i * 20, 80);
        });
    }
};