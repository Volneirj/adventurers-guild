// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    // Get the button elements and add Event Listeners to them
    let buttons = document.getElementsByClassName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            let gameType = this.getAttribute("dungeon");
            if (gameType === "leveltwo"){
                selectedMonster = dungeon(gameType);                
                if (currentPlayerAttack >= selectedMonster.attack*0.8){
                    runGame(gameType);
                }else{                   
                    alertWeak();
                }
            }else if (gameType === "levelthree"){
                selectedMonster = dungeon(gameType);
                if (currentPlayerAttack >= selectedMonster.attack*0.8){
                    runGame(gameType);
                }else{                    
                    alertWeak();
                }
            }else if(gameType === "levelfour"){
                selectedMonster = dungeon(gameType);
                if (currentPlayerAttack >= selectedMonster.attack*0.8){
                    runGame(gameType);
                }else{                    
                    alertWeak();
                }
            }else{
                runGame(gameType);
            }
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
            // Back to the Main screen
            runGame("default");
            toggleButtons(false);

        }
    });
    document.getElementById("how-to-play").addEventListener("click", function () {
        alert("1 - Select the Dungeon.\n2 - To defeat the monster, Attack or Heal yourself using potions.\n3 - After killing the monster, you will increase your stats.\n4 - Dungeons have a chance to drop a Health potions or magic pearls.\n5 - Magic Pearls add extra stats to your Hero.\n6 - Every Dungeon has a minimum attack to enter (It is not guaranteed that you will survive).\n\nGet strong, clear the dungeons, and become a Legend!!");
    });
    //Default game
    runGame("default");
    setBackground();
});

// Game Variables
// Hero stats
let maxPlayerHealth =100;
let playerHealthPoints = 100;
let playerAttack = 25;
let playerDefense = 0;
let playerHealthPotions = 12;

// Player and monster life inicialization
let selectedMonster = null; 
let currentPlayerHealthPoints = playerHealthPoints; 
let currentPlayerAttack = playerAttack;
let currentPlayerDefense = playerDefense;
let currentPlayerHealthPotions = playerHealthPotions;

// Monster List
var monsters = [
    new Monster("Goblin", 100, 25, 10, "levelone", "Short Sword"),
    new Monster("Goblin Paladin", 500, 125, 125, "leveltwo", "Iron Shield"),
    new Monster("Hobgoblin", 2500, 625, 700, "levelthree", "Life Totem"),
    new Monster("Goblin Shaman", 10000, 1800, 1500, "levelfour", "Clarity Potion"),
    new Monster("Champion", 50000, 5000, 5000, "levelfive", "Long Sword"),
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
    // Monster life bar/Status    
    removeMonsterImages();
    selectedMonster = dungeon(gameType);
    console.log(selectedMonster); 
    // Set Background related to the gametype   
    setBackground(); 
    // Updated Select monster stats
    updateMonsterStats();
    updateMonsterHealth();    
    //Update player stats
    updatePlayerStats();    
    updatePlayerLife();
    // Remove monster stats from first screem  
    hideMonsterStat(); 
    // When start the game start with default game to not toggle the buttons
    if (gameType !== "default") {
        toggleButtons(true);
    }
}
// This function loads the monster and adds the status to start the battle
function dungeon(gameType) {
    // Select the monster from the monster array
    let selectedMonster = monsters.find(monster => monster.gameType === gameType);

    // Reset the monster's health to its initial value
    selectedMonster.healthPoints = selectedMonster.initialHealth;
    return selectedMonster;
}

// Function to toggle the buttons while in fight mode
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

// Function for attack Button
function attackButton() {
    // Calculate damage dealt and update monster health
    let damageDealt = calculateDamage(currentPlayerAttack, selectedMonster.defense);
    console.log("You damaged the " + selectedMonster.name + " for "+ damageDealt + " hit points");
    selectedMonster.healthPoints -= damageDealt;
    // Call Function to update Health
    updateMonsterHealth();

    // Calculate damage taken and update player health
    let damageTaken = calculateDamage(selectedMonster.attack, currentPlayerDefense);
    console.log("The "+ selectedMonster.name + " dameged you for " + damageTaken+ " hit points");
    currentPlayerHealthPoints -= damageTaken;
    // Call Function to update Health
    updatePlayerLife();

    // Check game status after the attack
    checkGameStatus();
}

// Function to Update playerLife
function updatePlayerLife() {
    let playerLifeBar = document.getElementById("character-life");
    playerLifeBar.textContent = `${currentPlayerHealthPoints}/${maxPlayerHealth} `;
    updateLifeBarColor("character-life", currentPlayerHealthPoints, maxPlayerHealth);
}
// Function To update Player stats and name
function updatePlayerStats(){
    let characterName = document.getElementById("character-name");
    let characterStats = document.getElementById("character-stats");
    characterName.textContent ="Hero"  
    characterStats.textContent = `Atk: ${currentPlayerAttack} Def: ${currentPlayerDefense}`;
    let characterHealthPotion = document.getElementById("potion-button");  
    characterHealthPotion.textContent =`Use Health Potion (${currentPlayerHealthPotions})`;
}

