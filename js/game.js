// Define the Player class
class Player {
    constructor(health, knowledge, strength, defense, level, attackGif) {
        this.health = health;
        this.knowledge = knowledge;
        this.strength = strength;
        this.defense = defense;
        this.level = level;
        this.attackGif = attackGif;
    }

    // Generates random stats and applies them to the Player.
    // Called when an enemy is defeated.
    addStats() {
        const msgElmPlayer = document.getElementById('textLogPlayer'); 

        const healthIncrease = randomIntFromInterval(15, 25);
        const knowledgeIncrease = randomIntFromInterval(15, 25);
        const strengthIncrease = randomIntFromInterval(15, 25);
        const defenseIncrease = randomIntFromInterval(15, 25);
        
        this.health += healthIncrease;
        this.knowledge += knowledgeIncrease;
        this.strength += strengthIncrease;
        this.defense += defenseIncrease;

        msgElmPlayer.textContent = `You defeated the enemy and gained ${healthIncrease} health, ${knowledgeIncrease} knowledge, ${strengthIncrease} strength, and ${defenseIncrease} defense!`;
    }
}

// Define the Enemy class
class Enemy {
    constructor(health, knowledge, strength, defense) {
        this.health = health;
        this.knowledge = knowledge;
        this.strength = strength;
        this.defense = defense;
        this.image = this.setRandomImage();
    }

    // Store all the possible images for the enemy in an array and pick a random one.
    setRandomImage() {
        const enemyImgArr = [
            './resources/images/enemy1.png',
            './resources/images/enemy2.png',
            './resources/images/enemy3.png',
            './resources/images/enemy4.png',
            './resources/images/enemy5.png',
            './resources/images/enemy6.png',
            './resources/images/enemy7.png',
            './resources/images/enemy8.png',
        ];
        const randomIndex = Math.floor(Math.random() * enemyImgArr.length);
        return enemyImgArr[randomIndex % enemyImgArr.length];
    }

    // Adds random points to the enemy stats and sets them. Also picks a random image and adds one level to the enemy. 
    addStats() {
        const healthIncrease = randomIntFromInterval(20, 35);
        const knowledgeIncrease = randomIntFromInterval(20, 35);
        const strengthIncrease = randomIntFromInterval(20, 35);
        const defenseIncrease = randomIntFromInterval(20, 35);
        const msgEnemyElm = document.getElementById('textLogEnemy');
        this.health += healthIncrease;
        this.knowledge += knowledgeIncrease;
        this.strength += strengthIncrease;
        this.defense += defenseIncrease;
        this.level++;
        this.image = this.setRandomImage();

        msgEnemyElm.style.color = 'red';
        msgEnemyElm.textContent = `The next enemy will have ${healthIncrease} health, ${knowledgeIncrease} knowledge, ${strengthIncrease} strength, and ${defenseIncrease} defense!`;

    }
}

// Variables in the global scope:
let player;
let currentEnemy;
let enHealth;


// Function to generate a random number between a min and a max.
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to start the game
function startGame() {
    // Generate the starting values for the stats of the enemy and the player.

    // Player stats:
    const playerHealth = Math.floor(Math.random() * (110 - 60 + 1) + 60);
    const playerKnowledge = Math.floor(Math.random() * (110 - 60 + 1) + 60);
    const playerStrength = Math.floor(Math.random() * (110 - 60 + 1) + 60);
    const playerDefense = Math.floor(Math.random() * (20 - 10 + 1) + 10);

    // Paths to gif attacks:
    // It's empty because there are animations missing.
    const attackGif = {
        'ATTACK': './resources/gifs/playerAttack1.gif'
    };

    // Enemy stats:
    const enemyHealth = Math.floor(Math.random() * (60 - 30 + 1) + 30);
    const enemyKnowledge = Math.floor(Math.random() * (60 - 30 + 1) + 30);
    const enemyStrength = Math.floor(Math.random() * (60 - 30 + 1) + 30);
    const enemyDefense = Math.floor(Math.random() * (60 - 30 + 1) + 30);

    // Create a new player with the entered stats and do the same with the enemy.
    player = new Player(playerHealth, playerKnowledge, playerStrength, playerDefense, 1, attackGif);
    currentEnemy = new Enemy(enemyHealth, enemyKnowledge, enemyStrength, enemyDefense);

    // Use this to reset the enemies health. Otherwise it will decrease over time when enemies spawn.
    enHealth = currentEnemy.health; 

    // Function to update the stats on the UI.
    updateStats();

    // Loop throught the buttons to add the listener to them all.
    const attackButtons = document.querySelectorAll('.skillBtns');
    for (let i = 0; i < attackButtons.length; i++) {
        attackButtons[i].addEventListener('click', playerAttack);
    }
}



