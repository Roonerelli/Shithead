using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Shithead.Core;

namespace WebUI.Controllers
{
    public class GameController : Controller
    {
        //
        // GET: /Game/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult StartGame()
        {
            Game game = new Game();
            game.AddPlayer(new Player("Chris"));
            game.AddPlayer(new Player("Vik"));
            game.AddPlayer(new Player("Val"));
            game.AddPlayer(new Player("Mollusc"));
            game.AddPlayer(new Player("Satch"));
            game.AddPlayer(new Player("Pest"));

            game.StartNewGame();

            return Json(game, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        //public ActionResult PlayCards(Card cards)
        public ActionResult PlayCards(List<Card> cards)
        {
            return View("Index");
        }

        public ActionResult Test()
        {
            return View();
        }






    }
}
