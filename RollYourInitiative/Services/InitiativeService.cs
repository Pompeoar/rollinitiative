using RollYourInitiative.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace RollYourInitiative
{
    public class InitiativeService : IInitiativeService
    {
        static readonly ConcurrentDictionary<string, List<Character>> characters = new();

        public bool SessionExists(string sessionId) => characters.ContainsKey(sessionId);
        public List<Character> CreateSession(string sessionId)
        {
            characters[sessionId] = new List<Character>();
            return characters[sessionId];
        }

        public List<Character> GetData(string sessionId) =>
            characters[sessionId]            
            .OrderByDescending(c => c.Initiative.Value)
            .ThenByDescending(c => c.Initiative.Bonus)
            .ToList();

        public void DeleteCharacter(string sessionId, Character character) => 
            characters[sessionId].Remove(characters[sessionId].First(c => c.Name == character.Name));

        public List<Character> AddOrUpdateCharacter(string sessionId, Character characterToAddOrUpdate) =>
            characters[sessionId].Any(c => c.Name == characterToAddOrUpdate.Name)
            ? UpdateCharacter(sessionId, characterToAddOrUpdate)
            : AddCharacter(sessionId, characterToAddOrUpdate);

        private List<Character> AddCharacter(string sessionId, Character characterToAdd)
        {
            characterToAdd.Initiative.Value =  UpdateInitiative(new Random(), characterToAdd);
            characters[sessionId].Add(characterToAdd);
            return GetData(sessionId);
        }

        private List<Character> UpdateCharacter(string sessionId, Character characterToUpdate)
        {
            characters[sessionId].Remove(characters[sessionId].First(c => c.Name == characterToUpdate.Name));
            characters[sessionId].Add(characterToUpdate);
            return GetData(sessionId);
        }

        public List<Character> RandomizeInitiative(string sessionId)
        {
            Random r = new();
            foreach (var character in characters[sessionId])
            {
                character.Initiative.Value = UpdateInitiative(r, character);
            }
            return GetData(sessionId);
        }

        private static int UpdateInitiative(Random r, Character character)
        {
            return character.Initiative.Advantage
                                ? Math.Max(RollDTwenty(r), RollDTwenty(r)) + character.Initiative.Bonus
                                : RollDTwenty(r) + character.Initiative.Bonus;
        }

        private static int RollDTwenty(Random r) => r.Next(1, 20);

        public void ClearUnstickied(string sessionId) => characters[sessionId].RemoveAll(c => !c.Sticky);

        public void ResetInitiatives(string sessionId)
        {
            foreach (var character in characters[sessionId])
            {
                character.Initiative.Value = 0;
            }
        }
    }
}