// Function To update monster Stats name
function updateMonsterStats(){
    let monsterName = document.getElementById("monster-name");      
    let monsterStats = document.getElementById("monster-stats");
    monsterName.textContent = selectedMonster.name;    
    monsterStats.textContent = "Atk: " + selectedMonster.attack + " Def: " + selectedMonster.defense;
}

// Function to update monster health/name and stats
function updateMonsterHealth() {  
    let monsterLifeBar = document.getElementById("monster-life");
    monsterLifeBar.textContent = `${selectedMonster.healthPoints}/${selectedMonster.initialHealth}`;
    updateLifeBarColor("monster-life", selectedMonster.healthPoints, selectedMonster.initialHealth);
}

// Function to calculate damage
function calculateDamage(attackValue, defenseValue) {
    return Math.max(0, Math.floor(Math.random() * attackValue) - Math.floor(Math.random() * defenseValue));
}

// Function Get the result of the battle
function checkGameStatus() {
    console.log("Player Health: ", currentPlayerHealthPoints);
    console.log("Monster Health: ", selectedMonster ? selectedMonster.healthPoints : "N/A");
    if (currentPlayerHealthPoints <= 0) {
        // Player is defeated, handle game over logic
        if (confirm("Game Over - Player Defeated! Do you want to restart?")) {
            removeMonsterImages();
            runGame("default");
            toggleButtons(false);
            resetPlayerstats();
        }
    } else if (selectedMonster && selectedMonster.healthPoints <= 0) {
        // Monster is defeated, handle victory logic
        if (confirm("Victory - Monster Defeated! Do you want to restart?")) {
            removeMonsterImages();
            updatePlayerLife();            
            levelUp(selectedMonster.gameType);
            runGame("default");
            toggleButtons(false);           
        }   
    }
}

// Function to reset player stats in case of death
function resetPlayerstats(){
    maxPlayerHealth = 100;
    currentPlayerHealthPoints = playerHealthPoints;
    currentPlayerAttack = playerAttack;
    currentPlayerDefense = playerDefense;
    currentPlayerHealthPotions = playerHealthPotions;
}

// Function for use health Potions
function useHealthPotion(){
    if (currentPlayerHealthPotions >= 1){
        // Increase the HP based on 25% of maximum health
        let healingAmount = Math.floor(0.25 * maxPlayerHealth);
        // Check if the hero is 100% HP and do not use potions;
        if (currentPlayerHealthPoints !== maxPlayerHealth){
            currentPlayerHealthPoints += healingAmount;
            // Decrease the Current health Potions
            --currentPlayerHealthPotions;
            alert("You Healed " + healingAmount + "Points");
        }else {
            alert("You already have full health points!");
        }    
        // Garantee to not increase more than the maximum HP using potions
        if (currentPlayerHealthPoints > maxPlayerHealth) {
            currentPlayerHealthPoints = maxPlayerHealth;
        }              
    updatePlayerLife();
    updatePlayerStats();
    console.log("You have left:" + currentPlayerHealthPotions + " Health Potions!");      
    }else if (currentPlayerHealthPotions <= 0) {
        alert("You are out of potions");
    }    
}

// Function To increase the character stats every win
function levelUp(level){
    // Increase HP, Attack and defense related to the dungeon you enter
     let bonusHP = 15;
     let bonusATK = 2;
     let bonusDEF = 2;
    if (level === "levelone") {        
        maxPlayerHealth += bonusHP;
        currentPlayerAttack += bonusATK;
        currentPlayerDefense += bonusDEF;
        alert("Level up! Your stats have increased.\n Your max HP increased by " +  bonusHP +  "points.\nYour max Attack increased by " + bonusATK + "points.\nYour max defense increased by " + bonusDEF +" points.");
    }else if (level === "leveltwo") {
        maxPlayerHealth += bonusHP*2;
        currentPlayerAttack += bonusATK*2;
        currentPlayerDefense += bonusDEF*2;
        alert("Level up! Your stats have increased.\n Your max HP increased by " +  bonusHP*2 +  "points.\nYour max Attack increased by " + bonusATK*2 + "points.\nYour max defense increased by " + bonusDEF*2 +" points.");
    }else if (level === "levelthree") {
        maxPlayerHealth += bonusHP*3;
        currentPlayerAttack += bonusATK*3;
        currentPlayerDefense += bonusDEF*3;
        alert("Level up! Your stats have increased.\n Your max HP increased by " +  bonusHP*3 +  "points.\nYour max Attack increased by " + bonusATK*3 + "points.\nYour max defense increased by " + bonusDEF*3 +" points.");
    }else if (level === "levelfour") {
        maxPlayerHealth += bonusHP*4;
        currentPlayerAttack += bonusATK*4;
        currentPlayerDefense += bonusDEF*4;
        alert("Level up! Your stats have increased.\n Your max HP increased by " +  bonusHP*4 +  "points.\nYour max Attack increased by " + bonusATK*4 + "points.\nYour max defense increased by " + bonusDEF*4 +" points.");
    }
    updatePlayerStats();
    updatePlayerLife();

    // Small chance to get an item which will give a bonus status
    if (Math.random()<= 0.25){
        dropItem(selectedMonster.gameType);
    }

    if (Math.random() <= 0.80) {
        alert("The " + selectedMonster.name + " dropped a Health Potion");
        currentPlayerHealthPotions++;
        updatePlayerStats(); 
    }
}

