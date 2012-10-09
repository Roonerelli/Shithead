using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using Moq;
using NUnit.Framework;
using Tests;


[TestFixture]
public class GameTests : BaseGameTest
{
    [Test]
    public void A_new_game_initialises_the_deck()
    {
        Mock<IDeck> mock = new Mock<IDeck>();
        mock.Setup(m => m.InitialiseDeck())
            .Verifiable();

        Game game = new Game(mock.Object);

        mock.Verify(m => m.InitialiseDeck());
    }

    [Test]
    public void New_game_starts_with_a_full_deck_of_cards()
    {
        Game game = new Game(new Deck());
        Assert.AreEqual(52, game.Deck.Count);
    }

    [Test]
    public void New_game_has_no_players()
    {
        Game game = new Game(new Deck());
        Assert.AreEqual(0, game.Players.Count);
    }

    [Test]
    public void Players_can_join_a_game()
    {
        Game game = new Game(new Deck());
        game.AddPlayer(new Player());

        Assert.AreEqual(1, game.Players.Count);
    }

    [Test]
    [ExpectedException(typeof(InvalidOperationException))]
    public void Starting_a_game_without_at_least_two_players_throws_exception()
    {
        Game game = new Game(new Deck());
        game.StartGame();

        Assert.IsTrue(game.Players.Count > 1);
    }

    [Test]
    public void When_a_game_is_started_the_deck_is_shuffled()
    {
        Mock<IDeck> mock = new Mock<IDeck>();
        mock.Setup(m => m.Shuffle())
            .Verifiable();
            
        Game game = new Game(mock.Object);
        game.AddPlayer(new Player());
        game.AddPlayer(new Player());
        game.StartGame();

        mock.Verify(m => m.Shuffle());
    }

    [Test]
    public void Taking_a_card_from_the_deck_reduces_the_count_by_one()
    {
        IDeck deck = new Deck();
        deck.InitialiseDeck();
        deck.TakeTopCard();
        Assert.AreEqual(51, deck.Count);
    }

    [Test]
    [TestCase(2)]
    [TestCase(3)]
    [TestCase(4)]
    [TestCase(5)]
    public void When_a_game_starts_every_player_has_a_valid_hand(int numOfplayers)
    {
        Game game = new Game(new Deck());

        for (int i = 0; i < numOfplayers; i++)
        {
            game.AddPlayer(new Player());
        }
        game.StartGame();

        foreach (var player in game.Players)
        {
            Assert.AreEqual(3, player.Hand.FaceDownCards.Count);
            Assert.AreEqual(3, player.Hand.FaceUpCards.Count);
            Assert.AreEqual(3, player.Hand.InHandCards.Count);
        }
    }

    [Test]
    public void When_game_starts_its__the_first_players_turn_only()
    {
        var game = GetGame();
        Assert.AreEqual(1, game.Players.Count(plyr => plyr.IsMyTurn));
        Assert.IsTrue(game.Players[0].IsMyTurn);
    }

    [Test]
    public void Playing_a_card_when_have_inhand_cards_removes_then_from_inhand_cards()
    {
        var game = GetGame();
            
        Card card = game.Players[0].Hand.InHandCards[0];
        game.Players[0].PlayCards(new List<Card> { card });

        Assert.AreEqual(2, game.Players[0].Hand.InHandCards.Count);
    }

    [Test]
    public void Played_cards_end_up_on_the_pickup_pile()
    {
        var game = GetGame();
            
        Card card = game.Players[0].Hand.InHandCards[0];
        game.Players[0].PlayCards(new List<Card> { card });

        Assert.AreEqual(1, game.PickUpPile.Count);
        Assert.AreEqual(card, game.PickUpPile[0]);
    }

    [Test]
    public void Can_play_two_card_of_the_same_rank()
    {
        var game = GetGame();
        Hand hand = CreateHandWithSpecificInHandCards(Suit.Spade, new Card("S", 0), new Card("H", 0), new Card("C", 3));

        game.Players[0].Hand = hand;
        game.Players[0].PlayCards(new List<Card> {  new Card("S", 0), new Card("H", 0) });

        Assert.AreEqual(2, game.PickUpPile.Count);
        Assert.AreEqual(new Card("S", 0), game.PickUpPile[0]);
        Assert.AreEqual(new Card("H", 0), game.PickUpPile[1]);
    }

