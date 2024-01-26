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
        alert("Attcking the monster!");
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
let playerDefense = 10;
let playerHealthPotions = 3;

// Monster List
var monsters = [
    new Monster("Goblin", 50, 10, 0, "levelone"),
    new Monster("Goblin Paladin", 100, 20, 20, "leveltwo"),
    new Monster("Hobgoblin", 250, 35, 25, "levelthree"),
    new Monster("Goblin Shaman", 400, 40, 20, "levelfour"),
    new Monster("Goblin Champion", 1000, 100, 100, "levelfive"),
    new Monster("None", 0, 0, 0, "default")
];

// Function to create the monsters
function Monster(name, healthPoints, attack, defense, gameType) {
    this.name = name;
    this.healthPoints = healthPoints;
    this.attack = attack;
    this.defense = defense;
    this.gameType = gameType;
}

// Main Game Loop
function runGame(gameType) {
    selectedMonster = dungeon(gameType);  
    let monsterLifeBar = document.getElementById("monster-life");
    let monsterStats = document.getElementById("monster-stats");
    monsterLifeBar.textContent = selectedMonster.name + " " + "HP:" + selectedMonster.healthPoints;
    monsterStats.textContent = "Att: " + selectedMonster.attack + " Def: " + selectedMonster.defense;
    let characterLife = document.getElementById("character-life");
    characterLife.textContent = "Hero HP: " + playerHealthPoints;
    let characterStats = document.getElementById("character-stats");
    characterStats.textContent = "Att: " + playerAttack + " Def: " + playerDefense + " Health Potions: " + playerHealthPotions;

    if (gameType !== "default") {
        toggleButtons(true);
    }
}
// This function loads the monster and adds the status to start the battle
function dungeon(gameType) {
    return monsters.find(monster => monster.gameType === gameType);
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
