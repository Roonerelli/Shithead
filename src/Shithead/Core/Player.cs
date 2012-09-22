using System;

namespace Shithead.Core
{
    public class Player
    {
        public Guid Id { get; internal set; }
        //public Game CurrentGame { get; internal set; }
        public Hand Hand { get; internal set; }
        public bool IsThisPlayersTurn { get; internal set; }
        public bool IsAbleToPlay { get; internal set; }
        public string Name { get; internal set; }

        public PlayerState PlayerState
        {
            get
            {
                if (this.Hand.InHandCards.Count > 0)
                {
                    return PlayerState.PlayingHandCards;
                }

                if (this.Hand.FaceUpCards.Count > 0)
                {
                    return PlayerState.PlayingFaceUpCards;
                }

                if (this.Hand.FaceDownCards.Count > 0)
                {
                    return PlayerState.PlayingFaceDownCards;
                }

                return PlayerState.HasNoCards;
            }
        }

        public Player(string name) : this()
        {
            Name = name;
        }

        public Player(Hand hand, string name)
        {
            Name = name;
            IsAbleToPlay = true;
            Hand = hand;
            Id = Guid.NewGuid();
        }

        public Player()
        {
            IsAbleToPlay = true;
            Hand = new Hand();
            Id = Guid.NewGuid();
        }
    }
}
