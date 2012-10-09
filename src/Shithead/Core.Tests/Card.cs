using System;

namespace Tests
{
    public struct Card
    {
        public Suit Suit { get; set; }
        public Rank Rank { get; set; }

        public Card(Suit suit, Rank rank) : this()
        {
            Suit = suit;
            Rank = rank;
        }

        // helper for quickly creating cards in tests
        public Card(string suit, int rank) : this()
        {
            Suit = GetSuitFromString(suit);
            Rank = (Rank)rank;
        }

        private Suit GetSuitFromString(string suit)
        {
            switch (suit)
            {
                case "D" :
                    return Suit.Diamond;
                case "H":
                    return Suit.Heart;
                case "S":
                    return Suit.Spade;
                case "C":
                    return Suit.Club;
            }

            throw new Exception("Specified string doesn't represent a suit. ");
        }

        public override string ToString()
        {
            return string.Format("{0} of {1}s", Rank, Suit);
        }
    }
}