class Player {
    constructor(name, health, strength, knowledge, defense) {
      this.name = name;
      this.health = health;
      this.strength = strength;
      this.knowledge = knowledge;
      this.defense = defense;
    }
  }
  
  const charNameInput = document.getElementById('charName');
  const healthInput = document.getElementById('healthInput');
  const strengthInput = document.getElementById('strengthInput');
  const knowledgeInput = document.getElementById('knowledgeInput');
  const defenseInput = document.getElementById('defenseInput');
  const statsBtn = document.getElementById('statsBtn');
  const startBtn = document.getElementById('startBtn');
  
  statsBtn.addEventListener('click', function() {
    const healthValue = Math.floor(Math.random() * 10) + 1;
    const strengthValue = Math.floor(Math.random() * 10) + 1;
    const knowledgeValue = Math.floor(Math.random() * 10) + 1;
    const defenseValue = Math.floor(Math.random() * 10) + 1;
    const nameValue = charNameInput.value;
  
    const player = new Player(nameValue, healthValue, strengthValue, knowledgeValue, defenseValue);
    console.log(player);
  });
  
  startBtn.addEventListener('click', function() {
    if(this.name === ' ' || this.name === '' || this.health === 0 || this.strength === 0 || this.knowledge === 0 || this.defense === 0) {
        alert('Please give a name to your character and press the "Generate Stats" button before playing!')
    } else {
        document.getElementById('container').innerHTML = '';
    }
  });