    [Test]
    public void Can_play_three_card_of_the_same_rank()
    {
        var game = GetGame();
        Hand hand = CreateHandWithSpecificInHandCards(Suit.Spade, new Card("S", 0), new Card("H", 0), new Card("C", 0));

        game.Players[0].Hand = hand;
        game.Players[0].PlayCards(new List<Card> { new Card("S", 0), new Card("H", 0), new Card("C", 0) });

        Assert.AreEqual(3, game.PickUpPile.Count);
        Assert.AreEqual(new Card("S", 0), game.PickUpPile[0]);
        Assert.AreEqual(new Card("H", 0), game.PickUpPile[1]);
        Assert.AreEqual(new Card("C", 0), game.PickUpPile[2]);
    }

    // exception if try to play a card that is not in your hand
    // not allowed to play cards that arent the same rank
    // after playing your cards it's the next players turn
    // 4 of same suit clears em - in hand - or by making 4 on the table
    // always need to play same rank or higher
    // except
    // if you cant play you have to pick up

}

public class Player
{
    public Game CurrenctGame { get; set; }

    public Hand Hand { get; set; }

    public bool IsMyTurn { get; set; }

    public Player()
    {
        Hand = new Hand();
    }

    public void SwapCards(List<Card> faceUpCards, List<Card> faceDownCards)
    {
        if (faceUpCards.Count != faceDownCards.Count || faceUpCards.Count == 0)
            throw new InvalidOperationException("Can't swap differing number of cards or no cards given to swap. ");

        // check supplied cards exist in appropriiate part of hand
        //foreach (var card in faceUpCards)
        //{
        //    if(ca)
        //}
    }

    public void PlayCards(List<Card> cards)
    {
        foreach (var card in cards)
        {
            Hand.InHandCards.Remove(card);
            CurrenctGame.PickUpPile.Add(card);
        }
    }
}

public class Game
{
    public Game(IDeck deck)
    {
        Deck = deck;
        deck.InitialiseDeck();
        Players = new List<Player>();
        PickUpPile = new List<Card>();
    }

    public IDeck Deck { get; set; }

    public IList<Player> Players { get; set; }

    public IList<Card> PickUpPile { get; set; }

    public void AddPlayer(Player player)
    {
        player.CurrenctGame = this;
        Players.Add(player);
    }

    public void StartGame()
    {
        if (Players.Count < 2)
            throw new InvalidOperationException("A game needs at least 2 players. ");

        Deck.Shuffle();
        DealStartingCards();
        Players[0].IsMyTurn = true;
    }


    private void DealStartingCards()
    {
        DealCards(hand => hand.FaceDownCards);
        DealCards(hand => hand.FaceUpCards);
        DealCards(hand => hand.InHandCards);
    }

    private void DealCards(Func<Hand, List<Card>> handProjection)
    {
        for (int i = 0; i < 3; i++)
        {
            foreach (var player in Players)
            {
                List<Card> cards = handProjection(player.Hand);
                if (cards.Count < 3)
                {
                    if (!Deck.IsEmpty)
                    {
                        cards.Add(Deck.TakeTopCard());
                    }
                }
            }
        }
    }
}

public interface IDeck
{
    void Shuffle();
    int Count { get; }
    bool IsEmpty { get;}
    void InitialiseDeck();
    Card TakeTopCard();
}

public class Deck : IDeck
{
    readonly IList<Card> _cardsInTheDeck = new List<Card>();

    public int Count
    {
        get
        {
            return _cardsInTheDeck.Count;
        }
    }

    public bool IsEmpty
    {
        get
        {
            return _cardsInTheDeck.Count == 0;
        }
    }

    public void InitialiseDeck()
    {
        foreach (Suit suit in Enum.GetValues(typeof(Suit)))
        {
            foreach (Rank rank in Enum.GetValues(typeof(Rank)))
            {
                _cardsInTheDeck.Add(new Card(suit, rank));
            }
        }
    }

    public Card TakeTopCard()
    {
        Card card = _cardsInTheDeck[0];
        _cardsInTheDeck.Remove(card);
        return card;
    }

    public void Shuffle()
    {
        var rng = new Random(DateTime.Now.Millisecond);
        int n = _cardsInTheDeck.Count;

        while (n > 1)
        {
            n--;
            int k = rng.Next(n + 1);
            Card value = _cardsInTheDeck[k];
            _cardsInTheDeck[k] = _cardsInTheDeck[n];
            _cardsInTheDeck[n] = value;
        }
    }
}

