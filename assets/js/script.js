// Wait for the DOM to finish loading before running the game
window.onload = function () {
    // Get the button elements and add Event Listeners to them
    let buttons = document.getElementsByClassName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            let gameType = this.getAttribute("dungeon"); 
            selectedMonster = dungeon(gameType);           
            if(gameType ==="levelone"){
                if (currentHeroAttack <= selectedMonster.attack*6){                    
                    runGame(gameType);                    
                }else{                   
                    alert(`You are too strong the ${selectedMonster.name} run away in fear.`)
                }
            }else if(gameType === "leveltwo"){                               
                if (currentHeroAttack >= selectedMonster.attack*0.8){
                    runGame(gameType);
                }else{                   
                    alertWeak();
                }
            }else if (gameType === "levelthree"){              
                if (currentHeroAttack >= selectedMonster.attack*0.8){
                    runGame(gameType);
                }else{                    
                    alertWeak();
                }
            }else if(gameType === "levelfour"){                
                if (currentHeroAttack >= selectedMonster.attack*0.8){
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
        // If Hero and Monster HP are bigger than 0, when clicked will attack.
        if (currentHeroHitPoints > 0 && selectedMonster.HitPoints > 0){
            attackButton();
        // If Hero HP bigger than 0 and Monster HP less or equal zero, when clicked will call continue dungeon
        }else if (selectedMonster.HitPoints <= 0 || currentHeroHitPoints > 0 ){
            console.log("Monster dead");
            continueDungeon();
        // If hero HP less or equal zero, when clicked will check status, tell you are dead and  sugest to use potion
        }else if (currentHeroHitPoints <=0){            
            checkGameStatus();
            alert("You are dead - Use potion to have another chance");            
        }
    });
    
    document.getElementById("potion-button").addEventListener("click", function () {
        // If clicked and confirmed will call useHealthPotion
        if (confirm("Using a health potion!")){
            useHealthPotion();            
        }
    });

    document.getElementById("run-button").addEventListener("click", function () {
        // When clicked will move to the main screen
        if(confirm("Running away from the monster!") && (currentHeroHitPoints >0)){
            // Back to the Main screen
            runGame("default");
            toggleButtons(false);         
        }
        // Handle the situation when the Hero is dead and click in cancel and then so run will go to main screen
        if (currentHeroHitPoints <=0){            
            checkGameStatus();
            alert("You Don't have much option you are dead - Stats Reseted")
            updateHeroAfterDeath();
            toggleButtons(false);  
        }
    });
    document.getElementById("how-to-play").addEventListener("click", function () {
        alert("1 - Select the Dungeon.\n2 - To defeat the monster, Attack or Heal yourself using potions.\n3 - After killing the monster, you will increase your stats.\n4 - Dungeons have a chance to drop a Health potions or magic pearls.\n5 - Magic Pearls add extra stats to your Hero.\n6 - Every Dungeon has a minimum attack to enter (It is not guaranteed that you will survive).\n\nGet strong, clear the dungeons, and become a Legend!!");
    });
    //Default game for first run
    runGame("default");
    setBackground();
    //Reset hero stats for first run
    updateHeroStats();    
    updateHeroLife();
    //Toggle the buttons in the main screen first time
    toggleButtons(false);
};

// Game Variables
// List of variables with Hero Initial stats
let maxHeroHealth =100;
let HeroHitPoints = 100;
let HeroAttack = 25;
let HeroDefense = 0;
let HeroHealthPotions = 12;

// List of Hero and monster variable inicialization
let selectedMonster = null; 
let currentHeroHitPoints = HeroHitPoints; 
let currentHeroAttack = HeroAttack;
let currentHeroDefense = HeroDefense;
let currentHeroHealthPotions = HeroHealthPotions;

