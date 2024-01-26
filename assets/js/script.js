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
    
    document.getElementById("potion-button").addEventListener("click", function () {
            if (confirm("Using a health potion!")){
            useHealthPotion();            
        }
    });

    document.getElementById("run-button").addEventListener("click", function () {

        if (confirm("Running away from the monster!")){
            //Back to the Main screen
            runGame("default");
            //Back to the Main screen
            toggleButtons(false);

        }
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
let selectedMonster = null; 
let currentPlayerHealthPoints = playerHealthPoints; 
let currentPlayerAttack = playerAttack;
let currentPlayerDefense = playerDefense;
let currentPlayerHealthPotions = playerHealthPotions;


// Monster List
var monsters = [
    new Monster("Goblin", 100, 20, 0, "levelone", "Short Sword"),
    new Monster("Goblin Paladin", 150, 35, 20, "leveltwo", "Iron Shield"),
    new Monster("Hobgoblin", 250, 55, 25, "levelthree", "Life Totem"),
    new Monster("Goblin Shaman", 500, 75, 20, "levelfour", "Clarity Potion"),
    new Monster("Goblin Champion", 1500, 125, 125, "levelfive", "Long Sword"),
    new Monster("None", 0, 0, 0, "default", "none")
];

// Function to create the monsters
function Monster(name, healthPoints, attack, defense, gameType, itemDrop) {
    this.name = name;
    this.healthPoints = healthPoints;
    this.initialHealth = healthPoints;
    this.attack = attack;
    this.defense = defense;
    this.gameType = gameType;
    this.itemDrop = itemDrop;
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
    characterStats.textContent = "Att: " + currentPlayerAttack + " Def: " + currentPlayerDefense + " Health Potions: " + currentPlayerHealthPotions;
    //Update the HeroBar after the battle
    updatePlayerLife();
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
// Function To update Player stats
function updatePlayerStats(){
    characterStats = document.getElementById("character-stats");
    characterStats.textContent = `Att: ${currentPlayerAttack} Def: ${currentPlayerDefense} Health Potions: ${currentPlayerHealthPotions}`;
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
            resetPlayerstats();
        }
    } else if (selectedMonster && selectedMonster.healthPoints <= 0) {
        // Monster is defeated, handle victory logic
        if (confirm("Victory - Monster Defeated! Do you want to restart?")) {
            updatePlayerLife();
            levelUp();
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
    currentPlayerHealthPoints = playerHealthPoints;
    currentPlayerAttack = playerAttack;
    currentPlayerDefense = playerDefense;
    currentPlayerHealthPotions = playerHealthPotions;
}

//Function for use health Potions
function useHealthPotion(){
    if (currentPlayerHealthPotions >= 1){
        currentPlayerHealthPoints += 30;
        --currentPlayerHealthPotions;
        updatePlayerLife();
        console.log("You have left:" + currentPlayerHealthPotions + " Health Potions!");
        updatePlayerStats();
    }else if (currentPlayerHealthPotions <= 0) {
        alert("You are out of potions");
    }    
}

//Function To increase the character stats every win
function levelUp(){
    //Increase HP, Attack and defense related to the dungeon you enter
    currentPlayerHealthPoints += 5;
    currentPlayerAttack += 1;
    currentPlayerDefense += 1;
    alert("Level up! Your stats have increased.\n You Increased 5 Health Point.\n You Increased 1 Attack Point.\n You Increased 1 Defense Point");
    updatePlayerStats();
    updatePlayerLife();

    //Small chance to get an item which will give a bonus status
    if (Math.random()<= 0.05){
        dropItem(gameType);
    }

    if (Math.random() <= 0.99) {
        alert("The " + selectedMonster.name + " dropped a Health Potion");
        currentPlayerHealthPotions++;
        updatePlayerStats(); 
}
}

// Function for drop item related to each Dungeon
function dropItem(item){
    if (item) {
        alert("test");
    }
}


