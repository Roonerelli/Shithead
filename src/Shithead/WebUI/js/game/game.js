APP.game = function () {

    var gameHub,
        stage,
        pickupPack = [],
        clearedCards = [];

    var layoutParams = {
        "player0": { x: 200, y: 180, rot: 90, packX: 70, packY: -325 },
        "player1": { x: 450, y: 200, rot: 180, packX: -40, packY: -150 },
        "player2": { x: 700, y: 200, rot: 180, packX: 190, packY: -150 },
        "player3": { x: 250, y: 400, rot: 0, packX: 190, packY: -150 },
        "player4": { x: 500, y: 400, rot: 0, packX: -40, packY: -150 },
        "player5": { x: 750, y: 400, rot: 270, packX: 70, packY: -325 }
    };

    var Hand = function (handData) {

        var self = this;

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

    var Card = function (rank, suit, isFaceUp, hand) {
        this.suit = suit;
        this.rank = rank;
        this.isFaceUp = isFaceUp;
        this.isBeingPlayed = false;
        this.imgUri = this.isFaceUp
                            ? this.getImage(this.rank, this.suit)
                            : '/content/images/cards/0504.png';
        this.bmp = new createjs.Bitmap(this.imgUri);
        this.hand = hand;
        createjs.Ticker.addListener(this);
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
                //console.log("this: " + container.getChildIndex(self.bmp));
                var noOfChildren = container.getNumChildren();
                var topChild = container.getChildAt(noOfChildren - 1);
                //console.log("top child: " + container.getChildIndex(topChild));

                container.setChildIndex(self.bmp, noOfChildren);
                //console.log("this: " + container.getChildIndex(self.bmp));
                //console.log("top child: " + container.getChildIndex(topChild));
                self.isBeingPlayed = true;

                var cards = [{ "Suit": self.suit, "Rank": self.rank}];
                
                gameHub.playCards(cards);
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

    function _init() { }

    function _index() {

        $(document).ready(function () {

            gameHub = $.connection.gameHub;

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
                console.log(data);

                data.Players.forEach(function (player, i) {
                    var container = new createjs.Container();

                    var hand = new Hand(player.Hand);
                    //hand.initialiseHand(player.Hand);
                    hand.player = "player" + i;
                    hand.setPosition("player" + i, container);
                    hand.draw(container);

                    stage.addChild(container);
                });
            };

            $('#joinGame').click(function () {
                gameHub.joinGame();
            });

            $('#beginGame').click(function () {

                var url = window.location.pathname;
                var id = url.substr(url.lastIndexOf('/') + 1);
                console.log(id);
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
                    $('#gameList').append('<li>sssss</li>');
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