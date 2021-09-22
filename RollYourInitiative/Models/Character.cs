namespace RollYourInitiative.Models
{
    public record Character 
    {
        public string Name { get; init; }
        public Initiative Initiative { get; init; }
        public bool Sticky { get; init; }      
    }
}
