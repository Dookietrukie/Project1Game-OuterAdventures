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
        const healthIncrease = randomIntFromInterval(35, 45);
        const knowledgeIncrease = randomIntFromInterval(35, 45);
        const strengthIncrease = randomIntFromInterval(35, 45);
        const defenseIncrease = randomIntFromInterval(35, 45);
        this.health += healthIncrease;
        this.knowledge += knowledgeIncrease;
        this.strength += strengthIncrease;
        this.defense += defenseIncrease;
        console.log(`You defeated the enemy and gained ${healthIncrease} health, ${knowledgeIncrease} knowledge, ${strengthIncrease} strength, and ${defenseIncrease} defense!`);
    }
}

// Define the Enemy class
class Enemy {
    constructor(health, knowledge, strength, defense, image) {
        this.health = health;
        this.knowledge = knowledge;
        this.strength = strength;
        this.defense = defense;
        this.image = this.setRandomImage();
    }

    setRandomImage() {
        const enemyImgArr = [
            '../resources/images/enemy1.png',
            '../resources/images/enemy2.png',
            '../resources/images/enemy3.png',
            '../resources/images/enemy4.png',
            '../resources/images/enemy5.png',
            '../resources/images/enemy6.png',
            '../resources/images/enemy7.png',
        ];
        const randomIndex = Math.floor(Math.random() * enemyImgArr.length);
        return enemyImgArr[randomIndex];
    }

    // Method to add random points to the player's stats after defeating an enemy
    addStats() {
        const healthIncrease = randomIntFromInterval(30, 40);
        const knowledgeIncrease = randomIntFromInterval(30, 40);
        const strengthIncrease = randomIntFromInterval(30, 40);
        const defenseIncrease = randomIntFromInterval(30, 40);
        this.health += healthIncrease;
        this.knowledge += knowledgeIncrease;
        this.strength += strengthIncrease;
        this.defense += defenseIncrease;

        console.log(`The next enemy will have ${healthIncrease} health, ${knowledgeIncrease} knowledge, ${strengthIncrease} strength, and ${defenseIncrease} defense!`);
    }
}

// Global variables
let player;
let currentEnemy;
let enHealth;


// Define utility function to generate a random integer between a minimum and maximum value
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to start the game
function startGame() {
    // Get the player's stats from the input fields
    const playerHealth = Math.floor(Math.random() * (110 - 60 + 1) + 60);
    const playerKnowledge = Math.floor(Math.random() * (110 - 60 + 1) + 60);
    const playerStrength = Math.floor(Math.random() * (110 - 60 + 1) + 60);
    const playerDefense = Math.floor(Math.random() * (20 - 10 + 1) + 10);

    const enemyHealth = Math.floor(Math.random() * (60 - 30 + 1) + 30);
    const enemyKnowledge = Math.floor(Math.random() * (60 - 30 + 1) + 30);
    const enemyStrength = Math.floor(Math.random() * (60 - 30 + 1) + 30);
    const enemyDefense = Math.floor(Math.random() * (60 - 30 + 1) + 30);
    // Create a new player with the entered stats
    player = new Player(playerHealth, playerKnowledge, playerStrength, playerDefense, 1);
    currentEnemy = new Enemy(enemyHealth, enemyKnowledge, enemyStrength, enemyDefense);
    enHealth = currentEnemy.health;
    // Create a new enemy with random stats
    // Update the game interface to show the new player and enemy stats
    updateStats();

    console.log(`Player: health=${player.health}, knowledge=${player.knowledge}, strength=${player.strength}, defense=${player.defense}`);
    console.log(`Enemy: health=${currentEnemy.health}, knowledge=${currentEnemy.knowledge}, strength=${currentEnemy.strength}, defense=${currentEnemy.defense}`);

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
    const msgElm = document.getElementById('textLog');
    let damage;
    if (attackType === 'ATTACK') {
        damage = player.strength - currentEnemy.defense;
        currentEnemy.health -= damage;
        const attackMsg = `You attacked the enemy for ${damage} damage!`;
        msgElm.textContent = attackMsg;
    } else if (attackType === 'SPELL') {
        damage = player.knowledge - currentEnemy.defense;
        currentEnemy.health -= damage;
        const spellMsg = `Your fireball did ${damage} damage!`;
        msgElm.textContent = spellMsg;
    } else if (attackType === 'DEFENSE') {
        damage = 0;
        player.defense += 10;
        const defenseMsg = `You raise your shield... Denfense +10!`;
        msgElm.textContent = defenseMsg;
    } else if (attackType === 'POTION') {
        damage = 0;
        player.health += 20;
        const potionMsg = `You drink a sparkly red potion... Health +20!`;
        msgElm.textContent = potionMsg;
    }
    // Make sure damage is at least 1
    if(damage < 0) {
        damage = 1;
    }

    // Subtract damage from enemy health
    
    // Check if the enemy is defeated
    if (currentEnemy.health <= 0) {
        console.log('You defeated the enemy!');
        // Increase the player's stats and update the interface
        currentEnemy.health = enHealth;
        player.addStats();
        updateStats();
        // Generate a new enemy with increased stats and set as current enemy
        currentEnemy.addStats();
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
    document.getElementById('healthValueSpanEnemy').textContent = currentEnemy.health;
    document.getElementById('knowledgeValueSpanEnemy').textContent = currentEnemy.knowledge;
    document.getElementById('strength-value-span-enemy').textContent = currentEnemy.strength;
    document.getElementById('defense-value-span-enemy').textContent = currentEnemy.defense;
    document.getElementById('enemyName').textContent = `Level ${player.level} Enemy`;
    document.getElementById('enemySprite').src = `./resources/images/enemy${player.level}.png`;
    document.getElementById('enemySprite').src = currentEnemy.setRandomImage();
}

startGame();