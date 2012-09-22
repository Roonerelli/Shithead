using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Raven.Client.Document;
using Shithead.Core;

namespace WebUI.Controllers
{
    public class GameApiController : ApiController
    {
        private DocumentStore documentStore;

        public GameApiController()
        {
            documentStore = new DocumentStore { Url = "http://LAPPIE:8080" };
            documentStore.Initialize();
        }
        
        public int Post()
        {
            Game game = new Game();
            game.AddPlayer(new Player("Chris"));
            game.AddPlayer(new Player("Vik"));
            game.AddPlayer(new Player("Val"));
            game.AddPlayer(new Player("Mollusc"));
            game.AddPlayer(new Player("Satch"));
            game.AddPlayer(new Player("Pest"));

            using (var session = documentStore.OpenSession())
            {
                session.Store(game);
                session.SaveChanges();
            }

            return game.Id;
        }
    }
}