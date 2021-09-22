using Microsoft.AspNetCore.Mvc.TagHelpers;
using RollYourInitiative.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace RollYourInitiative
{
    public class InitiativeService : IInitiativeService
    {
        static readonly ConcurrentDictionary<string, Character> characters = new();

        public InitiativeService()
        {
            // initial data
            characters["WhiskeyJack"] = new Character { Name = "WhiskeyJack", Initiative = new Initiative { Advantage = true, Bonus = 4, Value = 0 }, Sticky = true };
            characters["Dinkels"] = new Character { Name = "Dinkels", Initiative = new Initiative { Advantage = false, Bonus = 3, Value = 0 }, Sticky = true };
            characters["Tolen"] = new Character { Name = "Tolen", Initiative = new Initiative { Advantage = false, Bonus = 0, Value = 0 }, Sticky = true };
            characters["Vykodin"] = new Character { Name = "Vykodin", Initiative = new Initiative { Advantage = false, Bonus = 1, Value = 0 }, Sticky = true };
            characters["Newt"] = new Character { Name = "Newt", Initiative = new Initiative { Advantage = false, Bonus = 4, Value = 0 }, Sticky = true };
        }

        public List<Character> GetData() =>
            characters
            .Select(c => c.Value)
            .OrderByDescending(c => c.Initiative.Value)
            .ThenByDescending(c => c.Initiative.Bonus)
            .ToList();

        public void DeleteCharacter(Character character) => characters.TryRemove(character.Name, out var _);
        public void AddOrUpdateCharacter(Character character) => characters[character.Name] = character;
        public void RandomizeInitiative()
        {
            Random r = new();
            foreach (var character in characters)
            {
                character.Value.Initiative.Value = character.Value.Initiative.Advantage
                    ? Math.Max(RollDTwenty(r), RollDTwenty(r)) + character.Value.Initiative.Bonus
                    : RollDTwenty(r) + character.Value.Initiative.Bonus;
            }
        }

        private int RollDTwenty(Random r) => r.Next(1, 20);

        public void ClearUnstickied()
        {
            var charactersToRemove = characters
                .Where(c => !c.Value.Sticky)
                .Select(c => c.Value)
                .ToList();
            foreach (var character in charactersToRemove)
            {
                DeleteCharacter(character);
            };
            
        }

        public void ResetInitiatives()
        {
            foreach (var character in characters)
            {
                character.Value.Initiative.Value = 0;
            }
        }
    }
}
