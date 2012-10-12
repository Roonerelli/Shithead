using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using Raven.Client.Document;
using Shithead.Core;
using SignalR.Hubs;
using WebUI.ViewModels;

namespace WebUI.Hubs
{
    public class GameHub : Hub
    {
        private readonly DocumentStore _documentStore;

        public GameHub()
        {
            _documentStore = new DocumentStore { Url = ConfigurationManager.ConnectionStrings["RavenConnection"].ToString() };
            _documentStore.Initialize();
        }

        public void JoinGame(int gameId)
        {
            
        }

        public void BeginGame(int gameId)
        {
            Game game;
            using (var session = _documentStore.OpenSession())
            {
                game = session.Load<Game>(gameId);

                if (!game.HasStarted)
                {
                    game.StartNewGame();

                    session.Store(game);
                    session.SaveChanges();
                }
            }
            
            Clients.RecieveGameState(game);
        }

        public void PlayCards(TurnViewModel turn)
        {
            try
            {
                Game game;
                using (var session = _documentStore.OpenSession())
                {
                    game = session.Load<Game>(turn.GameId);
                    game.PlayCards(turn.PlayerId, turn.CardsPlayed);

                    session.Store(game);
                    session.SaveChanges();
                }

                Clients.RecieveGameState(game);
            }
            catch (Exception ex)
            {
                Clients.RecieveError(ex.Message);
            }
        }
    }
}