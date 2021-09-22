using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using RollYourInitiative.HubConfig;

namespace RollYourInitiative.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InitiativeController : ControllerBase
    {
        private readonly IHubContext<InitiativeHub> _hub;
        private readonly IInitiativeService initiativeService;

        public InitiativeController(IHubContext<InitiativeHub> hub, IInitiativeService initiativeService)
        {
            _hub = hub;
            this.initiativeService = initiativeService;
        }
        public IActionResult Get()
        {
            _hub.Clients.All.SendAsync(WebSocketActions.BROADCAST_CHANGES, initiativeService.GetData());
            return Ok(new { Message = "Request Completed" });
        }
    }
}
