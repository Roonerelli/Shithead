var Card = function (rank, suit, isFaceUp, hand) {
    console.log('New Card');
    this.suit = suit;
    this.rank = rank;
    this.isFaceUp = isFaceUp;
    this.isBeingPlayed = false;
    this.imgUri = this.isFaceUp
                            ? this.getImage(this.rank, this.suit)
                            : '/content/images/cards/0504.png';
    this.bmp = new createjs.Bitmap(this.imgUri);
    this.hand = hand;
    //createjs.Ticker.addListener(this);
};

Card.prototype = {

    constructor: Card,

    draw: function (container) {
        var self = this;

        container.addChild(this.bmp);

        this.bmp.x = this.x;
        this.bmp.y = this.y;
        this.bmp.rotation = this.rotation;

        this.bmp.onMouseOver = function () {
            self.bmp.scaleX += 0.1;
            self.bmp.scaleY += 0.1;
        };

        this.bmp.onMouseOut = function () {
            self.bmp.scaleX -= 0.1;
            self.bmp.scaleY -= 0.1;
        };

        this.bmp.onClick = function () {
            var noOfChildren = container.getNumChildren();
            
            container.setChildIndex(self.bmp, noOfChildren);
            
            var turn = {
                gameId: $('#gameId').val(),
                playerId: self.hand.playerId,
                cardsPlayed: [{ "Suit": self.suit, "Rank": self.rank}]
            };

            self.hand.gameHub.playCards(turn);
        };
    },

    setPosition: function (x, y) {
        this.x = x;
        this.y = y;
    },

    getImage: function (rank, suit) {
        suit = suit + 1;
        rank = rank + 1;
        var r = rank < 10 ? '0' + rank : rank;
        var s = suit < 10 ? '0' + suit : suit;

        var src = '/content/images/cards/' + s + r + '.png';
        return src;
    },

    tick: function () {
        if (this.isBeingPlayed) {

            var layoutParams = this.player.game.layoutParams;

            var playerIndx = this.hand.player,
                    packX = layoutParams[playerIndx].packX,
                    packY = layoutParams[playerIndx].packY,
                    ratio = Math.abs(this.bmp.x - packX) / Math.abs(this.bmp.y - packY);

            if (this.bmp.x < packX) {
                this.bmp.x += 7 * ratio;
                this.bmp.rotation += 10;
            }

            if (this.bmp.y < packY) {
                this.bmp.y += 7;
                this.bmp.rotation += 10;
            }

            if (this.bmp.x > packX) {
                this.bmp.x -= 7 * ratio;
                this.bmp.rotation += 10;
            }

            if (this.bmp.y > packY) {
                this.bmp.y -= 7;
                this.bmp.rotation += 10;
            }

            //this.bmp.x = stage.mouseY - 200;
            //this.bmp.y = stage.mouseX -200;
            //this.bmp.rotation += 90;
        }
    }
};