using RollYourInitiative.Models;
using System.Collections.Generic;

namespace RollYourInitiative
{
    public interface IInitiativeService
    {
        List<Character> GetData(string sessionId);
        List<Character> RandomizeInitiative(string sessionId);
        void ClearUnstickied(string sessionId);
        void ResetInitiatives(string sessionId);
        void DeleteCharacter(string sessionId, Character character);
        List<Character> AddOrUpdateCharacter(string sessionId, Character character);
        List<Character> CreateSession(string sessionId);
        bool SessionExists(string sessionId);
    }
}