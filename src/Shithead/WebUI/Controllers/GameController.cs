using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Raven.Client.Document;
using Shithead.Core;
using WebUI.ViewModels;

namespace WebUI.Controllers
{
    public class GameController : Controller
    {
        private DocumentStore documentStore;

        public GameController()
        {
            documentStore = new DocumentStore { Url = "http://LAPPIE:8080" };
            documentStore.Initialize();
        }
        public ActionResult Index(int id)
        {

            return View();
        }

        public ActionResult Join()
        {
            IQueryable<Game> results;
            using (var session = documentStore.OpenSession())
            {
                results = session.Query<Game>().Where(x => x.CanJoin);
            }

            JoinViewModel vm = new JoinViewModel
            {
                Games = results.ToList()
            };

            return View(vm);
        }

        //public ActionResult PlayCards(List<Card> cards)
        
        public ActionResult Test()
        {
            return View();
        }
    }
}