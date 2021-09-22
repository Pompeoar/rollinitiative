using Microsoft.AspNetCore.SignalR;
using RollYourInitiative.Models;
using System.Threading.Tasks;

namespace RollYourInitiative.HubConfig
{
    public class InitiativeHub : Hub
    {
        private readonly IInitiativeService initiativeService;

        public InitiativeHub(IInitiativeService initiativeService)
        {
            this.initiativeService = initiativeService;
        }
        public async Task AddOrUpdateCharacter(string sessionId, Character character) => 
            await Clients.All.SendAsync(WebSocketActions.BROADCAST_CHANGES, initiativeService.AddOrUpdateCharacter(sessionId, character));

        public async Task DeleteCharacter(string sessionId, Character character)
        {
            initiativeService.DeleteCharacter(sessionId, character);
            await Clients.All.SendAsync(WebSocketActions.BROADCAST_CHANGES, initiativeService.GetData(sessionId));
        }

        public async Task AdvanceRound(string sessionId) => 
            await Clients.All.SendAsync(WebSocketActions.BROADCAST_CHANGES, initiativeService.RandomizeInitiative(sessionId));

        public async Task EndCombat(string sessionId)
        {
            initiativeService.ClearUnstickied(sessionId);
            initiativeService.ResetInitiatives(sessionId);
            await Clients.All.SendAsync(WebSocketActions.BROADCAST_CHANGES, initiativeService.GetData(sessionId));
        }
        
    }

    public struct WebSocketActions
    {
        public static readonly string BROADCAST_CHANGES = "broadcastinitdata";
        
    }
}
