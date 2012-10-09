var Game = function (gameData, stage) {

    var self = this;

    this.gameHub = gameHub;

    this.faceDownCards = handData.FaceDownCards.map(function (card, i) {
        return new Card(card.Rank, card.Suit, false, self);
    });

    this.faceUpCards = handData.FaceUpCards.map(function (card, i) {
        return new Card(card.Rank, card.Suit, true, self);
    });

    this.inHandCards = handData.InHandCards.map(function (card, i) {
        return new Card(card.Rank, card.Suit, true, self);
    });
};

Game.prototype = {

    constructor: Game,

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
    }
};