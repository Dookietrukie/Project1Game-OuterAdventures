// Define the Player class
class Player {
    constructor(health, knowledge, strength, defense, level) {
        this.health = health;
        this.knowledge = knowledge;
        this.strength = strength;
        this.defense = defense;
        this.level = level;
    }

    // Method to add random points to the player's stats after defeating an enemy
    addStats() {
        const healthIncrease = randomIntFromInterval(10, 25);
        const knowledgeIncrease = randomIntFromInterval(10, 25);
        const strengthIncrease = randomIntFromInterval(10, 25);
        const defenseIncrease = randomIntFromInterval(10, 25);
        this.health += healthIncrease;
        this.knowledge += knowledgeIncrease;
        this.strength += strengthIncrease;
        this.defense += defenseIncrease;
        console.log(`You defeated the enemy and gained ${healthIncrease} health, ${knowledgeIncrease} knowledge, ${strengthIncrease} strength, and ${defenseIncrease} defense!`);
    }
}

// Define the Enemy class
class Enemy {
    constructor(health, knowledge, strength, defense) {
        this.health = health;
        this.knowledge = knowledge;
        this.strength = strength;
        this.defense = defense;
    }

    // Method to generate random stats for a new enemy
    static generateNewEnemy() {
        const health = randomIntFromInterval(35, 70);
        const knowledge = randomIntFromInterval(35, 70);
        const strength = randomIntFromInterval(35, 70);
        const defense = randomIntFromInterval(35, 70);
        const enemy = new Enemy(health, knowledge, strength, defense);
        return enemy;
    }

    // Method to increase stats of a defeated enemy
    increaseStats() {
        const healthIncrease = randomIntFromInterval(40, 60);
        const knowledgeIncrease = randomIntFromInterval(40, 60);
        const strengthIncrease = randomIntFromInterval(40, 60);
        const defenseIncrease = randomIntFromInterval(40, 60);
        this.health += healthIncrease;
        this.knowledge += knowledgeIncrease;
        this.strength += strengthIncrease;
        this.defense += defenseIncrease;
    }
}

// Global variables
let player;
let currentEnemy;

// Define utility function to generate a random integer between a minimum and maximum value
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to start the game
function startGame() {
    // Get the player's stats from the input fields
    const playerHealth = Math.floor(Math.random() * (110 - 60 + 1) + 60);
    const playerKnowledge = Math.floor(Math.random() * (110 - 60 + 1) + 60);
    const playerStrength = Math.floor(Math.random() * (110 - 60 + 1) + 60);
    const playerDefense = Math.floor(Math.random() * (20 - 10 + 1) + 10);
    // Create a new player with the entered stats
    player = new Player(playerHealth, playerKnowledge, playerStrength, playerDefense, 1);
    // Create a new enemy with random stats
    currentEnemy = Enemy.generateNewEnemy();
    // Update the game interface to show the new player and enemy stats
    updateStats();
    // Set up event listeners for the attack buttons
    const attackButtons = document.querySelectorAll('.skillBtns');
    for (let i = 0; i < attackButtons.length; i++) {
        attackButtons[i].addEventListener('click', playerAttack);
    }
}

// Function to handle a player attack
function playerAttack(event) {
    // Determine which attack button was clicked and calculate damage
    const attackType = event.target.textContent;
    let damage;
    if (attackType === 'ATTACK') {
        damage = player.strength - currentEnemy.defense;
    } else if (attackType === 'SPELL') {
        damage = player.knowledge - currentEnemy.defense;
    } else if (attackType === 'DEFENSE') {
        damage = 0;
        player.defense += 10;
    } else if (attackType === 'POTION') {
        damage = 0;
        player.health += 20;
    }
    // Make sure damage is at least 1
    if (damage < 1) {
        damage = 1;
    }
    // Subtract damage from enemy health
    currentEnemy.health -= damage;
    console.log(`You attacked the enemy for ${damage} damage!`);
    // Check if the enemy is defeated
    if (currentEnemy.health <= 0) {
        console.log('You defeated the enemy!');
        // Increase the player's stats and update the interface
        player.addStats();
        updateStats();
        // Generate a new enemy with increased stats and set as current enemy
        currentEnemy.increaseStats();
        currentEnemy = Enemy.generateNewEnemy();
        // Update the interface to show the new enemy
        updateStats();
        console.log(`You're now facing a new enemy with ${currentEnemy.health} health, ${currentEnemy.knowledge} knowledge, ${currentEnemy.strength} strength, and ${currentEnemy.defense} defense.`);
        // Increase the player's level
        player.level++;
        document.querySelector('h1 span').textContent = player.level;
    } else {
        // Enemy is still alive, so it attacks the player
        enemyAttack();
    }
}

// Function to handle an enemy attack
function enemyAttack() {
    // Calculate damage based on enemy strength and player defense
    let damage = currentEnemy.strength - player.defense;
    // Make sure damage is at least 1
    
    // Subtract damage from player health
    player.health -= damage;
    console.log(`The enemy attacked you for ${damage} damage!`);
    // Check if the player is defeated
    if (player.health <= 0) {
        console.log('You have been defeated! Game over.');
        // Remove event listeners from attack buttons
        const attackButtons = document.querySelectorAll('.skillBtns');
        for (let i = 0; i < attackButtons.length; i++) {
            attackButtons[i].removeEventListener('click', playerAttack);
        }
    } else {
        // Player is still alive, so update stats and wait for player to attack again
        updateStats();
    }
}

// Function to update the game interface with current player and enemy stats
function updateStats() {
    document.getElementById('healthValueSpan').textContent = player.health;
    document.getElementById('knowledgeValueSpan').textContent = player.knowledge;
    document.getElementById('strength-value-span').textContent = player.strength;
    document.getElementById('defense-value-span').textContent = player.defense;
    document.getElementById('enemyName').textContent = `Level ${player.level} Enemy`;
    document.getElementById('enemySprite').src = `./resources/images/enemy${player.level}.png`;
}

startGame();