// List of monster, each representing a different level (Base on https://www.youtube.com/watch?v=EpB9u4ItOYU&ab )
var monsters = [
    new Monster("Goblin", 100, 25, 10, "levelone", "Short Sword"),
    new Monster("Goblin Paladin", 500, 125, 125, "leveltwo", "Iron Shield"),
    new Monster("Hobgoblin", 2500, 625, 700, "levelthree", "Life Totem"),
    new Monster("Goblin Shaman", 10000, 1800, 1500, "levelfour", "Clarity Potion"),
    new Monster("Champion", 50000, 5000, 5000, "levelfive", "Long Sword"),
    new Monster("None", 0, 0, 0, "default", "none")
];

// Constructor function for creating Monster instances
function Monster(name, HitPoints, attack, defense, gameType, itemDrop) {
    this.name = name;
    this.HitPoints = HitPoints;
    this.initialHealth = HitPoints;
    this.attack = attack;
    this.defense = defense;
    this.gameType = gameType;
    this.itemDrop = itemDrop;
}

// Main Game Loop
function runGame(gameType) {
    // Monster life bar/Status    
    removeMonsterImages();
    // Retrieve a monster based on the game type
    selectedMonster = dungeon(gameType);
    // Log the selected monster for debugging purposes
    console.log(selectedMonster); 
    // Set the background based on the game type  
    setBackground(); 
    // Update and display the selected monster's stats
    updateMonsterStats();
    updateMonsterHitpoints();    
    // When start the game start with default game to not toggle the buttons
    if (gameType !== "default") {
        toggleButtons(true);
    }
}
// This function loads a monster based on the provided game type and resets its hitpoints.
function dungeon(gameType) {
    // Select the monster from the monster array
    let selectedMonster = monsters.find(monster => monster.gameType === gameType);

    // Check if a monster is found
    if (!selectedMonster) {
        console.error(`No monster found for game type: ${selectedGameType}`);
        return monsters.find(monster => monster.gameType === "default");
    }

    // Reset the monster's health to its initial value
    selectedMonster.HitPoints = selectedMonster.initialHealth;
    return selectedMonster;
}

// Function to toggle between dungeon buttons and action buttons
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
        // hide How to play and select level
        document.getElementById("how-to-play").style.display = "none";
        document.getElementById("select-level").style.display = "none";
        // Show monster name, life, stats
        document.getElementById("monster-name").style.display = "block";
        document.getElementById("monster-life").style.display = "block";
        document.getElementById("monster-stats").style.display = "block";
    } else {
        // Show dungeon buttons
        for (let button of dungeonButtons) {
            button.style.display = "inline-block";
        }
        // Hide action buttons
        for (let actionButton of actionButtons) {
            document.getElementById(actionButton).style.display = "none";
        }
        // Hide monster name, life, stats
        document.getElementById("monster-name").style.display = "none";        
        document.getElementById("monster-life").style.display = "none";
        document.getElementById("monster-stats").style.display = "none";
        // show how to play and select level
        document.getElementById("how-to-play").style.display = "flex";
        document.getElementById("select-level").style.display = "flex";        

    }
}

// Function for attack Button
function attackButton() {
    // Calculate damage dealt and update monster health
    let damageDealt = calculateDamage(currentHeroAttack, selectedMonster.defense);
    console.log("You damaged the " + selectedMonster.name + " for "+ damageDealt + " hit points");
    selectedMonster.HitPoints -= damageDealt;      
    if (selectedMonster.HitPoints <= 0){
        selectedMonster.HitPoints =0;
    }
    // Call Function to update monster Hitpoints  
    updateMonsterHitpoints();

    // Calculate damage taken and update Hero health
    let damageTaken = calculateDamage(selectedMonster.attack, currentHeroDefense);
    console.log("The "+ selectedMonster.name + " dameged you for " + damageTaken+ " hit points");
    currentHeroHitPoints -= damageTaken;
    if (currentHeroHitPoints <= 0){
        currentHeroHitPoints =0;
    }
    // Call Function to update Hero Hitpoints
    updateHeroLife();

    // Check game status after the attack
    checkGameStatus();
}

