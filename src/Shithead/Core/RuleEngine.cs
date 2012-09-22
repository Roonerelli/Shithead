using System.Collections.Generic;
using System.Linq;

namespace Shithead.Core
{
    public class RuleEngine
    {
        private static readonly Dictionary<Rank, List<Rank>> Rules;

        static RuleEngine()
        {
            Rules = new Dictionary<Rank, List<Rank>>();

            Rules.Add(Rank.Ace, new List<Rank>{Rank.Ace, Rank.Two, Rank.Three} );
            Rules.Add(Rank.Two, new List<Rank> { Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King });
            Rules.Add(Rank.Three, new List<Rank> {Rank.Three });
            Rules.Add(Rank.Four, new List<Rank> { Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King });
            Rules.Add(Rank.Five, new List<Rank> { Rank.Ace, Rank.Two, Rank.Three, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King });
            Rules.Add(Rank.Six, new List<Rank> { Rank.Ace, Rank.Two, Rank.Three, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King });
            Rules.Add(Rank.Seven, new List<Rank> { Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven });
            Rules.Add(Rank.Eight, new List<Rank> { Rank.Ace, Rank.Two, Rank.Three, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King });
            Rules.Add(Rank.Nine, new List<Rank> { Rank.Ace, Rank.Two, Rank.Three, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King });
            Rules.Add(Rank.Ten, new List<Rank> { Rank.Ace, Rank.Two, Rank.Three, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King });
            Rules.Add(Rank.Jack, new List<Rank> { Rank.Ace, Rank.Two, Rank.Three, Rank.Jack, Rank.Queen, Rank.King });
            Rules.Add(Rank.Queen, new List<Rank> { Rank.Ace, Rank.Two, Rank.Three, Rank.Queen, Rank.King });
            Rules.Add(Rank.King, new List<Rank> { Rank.Ace, Rank.Two, Rank.Three, Rank.King });
        }

        public static bool IsCardPlayable(Card playersCard, Card tableCard)
        {
            if (tableCard == null) // no cards down, so can play anything
            {
                return true;
            }

            return Rules[tableCard.Rank].Contains(playersCard.Rank);
        }

        public static bool AreAnyCardsPlayable(List<Card> playersCards, Card tableCard)
        {
            return playersCards.Any(playersCard => IsCardPlayable(playersCard, tableCard));
        }

        public static bool AreAllCardsEqual(List<Card> cards)
        {
            return cards.All(card => card.Rank.Equals(cards[0].Rank));
        }
    }
}