// All the handling of the player's attack.
function playerAttack(event) {
    // We pass the event to the function to determine which button has been clicked:
    const attackType = event.target.textContent;
    const msgElmPlayer = document.getElementById('textLogPlayer');
    const playerSprite = document.getElementById('playerSprite');
    const enemySprite = document.getElementById('enemySprite');
    const idleImage = playerSprite.src;

    let pathToGif;
    let damage;

    if (attackType === 'ATTACK') {
        pathToGif = player.attackGif.ATTACK;
        damage = player.strength - currentEnemy.defense;
        currentEnemy.health -= damage;
        msgElmPlayer.textContent = `You attacked the enemy for ${damage} damage!`;
    } else if (attackType === 'SPELL') {
        pathToGif = player.attackGif.ATTACK;
        damage = player.knowledge - currentEnemy.defense;
        currentEnemy.health -= damage;
        msgElmPlayer.textContent = `Your fireball did ${damage} damage!`;
    } else if (attackType === 'DEFENSE') {
        pathToGif = player.attackGif.ATTACK;
        damage = 0;
        player.defense += 5;
        msgElmPlayer.textContent = `You raise your shield... Denfense +5!`;
    } else if (attackType === 'POTION') {
        pathToGif = player.attackGif.ATTACK;
        damage = 0;
        player.health += 20;
        msgElmPlayer.textContent = `You drink a sparkly red potion... Health +20!`;
    }

    playerSprite.src = pathToGif;

    setTimeout(() => {
        playerSprite.src = idleImage;
    }, 1400);

    // We can't do negative damage:
    if (damage < 0) {
        damage = 1;
    }

    // Loop to handle if the enemy is dead or not.
    if (currentEnemy.health <= 0) {
        enemySprite.src = './resources/images/tombstone.png';
        currentEnemy.health = enHealth;
        player.addStats();
        updateStats();

        changeBackground();

        // Generate a new enemy with increased stats and set as current enemy
        currentEnemy.addStats();

        player.level++;
        document.querySelector('h1 span').textContent = player.level;

        
    } else {
        // Enemy is still alive...
        enemyAttack();
    }
}

// All the handling of the enemy attack.
function enemyAttack() {
    // Calculate damage 
    let damage = currentEnemy.strength - player.defense;
    const msgEnemyElm = document.getElementById('textLogEnemy');
    const msgPlayerElm = document.getElementById('textLogPlayer');
    
    msgEnemyElm.style.color = 'white';
    
    if (damage < 0) {
        damage = 1;
    }

    // Deal the damage
    player.health -= damage;
    msgEnemyElm.textContent = `The enemy attacked you for ${damage} damage!`;

    // Handle the player's defeat
    if (player.health <= 0) {
        msgPlayerElm.textContent = 'You have been defeated! Game over.';
        msgEnemyElm.textContent = `ENEMIES WON.`
        player.health = 0;
        updateStats();

        // We can't press the buttons anymore so we remove the listeners.
        const attackButtons = document.querySelectorAll('.skillBtns');
        for (let i = 0; i < attackButtons.length; i++) {
            attackButtons[i].removeEventListener('click', playerAttack);
        }
        window.location.href = './gameover.html';
    } else {
        // Player is still alive...
        updateStats();
    }
}

function changeBackground() {
    const bodyElm = document.body;
    const bgsImgArray = [
        'url(./resources/images/backgroundColorDesert.png)',
        'url(./resources/images/backgroundColorForest.png)',
        'url(./resources/images/backgroundColorGrass.png)',
        'url(./resources/images/backgroundColorFall.png)',
    ];
    const randomIndex = Math.floor(Math.random() * bgsImgArray.length);

    bodyElm.style.backgroundImage = bgsImgArray[randomIndex % bgsImgArray.length];
}

// Handle the UI update.
function updateStats() {
    // Player Stats:
    document.getElementById('healthValueSpan').textContent = player.health;
    document.getElementById('knowledgeValueSpan').textContent = player.knowledge;
    document.getElementById('strength-value-span').textContent = player.strength;
    document.getElementById('defense-value-span').textContent = player.defense;
    
    // Enemy stats:
    document.getElementById('healthValueSpanEnemy').textContent = currentEnemy.health;
    document.getElementById('knowledgeValueSpanEnemy').textContent = currentEnemy.knowledge;
    document.getElementById('strength-value-span-enemy').textContent = currentEnemy.strength;
    document.getElementById('defense-value-span-enemy').textContent = currentEnemy.defense;
    document.getElementById('enemyName').textContent = `Level ${player.level} Enemy`;
    document.getElementById('enemySprite').src = currentEnemy.image;
}

// Actually start the game.
startGame();

const audioElm = document.getElementById('audioTrack');

document.addEventListener('click', function() {
    audioElm.volume = 0.1;
    audioElm.play();
})

// Restart the audio when it finishes.
audioElm.addEventListener('ended', function() {
    audioElm.currentTime = 0;
    audioElm.play();
});