// Function to Update Hero Life
function updateHeroLife() {
    let HeroLifeBar = document.getElementById("character-life");
    HeroLifeBar.textContent = `${currentHeroHitPoints}/${maxHeroHealth} `;
    updateLifeBarColor("character-life", currentHeroHitPoints, maxHeroHealth);
}
// Function To update Hero stats and name
function updateHeroStats(){
    let characterName = document.getElementById("character-name");
    let characterStats = document.getElementById("character-stats");
    characterName.textContent ="Hero"  
    characterStats.textContent = `Atk:${currentHeroAttack} Def:${currentHeroDefense}`;
    let characterHealthPotion = document.getElementById("potion-button");  
    characterHealthPotion.textContent =`Use Health Potion (${currentHeroHealthPotions})`;
}

// Function To update monster Stats name
function updateMonsterStats(){
    let monsterName = document.getElementById("monster-name");      
    let monsterStats = document.getElementById("monster-stats");
    monsterName.textContent = selectedMonster.name;    
    monsterStats.textContent = "Atk: " + selectedMonster.attack + " Def: " + selectedMonster.defense;
}

// Function to update monster health/name and stats
function updateMonsterHitpoints() {  
    let monsterLifeBar = document.getElementById("monster-life");
    monsterLifeBar.textContent = `${selectedMonster.HitPoints}/${selectedMonster.initialHealth}`;
    updateLifeBarColor("monster-life", selectedMonster.HitPoints, selectedMonster.initialHealth);
}

// Function to calculate damage (Base on https://www.youtube.com/watch?v=EpB9u4ItOYU&ab )
function calculateDamage(attackValue, defenseValue) {
    // Use of math.floor to ensure non-negative integer
    return Math.max(0, Math.floor(Math.random() * attackValue) - Math.floor(Math.random() * defenseValue));
}

// Function Get the result of the battle
function checkGameStatus() {
    console.log("Hero Health: ", currentHeroHitPoints);
    console.log("Monster Health: ", selectedMonster ? selectedMonster.HitPoints : "N/A");
    if (currentHeroHitPoints <= 0) {
        // Hero is defeated, handle game over logic
        if (confirm("Game Over - You are Dead! Do you want to restart?")) {
            updateHeroAfterDeath();
        }
    }else if (selectedMonster && selectedMonster.HitPoints <= 0) {
        // Monster is defeated, handle victory logic
        if (confirm("Victory - Monster Defeated! Do you want to restart?")) {
            removeMonsterImages();                       
            levelUp(selectedMonster.gameType);
            continueDungeon();    
        }   
    }
}

// Reset, move back to main screen and update hero info
function updateHeroAfterDeath(){
    removeMonsterImages();
    runGame("default");
    toggleButtons(false);           
    resetHeroStats();
    // Set Hero hit points to maximum
    currentHeroHitPoints=maxHeroHealth; 
    // Update hero stats and life               
    updateHeroStats();    
    updateHeroLife();
}

// Function to reset Hero stats in case of death
function resetHeroStats(){
    // Set hero stats to inicial value
    maxHeroHealth = 100;
    currentHeroHitPoints = HeroHitPoints;
    currentHeroAttack = HeroAttack;
    currentHeroDefense = HeroDefense;
    currentHeroHealthPotions = HeroHealthPotions;
}

// Function for use health Potions (Base on https://www.youtube.com/watch?v=EpB9u4ItOYU&ab )
function useHealthPotion(){
    if (currentHeroHealthPotions >= 1){
        // Increase the HP based on 25% of maximum health
        let healingAmount = Math.floor(0.25 * maxHeroHealth);
        // Check if the hero is 100% HP and do not use potions;
        if (currentHeroHitPoints !== maxHeroHealth){
            currentHeroHitPoints += healingAmount;
            // Decrease the Current health Potions
            --currentHeroHealthPotions;
            alert("You Healed " + healingAmount + "Points");
        }else {
            alert("You already have full health points!");
        }    
        // Garantee to not increase more than the maximum HP using potions
        if (currentHeroHitPoints > maxHeroHealth) {
            currentHeroHitPoints = maxHeroHealth;
        }              
    updateHeroLife();
    updateHeroStats();
    console.log("You have left:" + currentHeroHealthPotions + " Health Potions!");      
    }else if (currentHeroHealthPotions <= 0) {
        alert("You are out of potions");
    }    
}

