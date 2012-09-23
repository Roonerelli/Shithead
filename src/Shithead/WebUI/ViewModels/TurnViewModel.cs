using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HtmlTags;
using Shithead.Core;

namespace WebUI.ViewModels
{
    public class TurnViewModel
    {
        public int GameId { get; set; }
        public Guid PlayerId { get; set; }
        public List<Card> CardsPlayed { get; set; }

        
    }


}