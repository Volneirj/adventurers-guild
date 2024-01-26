// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    // Get the button elements and add Event Listeners to them
    let buttons = document.getElementsByClassName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            let gameType = this.getAttribute("dungeon");
            runGame(gameType);
        });
    }

    // Add event listeners for the action buttons
    document.getElementById("attack-button").addEventListener("click", function () {
        attackButton();
    });

    document.getElementById("run-button").addEventListener("click", function () {
        alert("Running away from the monster!");
    });

    document.getElementById("potion-button").addEventListener("click", function () {
        alert("Using a health potion!");
    });

    //Default game
    runGame("default");
});

// Game Variables
// Hero stats
let playerHealthPoints = 100;
let playerAttack = 20;
let playerDefense = 5;
let playerHealthPotions = 5;

//Player and monster life inicialization
let currentMonster = null; // Add this line to initialize the variable
let currentPlayerHealthPoints = playerHealthPoints; // Add this line to initialize the variable

// Monster List
var monsters = [
    new Monster("Goblin", 100, 20, 0, "levelone"),
    new Monster("Goblin Paladin", 150, 35, 20, "leveltwo"),
    new Monster("Hobgoblin", 250, 55, 25, "levelthree"),
    new Monster("Goblin Shaman", 500, 75, 20, "levelfour"),
    new Monster("Goblin Champion", 1500, 125, 125, "levelfive"),
    new Monster("None", 0, 0, 0, "default")
];

// Function to create the monsters
function Monster(name, healthPoints, attack, defense, gameType) {
    this.name = name;
    this.healthPoints = healthPoints;
    this.initialHealth = healthPoints;
    this.attack = attack;
    this.defense = defense;
    this.gameType = gameType;
}

// Main Game Loop
function runGame(gameType) {
    //Monster life bar/Status
    selectedMonster = dungeon(gameType);
    console.log(selectedMonster);    
    let monsterLifeBar = document.getElementById("monster-life");
    let monsterStats = document.getElementById("monster-stats");    
    monsterLifeBar.textContent = selectedMonster.name + " " + "HP:" + selectedMonster.healthPoints;
    monsterStats.textContent = "Att: " + selectedMonster.attack + " Def: " + selectedMonster.defense;
    //Hero life bar/Status
    let characterLife = document.getElementById("character-life");
    let characterStats = document.getElementById("character-stats");
    characterLife.textContent = "Hero HP: " + playerHealthPoints;    
    characterStats.textContent = "Att: " + playerAttack + " Def: " + playerDefense + " Health Potions: " + playerHealthPotions;

    //When start the game start with default game to not toggle the buttons
    if (gameType !== "default") {
        toggleButtons(true);
    }
}
// This function loads the monster and adds the status to start the battle
function dungeon(gameType) {
    //Select the monster from the monster array
    let selectedMonster = monsters.find(monster => monster.gameType === gameType);

    // Reset the monster's health to its initial value
    selectedMonster.healthPoints = selectedMonster.initialHealth;
    return selectedMonster;
}

//Function to toggle the buttons while in fight mode
function toggleButtons(showActionButtons) {
    let dungeonButtons = document.getElementsByClassName("button");
    let actionButtons = ["attack-button", "run-button", "potion-button"];

    if (showActionButtons) {
        // Hide dungeon buttons
        for (let button of dungeonButtons) {
            button.style.display = "none";
        }
        // Show action buttons
        for (let actionButton of actionButtons) {
            document.getElementById(actionButton).style.display = "inline-block";
        }
    } else {
        // Show dungeon buttons
        for (let button of dungeonButtons) {
            button.style.display = "inline-block";
        }
        // Hide action buttons
        for (let actionButton of actionButtons) {
            document.getElementById(actionButton).style.display = "none";
        }
    }
}

//Function for attack Button
function attackButton() {
    // Calculate damage dealt and update monster health
    let damageDealt = calculateDamage(playerAttack, selectedMonster.defense);
    selectedMonster.healthPoints -= damageDealt;
    //Call Function to update Health
    updateMonsterHealth();

    // Calculate damage taken and update player health
    let damageTaken = calculateDamage(selectedMonster.attack, playerDefense);
    currentPlayerHealthPoints -= damageTaken;
    //Call Function to update Health
    updatePlayerLife();

    // Check game status after the attack
    checkGameStatus();
}

//Function to Update playerLife
function updatePlayerLife() {
    let playerLifeBar = document.getElementById("character-life");
    playerLifeBar.textContent = `Hero HP: ${currentPlayerHealthPoints}`;
}

// Function to update monster health
function updateMonsterHealth() {
    let monsterLifeBar = document.getElementById("monster-life");
    monsterLifeBar.textContent = `${selectedMonster.name} HP: ${selectedMonster.healthPoints}`;
}

// Function to calculate damage
function calculateDamage(attackValue, defenseValue) {
    return Math.max(0, Math.floor(Math.random() * attackValue) - Math.floor(Math.random() * defenseValue));
}

//Function Get the result of the battle
function checkGameStatus() {
    console.log("Player Health: ", currentPlayerHealthPoints);
    console.log("Monster Health: ", selectedMonster ? selectedMonster.healthPoints : "N/A");
    if (currentPlayerHealthPoints <= 0) {
        // Player is defeated, handle game over logic
        if (confirm("Game Over - Player Defeated! Do you want to restart?")) {
            runGame("default");
            toggleButtons(false);
        }
    } else if (selectedMonster && selectedMonster.healthPoints <= 0) {
        // Monster is defeated, handle victory logic
        if (confirm("Victory - Monster Defeated! Do you want to restart?")) {
            runGame("default");
            toggleButtons(false);
        }              
        
    }
}

//Function to reset player stats in case of death
function resetPlayerstats(){
        playerHealthPoints = 100;
        playerAttack = 20;
        playerDefense = 5;
        playerHealthPotions = 5;    
    }
