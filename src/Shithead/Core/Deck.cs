using System;

namespace Shithead.Core
{
    public class Deck : CardList
    {
        public bool IsEmpty
        {
            get
            {
                return this.Count == 0;
            }
        }

        public Deck()
        {
            foreach (Suit suit in Enum.GetValues(typeof(Suit)))
            {
                foreach (Rank rank in Enum.GetValues(typeof(Rank)))
                {
                    this.Add(new Card(suit, rank));
                }
            }
        }

        public void Shuffle()
        {
            var rng = new Random(DateTime.Now.Millisecond);
            int n = this.Count;

            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                Card value = this[k];
                this[k] = this[n];
                this[n] = value;
            }
        }

        public Card TakeTopCard()
        {
            Card card = this[0];
            Remove(card);
            return card;
        }
    }
}
