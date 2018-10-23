using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Generic;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoryController : ControllerBase
    {
        private readonly IMemoryCache _memCache;
        private readonly List<double> dummy = new List<double> { 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 2,0,0 };
        private static int indexer = 0;

        public HistoryController(IMemoryCache memCache)
        {
            _memCache = memCache;
        }

        // GET api/values/5
        [HttpGet]
        public ActionResult<DirectionHistory> Get()
        {
            var state = _memCache.Get("history") as DirectionHistory ?? new DirectionHistory() { Values = new List<double>() };

            if (true)
            {
                if (indexer < dummy.Count - 1)
                {
                    var newState = new DirectionHistory();
                    newState.Values = new List<double>(state.Values ?? new List<double>());
                    newState.Values.Add(dummy[indexer++]);
                    _memCache.Set("history", newState);
                }
            }

            return state;
        }

        [HttpDelete]
        public ActionResult Delete()
        {
            _memCache.Set("history", new DirectionHistory());
            indexer = 0;
            return Ok();
        }
    }
}