// Function To increase the character stats every win
function levelUp(level){
    // Increase HP, Attack and defense related to the dungeon you enter
     let bonusHP = 15;
     let bonusATK = 2;
     let bonusDEF = 2;
    // Select the dungeon and gives proper bonus stats
    if (level === "levelone") {        
        maxHeroHealth += bonusHP;
        currentHeroAttack += bonusATK;
        currentHeroDefense += bonusDEF;
        alert("Level up! Your stats have increased.\n Your max HP increased by " +  bonusHP +  "points.\nYour max Attack increased by " + bonusATK + "points.\nYour max defense increased by " + bonusDEF +" points.");
    }else if (level === "leveltwo") {
        maxHeroHealth += bonusHP*2;
        currentHeroAttack += bonusATK*2;
        currentHeroDefense += bonusDEF*2;
        alert("Level up! Your stats have increased.\n Your max HP increased by " +  bonusHP*2 +  "points.\nYour max Attack increased by " + bonusATK*2 + "points.\nYour max defense increased by " + bonusDEF*2 +" points.");
    }else if (level === "levelthree") {
        maxHeroHealth += bonusHP*3;
        currentHeroAttack += bonusATK*3;
        currentHeroDefense += bonusDEF*3;
        alert("Level up! Your stats have increased.\n Your max HP increased by " +  bonusHP*3 +  "points.\nYour max Attack increased by " + bonusATK*3 + "points.\nYour max defense increased by " + bonusDEF*3 +" points.");
    }else if (level === "levelfour") {
        maxHeroHealth += bonusHP*4;
        currentHeroAttack += bonusATK*4;
        currentHeroDefense += bonusDEF*4;
        alert("Level up! Your stats have increased.\n Your max HP increased by " +  bonusHP*4 +  "points.\nYour max Attack increased by " + bonusATK*4 + "points.\nYour max defense increased by " + bonusDEF*4 +" points.");
    }
    // Small chance to get an item which will give a bonus status
    if (Math.random()<= 0.25){
        dropItem(selectedMonster.gameType);
    }

    if (Math.random() <= 0.85) {
        alert("The " + selectedMonster.name + " dropped a Health Potion");
        currentHeroHealthPotions++;       
    }
    //update Hero Stats/Life
    updateHeroStats();
    updateHeroLife();

}

// Function for drop item related to each Dungeon
function dropItem(item){
    if (item === "levelone") {
        currentHeroAttack += 10;
        alert("You Found a common magic Pearl\nYou Attack Increased in 15 points");
    }else if (item === "leveltwo") {
        currentHeroDefense += 15;
        currentHeroAttack += 15;
        alert("You Found a rare magic Pearl\nYou Attack and Defense Increased in 25 points");
    }else if (item === "levelthree") {
        maxHeroHealth += 50;
        currentHeroAttack += 25;
        currentHeroDefense += 25;
        alert("You Found a Very Rare magic Pearl!\nYour Attack,Defense Increase in 40 points.\n Your HP Increased in 50 points");
    }else if (item === "levelfour") {
        maxHeroHealth += 150;
        currentHeroAttack += 40;
        currentHeroDefense += 40;
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
        monsterImage.src = `assets/images/${selectedMonster.gameType}-image.webp`;
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

// Function for not strong enough for dungeon
function alertWeak(){
    alert(`You are not strong enough kiddo, you need a minimum ${parseInt(selectedMonster.attack*0.8)} of Attack Damage to enter this dungeon`);
}

//Function to continue in the dungeon or go back to the first page (user sugestion)
function continueDungeon(){
    const userResponse = window.confirm("Do you want continue in this dungeon?");
    if (userResponse) {
        // User clicked "OK" or answered "Yes"
        runGame(selectedMonster.gameType);
        alert(`Suddenly, a ${selectedMonster.name} jumps out from behind a rock!`);    
        console.log("User clicked Ok");
    } else {    
        // User clicked "Cancel" or answered "No"
        runGame("default"); 
        toggleButtons(false);    
        console.log("User clicked Cancel");
}
}


