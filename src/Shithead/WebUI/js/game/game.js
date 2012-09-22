APP.game = function () {

    var stage,
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
                console.log("this: " + container.getChildIndex(self.bmp));
                var noOfChildren = container.getNumChildren();
                var topChild = container.getChildAt(noOfChildren - 1);
                console.log("top child: " + container.getChildIndex(topChild));

                //container.swapChildren(self.bmp, topChild);
                container.setChildIndex(self.bmp, noOfChildren);
                //container.setChildIndex(topChild, noOfChildren - 1);
                console.log("this: " + container.getChildIndex(self.bmp));
                console.log("top child: " + container.getChildIndex(topChild));
                self.isBeingPlayed = true;
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

        //        $.connection.hub.start()
        //        .done(function () {
        //            //alert("Now connected!");
        //            //gameHub.start();
        //            gameHub.connect();

        //        })
        //        .fail(function () { alert("Could not Connect!"); });


        //        var gameHub = $.connection.gameHub;

        //        gameHub.addMessage = function (data) {
        //            console.log(data);
        //        };



        var canvas = document.getElementById("gameCanvas");
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(50);
        var gameState = { "Players": [{ "Id": "8f43380c-7402-4585-88fc-e1d0b1040272", "Hand": { "FaceDownCards": [{ "Suit": 0, "Rank": 5 }, { "Suit": 0, "Rank": 8 }, { "Suit": 3, "Rank": 8}], "FaceUpCards": [{ "Suit": 0, "Rank": 12 }, { "Suit": 1, "Rank": 12 }, { "Suit": 1, "Rank": 0}], "InHandCards": [{ "Suit": 1, "Rank": 8 }, { "Suit": 1, "Rank": 3 }, { "Suit": 0, "Rank": 2}] }, "IsThisPlayersTurn": true, "IsAbleToPlay": true, "Name": "Chris", "PlayerState": 0 }, { "Id": "82d518a3-4923-46ab-8e11-5de4604dc059", "Hand": { "FaceDownCards": [{ "Suit": 3, "Rank": 11 }, { "Suit": 1, "Rank": 4 }, { "Suit": 0, "Rank": 0}], "FaceUpCards": [{ "Suit": 2, "Rank": 0 }, { "Suit": 1, "Rank": 1 }, { "Suit": 3, "Rank": 4}], "InHandCards": [{ "Suit": 2, "Rank": 2 }, { "Suit": 2, "Rank": 7 }, { "Suit": 2, "Rank": 4}] }, "IsThisPlayersTurn": false, "IsAbleToPlay": true, "Name": "Vik", "PlayerState": 0 }, { "Id": "aa7ec630-5a6d-47b8-8365-456a138be833", "Hand": { "FaceDownCards": [{ "Suit": 2, "Rank": 8 }, { "Suit": 3, "Rank": 10 }, { "Suit": 0, "Rank": 10}], "FaceUpCards": [{ "Suit": 3, "Rank": 9 }, { "Suit": 3, "Rank": 6 }, { "Suit": 2, "Rank": 1}], "InHandCards": [{ "Suit": 3, "Rank": 0 }, { "Suit": 0, "Rank": 1 }, { "Suit": 3, "Rank": 2}] }, "IsThisPlayersTurn": false, "IsAbleToPlay": true, "Name": "Val", "PlayerState": 0 }, { "Id": "35fd0fbe-4bea-4493-a854-6df9bf9c37ee", "Hand": { "FaceDownCards": [{ "Suit": 1, "Rank": 9 }, { "Suit": 3, "Rank": 3 }, { "Suit": 2, "Rank": 10}], "FaceUpCards": [{ "Suit": 2, "Rank": 3 }, { "Suit": 0, "Rank": 6 }, { "Suit": 0, "Rank": 7}], "InHandCards": [{ "Suit": 1, "Rank": 10 }, { "Suit": 3, "Rank": 1 }, { "Suit": 3, "Rank": 7}] }, "IsThisPlayersTurn": false, "IsAbleToPlay": true, "Name": "Mollusc", "PlayerState": 0 }, { "Id": "24202985-4576-456f-ab08-412425bb332e", "Hand": { "FaceDownCards": [{ "Suit": 3, "Rank": 5 }, { "Suit": 2, "Rank": 9 }, { "Suit": 0, "Rank": 11}], "FaceUpCards": [{ "Suit": 2, "Rank": 11 }, { "Suit": 2, "Rank": 12 }, { "Suit": 0, "Rank": 9}], "InHandCards": [{ "Suit": 1, "Rank": 5 }, { "Suit": 1, "Rank": 11}] }, "IsThisPlayersTurn": false, "IsAbleToPlay": true, "Name": "Satch", "PlayerState": 0 }, { "Id": "88b256f5-5a11-4160-a880-cb74b2dc5e35", "Hand": { "FaceDownCards": [{ "Suit": 0, "Rank": 3 }, { "Suit": 1, "Rank": 7 }, { "Suit": 0, "Rank": 4}], "FaceUpCards": [{ "Suit": 2, "Rank": 5 }, { "Suit": 1, "Rank": 2 }, { "Suit": 3, "Rank": 12}], "InHandCards": [{ "Suit": 2, "Rank": 6 }, { "Suit": 1, "Rank": 6}] }, "IsThisPlayersTurn": false, "IsAbleToPlay": true, "Name": "Pest", "PlayerState": 0}], "Deck": [], "PickUpPack": [], "ClearedCards": [], "CurrentPlayer": { "Id": "8f43380c-7402-4585-88fc-e1d0b1040272", "Hand": { "FaceDownCards": [{ "Suit": 0, "Rank": 5 }, { "Suit": 0, "Rank": 8 }, { "Suit": 3, "Rank": 8}], "FaceUpCards": [{ "Suit": 0, "Rank": 12 }, { "Suit": 1, "Rank": 12 }, { "Suit": 1, "Rank": 0}], "InHandCards": [{ "Suit": 1, "Rank": 8 }, { "Suit": 1, "Rank": 3 }, { "Suit": 0, "Rank": 2}] }, "IsThisPlayersTurn": true, "IsAbleToPlay": true, "Name": "Chris", "PlayerState": 0} };

        gameState.Players.forEach(function (player, i) {
            var container = new createjs.Container();

            var hand = new Hand(player.Hand);
            //hand.initialiseHand(player.Hand);
            hand.player = "player" + i;
            hand.setPosition("player" + i, container);
            hand.draw(container);

            stage.addChild(container);
        });

        createjs.Ticker.setFPS(60);
        createjs.Ticker.addListener(stage);
    }

    return {
        init: _init,
        index: _index
    };

    //    ajaxData: function () {
    //        $(document).ready(function () {
    //            $('form').submit(function (e) {
    //                e.preventDefault();
    //                var appointment = { "cards": [{ "Suit": 0, "Rank": 0 }, { "Suit": 0, "Rank": 1 }, { "Suit": 0, "Rank": 2}] };
    //                //var appointment = {"cards":{"Suit":0,"Rank":0}}; 

    //                $.ajax({
    //                    url: '/game/playcards',
    //                    type: 'POST',
    //                    data: JSON.stringify(appointment),
    //                    dataType: 'json',
    //                    processData: false,
    //                    contentType: 'application/json; charset=utf-8',
    //                    success: function (data) {
    //                        alert('Done');
    //                    },
    //                    error: function (xhr, err) {
    //                        alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
    //                        alert("responseText: " + xhr.responseText);
    //                    }
    //                });
    //            });
    //        });
    //    }
} ();