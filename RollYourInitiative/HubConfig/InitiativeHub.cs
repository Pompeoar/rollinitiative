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
        public async Task AddOrUpdateCharacter(Character character)
        {
            initiativeService.AddOrUpdateCharacter(character);
            await Clients.All.SendAsync(WebSocketActions.BROADCAST_CHANGES, initiativeService.GetData());
        }

        public async Task DeleteCharacter(Character character)
        {
            initiativeService.DeleteCharacter(character);
            await Clients.All.SendAsync(WebSocketActions.BROADCAST_CHANGES, initiativeService.GetData());
        }

        public async Task AdvanceRound()
        {
            initiativeService.RandomizeInitiative();
            await Clients.All.SendAsync(WebSocketActions.BROADCAST_CHANGES, initiativeService.GetData());
        }

        public async Task EndCombat()
        {
            initiativeService.ClearUnstickied();
            initiativeService.ResetInitiatives();
            await Clients.All.SendAsync(WebSocketActions.BROADCAST_CHANGES, initiativeService.GetData());
        }
        
    }

    public struct WebSocketActions
    {
        public static readonly string BROADCAST_CHANGES = "broadcastinitdata";
        
    }
}
