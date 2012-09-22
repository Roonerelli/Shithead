//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using Raven.Client.Document;
//using Shithead.Core;
//using SignalR.Hubs;

//namespace WebUI.Hubs
//{
//    public class GameHub : Hub
//    {
//        public void Connect()
//        {
//            Game game = new Game();
//            game.AddPlayer(new Player("Chris"));
//            game.AddPlayer(new Player("Vik"));
//            game.AddPlayer(new Player("Val"));
//            game.AddPlayer(new Player("Mollusc"));
//            game.AddPlayer(new Player("Satch"));
//            game.AddPlayer(new Player("Pest"));

//            game.StartNewGame();

//            //var documentStore = new DocumentStore { Url = "http://LAPPIE:8080" };
//            //documentStore.Initialize();

//            //using (var session = documentStore.OpenSession())
//            //{
//            //    session.Store(game);
//            //    session.SaveChanges();
//            //}
            
//        }

//        public void Send(string data)
//        {
//            Clients.addMessage(data);
//        }
//    }
//}