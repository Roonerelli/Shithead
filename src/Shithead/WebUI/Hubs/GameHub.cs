using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Raven.Client.Document;
using Shithead.Core;
using SignalR.Hubs;

namespace WebUI.Hubs
{
    public class GameHub : Hub
    {
        private DocumentStore documentStore;

        public GameHub()
        {
            documentStore = new DocumentStore { Url = "http://LAPPIE:8080" };
            documentStore.Initialize();
        }

        public void JoinGame(int gameId)
        {
            
        }

        public void BeginGame(int gameId)
        {
            Game game;
            using (var session = documentStore.OpenSession())
            {
                game = session.Load<Game>(gameId);
            }

            if (!game.HasStarted)
            {
                game.StartNewGame();
            }
            
            Clients.RecieveGameState(game);
        }

        public void PlayCards(List<Card> cards)
        {

        }
    }
}