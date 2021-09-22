using RollYourInitiative.Models;
using System.Collections.Generic;

namespace RollYourInitiative
{
    public interface IInitiativeService
    {
        void AddOrUpdateCharacter(Character character);
        void DeleteCharacter(Character character);
        List<Character> GetData();
        void RandomizeInitiative();
        void ClearUnstickied();
        void ResetInitiatives();
    }
}