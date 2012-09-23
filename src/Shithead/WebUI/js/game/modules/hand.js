var Hand = function (handData, gameHub) {

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

Hand.prototype = {

    constructor: Hand,

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

    setPosition: function (playerIndex, container, layoutParams) {

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