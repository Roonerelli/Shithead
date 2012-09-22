using System.Collections.Generic;
using Tests;

public class BaseGameTest
{
    protected Game GetGame()
    {
        Game game = new Game(new Deck());

        game.AddPlayer(new Player());
        game.AddPlayer(new Player());
        game.AddPlayer(new Player());
        game.AddPlayer(new Player());
        game.AddPlayer(new Player());
        game.StartGame();
        return game;
    }

    protected Hand CreateHandFromFirstNineCardsOfGivenSuit(Suit suit)
    {
        return new Hand
        {
            FaceDownCards = new List<Card>
            {
                new Card(suit, Rank.Ace),
                new Card(suit, Rank.Two),
                new Card(suit, Rank.Three)
            },
            FaceUpCards = new List<Card>
            {
                new Card(suit, Rank.Four),
                new Card(suit, Rank.Five),
                new Card(suit, Rank.Six)

            },
            InHandCards = new List<Card>
            {
                new Card(suit, Rank.Seven),
                new Card(suit, Rank.Eight),
                new Card(suit, Rank.Nine)                                  
            }
        };
    }

    protected Hand CreateHandWithSpecificInHandCards(Suit suit, Card cardOne, Card cardTwo, Card cardThree)
    {
        return new Hand
        {
            FaceDownCards = new List<Card>
            {
                cardOne,
                cardTwo,
                cardThree
            },
            FaceUpCards = new List<Card>
            {
                new Card(suit, Rank.Four),
                new Card(suit, Rank.Five),
                new Card(suit, Rank.Six)

            },
            InHandCards = new List<Card>
            {
                new Card(suit, Rank.Seven),
                new Card(suit, Rank.Eight),
                new Card(suit, Rank.Nine)                                  
            }
        };
    }
}