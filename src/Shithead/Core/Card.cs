namespace Shithead.Core
{
    public class Card
    {
        public Card()
        {
            
        }
        public Card(Suit suit, Rank rank)
        {
            Suit = suit;
            Rank = rank;
        }

        public Suit Suit { get; set; }
        public Rank Rank { get; set; }
    }
}