// Function for drop item related to each Dungeon
function dropItem(item){
    if (item === "levelone") {
        currentPlayerAttack += 10;
        alert("You Found a common magic Pearl\nYou Attack Increased in 15 points");
    }else if (item === "leveltwo") {
        currentPlayerDefense += 15;
        currentPlayerAttack += 15;
        alert("You Found a rare magic Pearl\nYou Attack and Defense Increased in 25 points");
    }else if (item === "levelthree") {
        maxPlayerHealth += 50;
        currentPlayerAttack += 25;
        currentPlayerDefense += 25;
        alert("You Found a Very Rare magic Pearl!\nYour Attack,Defense Increase in 40 points.\n Your HP Increased in 50 points");
    }else if (item === "levelfour") {
        maxPlayerHealth += 150;
        currentPlayerAttack += 40;
        currentPlayerDefense += 40;
        alert("You Found a Epic magic Pearl!\nYour Attack,Defense Increase in 100 points.\n Your HP Increased in 150 points");
    }
}

// Function to set the background and monster image
function setBackground(){   
    // Select the game container
    let gameContainer = document.querySelector(".game-container");
    // add a new class
    gameContainer.classList.add("background-image");
    // Set Image path
    let backgroundPath = `assets/images/${selectedMonster.gameType}-background.webp`;
    // Set the background image settings
    gameContainer.style.backgroundImage = `url('${backgroundPath}')`;
    // Attribution for the background image
    // Designed by Freepik (http://www.freepik.com)
    // Load the monster Image in a variable and add Src and alt.
    if (selectedMonster.gameType !== "default") {
        let monsterImage = document.createElement("img");
        // Set Image path
        monsterImage.src = `assets/images/${selectedMonster.gameType}-image.png`;
        monsterImage.alt = `${selectedMonster.name} Image - Designed by Freepik http://www.freepik.com`;
        monsterImage.classList.add("monster-image");
         // Append the additional image to the game container
        gameContainer.appendChild(monsterImage);
    }
}

// Function remove last image 
function removeMonsterImages() {
    let monsterImages = document.querySelectorAll(".monster-image");
    //Look for all images and delete it
    monsterImages.forEach((image) => {
        image.remove();
    });
}

// Game Effects
// Life bar color change usint the life percentage.
function updateLifeBarColor(hpBar, currentHp, maxHp) {
    let lifeBar = document.getElementById(hpBar);
    let Percentage = (currentHp / maxHp) * 100;
 
    // Change color based on percentage
    if (Percentage >= 70) {
        lifeBar.style.backgroundColor = "lime";
    } else if (Percentage >= 30) {
        lifeBar.style.backgroundColor = "yellow";
    } else {
        lifeBar.style.backgroundColor = "#FE6262";
    }
}

// Hide monster
function hideMonsterStat(){    
    if (selectedMonster.gameType === "default") {
        // Hide monster life and stats
        document.getElementById("how-to-play").style.display = "flex";
        document.getElementById("select-level").style.display = "flex";
        document.getElementById("monster-name").style.display = "none";        
        document.getElementById("monster-life").style.display = "none";
        document.getElementById("monster-stats").style.display = "none";
    } else {
        // Show monster life and stats
        document.getElementById("how-to-play").style.display = "none";
        document.getElementById("select-level").style.display = "none";
        document.getElementById("monster-name").style.display = "block";
        document.getElementById("monster-life").style.display = "block";
        document.getElementById("monster-stats").style.display = "block";
}
}

// Function for not strong enough for dungeon
function alertWeak(){
    alert(`You are not strong enough kido, you need a minimum ${parseInt(selectedMonster.attack*0.8)} of Attack Damage to enter this dungeon`);
}


