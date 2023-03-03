# Outer Adventuresbnuyj 

## Basic Implementations

[] Basic Character Creation: Allow the user to create a basic character with a few attributes, such as strength, dexterity, and intelligence.

[] Turn-Based Combat: Implement a simple turn-based combat system where the user can choose between basic attacks and skills to defeat enemies. The game should have a limited number of enemies and each enemy should have its own unique attributes.

[] Leveling System: Implement a simple leveling system where the user can gain experience points by defeating enemies. The user can level up and allocate points to improve their attributes.

[] Inventory System: The user can also use healing items to restore their health during combat.

## MVP

At the start of the game, the user is greeted with a welcome and is asked to roll for 4 different values. One for health, one for strength, one for knowledge and one for defense. This will become the parameters of our character. Apart from that, the user also needs to give the character a name. 

Once all of that is ready, the first level begins. An enemy spawns and we have to fight him. In this first version of the game, the only option that the player has is "Attack". In turns, the player will attack the enemy, and viceversa. The one that reaches health = 0 first, dies. If it's the enemy, the player gets to the next level (aka another enemy spawns and the level counter increases by 1), if it's the player, the enemy has won and the game ends (aka we get to the
Game Over page).

## Things that will ideally be implemented

[] The player has more than one action to choose from at every turn: Attack, Spell, Potion. 

[] The player can level up and boost his own stats. 

[] The enemies get more health and defense as the game progresses. 

[] Every 5 regular enemies, you fight a boss (more health and defense than regular enemies). Killing one of those grants you another potion. 

[] Implement visual elements on the UI that represent your current HP, enemy current HP, and current game level and character level. 

[] Different animations for every character action and for when an enemy dies (?).