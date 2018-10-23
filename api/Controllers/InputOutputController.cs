using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InputOutputController : ControllerBase
    {
        private readonly IMemoryCache _memCache;

        public InputOutputController(IMemoryCache memCache)
        {
            _memCache = memCache; 
        }

        // GET api/values
        [HttpPost]
        public ActionResult<SensorData> Post([FromBody]SensorData sensorData)
        {
            _memCache.Set("sensorData", sensorData);
            var history = _memCache.Get("history") as DirectionHistory ?? new DirectionHistory();
            var vals = history.Values ?? new List<double>();
            vals.Add(sensorData.heading);
            history.Values = vals;
            _memCache.Set("history", history);
            return sensorData;
        }

        // GET api/values/5
        [HttpGet]
        public ActionResult<SensorData> Get()
        {
            return _memCache.Get("sensorData") as SensorData ?? new SensorData();
        }
    }
}
