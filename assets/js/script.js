/*jshint esversion: 6 */
/*jshint esversion: 8 */

//DOM Variables
const attackButton = document.getElementById("attack-button");
const potionButton = document.getElementById("potion-button");
const runButton = document.getElementById("run-button");
const HowToPlay = document.getElementById("how-to-play");
const SelectLevel = document.getElementById("select-level");
const monsterName = document.getElementById("monster-name");
const monsterStats = document.getElementById("monster-stats");
const monsterLifeBar = document.getElementById("monster-life");
const HeroLifeBar = document.getElementById("character-life");
const characterName = document.getElementById("character-name");
const characterStats = document.getElementById("character-stats");

// Wait for the DOM to finish loading before running the game
window.onload = function () {
    // Get the button elements and add Event Listeners to them
    let buttons = document.getElementsByClassName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            let gameType = this.getAttribute("id");
            selectedMonster = dungeon(gameType);
            if (gameType === "levelone") {
                if (currentHeroAttack <= selectedMonster.attack * 6) {
                    runGame(gameType);
                } else {
                    showPopup(`<p>You are too strong the ${selectedMonster.name} run away in fear.</p>`, 2000);
                }
            } else if (gameType === "leveltwo") {
                if (currentHeroAttack >= selectedMonster.attack * 0.8) {
                    runGame(gameType);
                } else {
                    alertWeak();
                }
            } else if (gameType === "levelthree") {
                if (currentHeroAttack >= selectedMonster.attack * 0.8) {
                    runGame(gameType);
                } else {
                    alertWeak();
                }
            } else if (gameType === "levelfour") {
                if (currentHeroAttack >= selectedMonster.attack * 0.8) {
                    runGame(gameType);
                } else {
                    alertWeak();
                }
            } else {
                runGame(gameType);
            }
        });
    }

    // Add event listeners for the action buttons    
    attackButton.addEventListener("click", function () {
        // If Hero and Monster HP are bigger than 0, when clicked will attack.
        if (currentHeroHitPoints > 0 && selectedMonster.HitPoints > 0) {
            logicAttackButton();
            // If Hero HP bigger than 0 and Monster HP less or equal zero, when clicked will call continue dungeon
        } else if (selectedMonster.HitPoints <= 0 || currentHeroHitPoints > 0) {
            continueDungeon();
            // If hero HP less or equal zero, when clicked will check status, tell you are dead and  sugest to use potion
        } else if (currentHeroHitPoints <= 0) {
            checkGameStatus();
            showPopup("<p>You are dead - Use potion to have another chance</p>", 2000);
        }
    });

    potionButton.addEventListener("click", function () {
        // If clicked will call useHealthPotion
        useHealthPotion();
    });

    runButton.addEventListener("click", function () {
        // When clicked will move to the main screen
        (async () => {
            if (await showConfirmation("Running away from the monster!") && (currentHeroHitPoints > 0)) {
                // Back to the Main screen
                runGame("default");
                toggleButtons(false);
            }
        })();
        // Handle the situation when the Hero is dead and click in cancel and then so run will go to main screen
        if (currentHeroHitPoints <= 0) {
            checkGameStatus();
            showPopup("<p>You Don't have much option you are dead - Stats Reseted</p>");
            updateHeroAfterDeath();
            toggleButtons(false);
        }
    });
    HowToPlay.addEventListener("click", function () {
        showPopup(`
        <p>1 - Select the Dungeon.</p>
        <p>2 - To play the game, Attack, Heal or Run.</p>
        <p>3 - After killing the monster, your status will be increased.</p>
        <p>4 - Dungeons drop a Health potions and magic pearls.</p>
        <p>5 - Magic Pearls add extra stats to your Hero.</p>
        <p>6 - Every Dungeon has a minimum attack to enter.</p>
        <br>
        <p>Get strong, clear the dungeons, and become a Legend!!</p>`);
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
const maxHeroHitPoints = 100;
const heroHitPoints = 100;
const heroAttack = 25;
const heroDefense = 0;
const heroHealthPotions = 14;

const bonusATK = 2;
const bonusDEF = 2;
const bonusHP = 10;

const itemDropProbrability = 0.25;
const potionDropProbability = 0.8;

// List of Hero and monster variable inicialization
let selectedMonster = null;
let currentHeroHitPoints = heroHitPoints;
let currentHeroAttack = heroAttack;
let currentHeroDefense = heroDefense;
let currentHeroHealthPotions = heroHealthPotions;
let currentMaxHeroHitPoints = maxHeroHitPoints;

// List of monster, each representing a different level (Base on https://www.youtube.com/watch?v=EpB9u4ItOYU&ab )
const monsters = [
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

function dungeon(gameType) {
    // Select the monster from the monster array
    let selectedMonster = monsters.find(monster => monster.gameType === gameType);
    // Check if a monster is found
    if (!selectedMonster) {
        console.error(`No monster found for game type: ${selectedMonster.gameType}`);
        return monsters.find(monster => monster.gameType === "default");
    }
    // Reset the monster's health to its initial value
    selectedMonster.HitPoints = selectedMonster.initialHealth;
    return selectedMonster;
}

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
        HowToPlay.style.display = "none";
        SelectLevel.style.display = "none";
        // Show monster name, life, stats
        monsterName.style.display = "block";
        monsterLifeBar.style.display = "block";
        monsterStats.style.display = "block";
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
        monsterName.style.display = "none";
        monsterLifeBar.style.display = "none";
        monsterStats.style.display = "none";
        // show how to play and select level
        HowToPlay.style.display = "flex";
        SelectLevel.style.display = "flex";

    }
}

// Function for attack Button (Base on https://www.youtube.com/watch?v=EpB9u4ItOYU&ab )
function logicAttackButton() {
    // Calculate damage dealt and update monster health
    let damageDealt = calculateDamage(currentHeroAttack, selectedMonster.defense);
    selectedMonster.HitPoints -= damageDealt;
    if (selectedMonster.HitPoints <= 0) {
        selectedMonster.HitPoints = 0;
    }
    updateMonsterHitpoints();
    // Calculate damage taken and update Hero health
    let damageTaken = calculateDamage(selectedMonster.attack, currentHeroDefense);
    currentHeroHitPoints -= damageTaken;
    if (currentHeroHitPoints <= 0) {
        currentHeroHitPoints = 0;
    }
    updateHeroLife();
    checkGameStatus();
}

function updateHeroLife() {
    HeroLifeBar.textContent = `${currentHeroHitPoints}/${currentMaxHeroHitPoints} `;
    updateLifeBarColor("character-life", currentHeroHitPoints, currentMaxHeroHitPoints);
}

function updateHeroStats() {
    characterName.textContent = "Hero";
    characterStats.textContent = `Atk:${currentHeroAttack} Def:${currentHeroDefense}`;
    potionButton.textContent = `Use Health Potion (${currentHeroHealthPotions})`;
}

function updateMonsterStats() {
    monsterName.textContent = selectedMonster.name;
    monsterStats.textContent = "Atk:" + selectedMonster.attack + " Def:" + selectedMonster.defense;
}

function updateMonsterHitpoints() {
    monsterLifeBar.textContent = `${selectedMonster.HitPoints}/${selectedMonster.initialHealth}`;
    updateLifeBarColor("monster-life", selectedMonster.HitPoints, selectedMonster.initialHealth);
}

//(Base on https://www.youtube.com/watch?v=EpB9u4ItOYU&ab )
function calculateDamage(attackValue, defenseValue) {
    // Use of math.floor to ensure non-negative integer
    return Math.max(0, Math.floor(Math.random() * attackValue) - Math.floor(Math.random() * defenseValue));
}

async function checkGameStatus() {
    if (currentHeroHitPoints <= 0) {
        // Hero is defeated, handle game over logic
        if (await showConfirmation("Game Over - You are Dead! Do you want to restart?")) {
            updateHeroAfterDeath();
        }
    } else if (selectedMonster && selectedMonster.HitPoints <= 0) {
        // Monster is defeated, handle victory logic
        removeMonsterImages();
        await levelUp(selectedMonster.gameType);
        await continueDungeon();
    }
}

// Reset, move back to main screen and update hero info
function updateHeroAfterDeath() {
    removeMonsterImages();
    runGame("default");
    toggleButtons(false);
    resetHeroStats();
    updateHeroStats();
    updateHeroLife();
}

function resetHeroStats() {
    // Set hero stats to inicial value
    currentMaxHeroHitPoints = maxHeroHitPoints;
    currentHeroHitPoints = heroHitPoints;
    currentHeroAttack = heroAttack;
    currentHeroDefense = heroDefense;
    currentHeroHealthPotions = heroHealthPotions;
}

//(Base on https://www.youtube.com/watch?v=EpB9u4ItOYU&ab )
async function useHealthPotion() {
    if (currentHeroHealthPotions >= 1) {
        // Increase the HP based on 25% of maximum health
        let healingAmount = Math.floor(0.25 * currentMaxHeroHitPoints);
        // Check if the hero is 100% HP and do not use potions;
        if (currentHeroHitPoints !== currentMaxHeroHitPoints) {
            currentHeroHitPoints += healingAmount;
            // Decrease the Current health Potions
            --currentHeroHealthPotions;
            await showPopup(`<p>You Healed <span>${healingAmount}</span> Points</p>`, 1000, 'green');
        } else {
            await showPopup(`<p>You already have full hitpoints!</p>`, 1000);
        }
        // Garantee to not increase more than the maximum HP using potions
        if (currentHeroHitPoints > currentMaxHeroHitPoints) {
            currentHeroHitPoints = currentMaxHeroHitPoints;
        }
        updateHeroLife();
        updateHeroStats();
    } else if (currentHeroHealthPotions <= 0) {
        await showPopup("<p>You are out of potions</p>", 1000);
    }
}

//Increase status after every win
async function levelUp(level) {
    // Select the dungeon and gives proper bonus stats
    if (level === "levelone") {
        await dungeonBonus(1);
    } else if (level === "leveltwo") {
        await dungeonBonus(2);
    } else if (level === "levelthree") {
        await dungeonBonus(3);
    } else if (level === "levelfour") {
        await dungeonBonus(4);
    }
    // Small chance to get an item which will give a bonus status
    if (Math.random() <= itemDropProbrability) {
        await dropItem(selectedMonster.gameType);
    }
    if (Math.random() <= potionDropProbability) {
        await showPopup(`<p>The ${selectedMonster.name} dropped a Health Potion</p>`, 2000);
        currentHeroHealthPotions++;
    }
    updateHeroStats();
    updateHeroLife();
}

// Handle the drop item based on dungeon level
async function dropItem(item) {
    if (item === "levelone") {
        const randomChance = Math.random();
        if (randomChance <= 0.33) {
            currentHeroAttack += 10;
            await showPopup(`
            <p>You have found a common magic Pearl</p>
            <p>Attack + 10 points</p>`, 2000);
        } else if (randomChance <= 0.66) {
            currentHeroDefense += 10;
            await showPopup(`
            <p>You have found a common magic Pearl</p>
            <p>Defense + 10 points</p>`, 2000);
        } else {
            currentMaxHeroHitPoints += 30;
            await showPopup(`
            <p>You have found a common magic Pearl</p>
            <p>Max HP + 30 points</p>`, 2000);
        }
    } else if (item === "leveltwo") {
        currentHeroDefense += 15;
        currentHeroAttack += 15;
        await showPopup(`
        <p>You found a rare magic Pearl</p>
        <p>Attack + 15 points</p>
        <p>Defense + 15 points</p>`, 2000);
    } else if (item === "levelthree") {
        currentMaxHeroHitPoints += 50;
        currentHeroAttack += 25;
        currentHeroDefense += 25;
        await showPopup(`
        <p>You found a Very Rare magic Pearl!</p>
        <p>Attack + 25 points</p>
        <p>Defense + 25 points</p>
        <p>Max HP + 50 points</p>`, 2000);
    } else if (item === "levelfour") {
        currentMaxHeroHitPoints += 150;
        currentHeroAttack += 40;
        currentHeroDefense += 40;
        await showPopup(`
        <p>You found a Epic magic Pearl!</p>
        <p>Attack + 40 points</p>
        <p>Defense + 40 points</p>
        <p>Max HP + 150 points</p>`, 2000);
    }
}

// Handle the background and monster image
function setBackground() {
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

function removeMonsterImages() {
    let monsterImages = document.querySelectorAll(".monster-image");
    //Look for all images and delete it
    monsterImages.forEach((image) => {
        image.remove();
    });
}

// Life bar color change using the life percentage.
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

// Alert for not strong enough
async function alertWeak() {
    await showPopup(`You are not strong enough kiddo, you need a minimum 
    ${parseInt(selectedMonster.attack * 0.8)} of Attack Damage to enter this dungeon`, 2000);
}

// Continue in the dungeon or go back to the first page (user sugestion)
async function continueDungeon() {
    const userResponse = await showConfirmation("<p>Do you want continue in this dungeon?</p>");
    if (userResponse) {
        // User clicked "OK"
        runGame(selectedMonster.gameType);
        await showPopup(`<p>Suddenly, a ${selectedMonster.name} jumps out from behind a rock!</p>`, 2000);
    } else {
        // User clicked "Cancel"
        runGame("default");
        toggleButtons(false);
    }
}

async function dungeonBonus(bonusMultiplier) {
    currentMaxHeroHitPoints += bonusHP * bonusMultiplier;
    currentHeroAttack += bonusATK * bonusMultiplier;
    currentHeroDefense += bonusDEF * bonusMultiplier;
    await showPopup(`
    <p>You Defeated the ${selectedMonster.name}!</p>
    <p>Your stats have increased.</p>
    <p>Max HP + ${bonusHP * bonusMultiplier} points.</p>
    <p>Attack + ${bonusATK * bonusMultiplier} points.</p>
    <p>defense + ${bonusDEF * bonusMultiplier} points.</p>`);
}

async function showConfirmation(message) {
    return new Promise(resolve => {
        removeExistingPopUps();
        const popup = document.createElement('div');
        const messageElem = document.createElement('p');
        popup.classList.add('popup');
        messageElem.innerHTML = message;
        popup.appendChild(messageElem);
        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirm';
        confirmButton.addEventListener('click', () => {
            popup.remove();
            resolve(true);
        });
        popup.appendChild(confirmButton);
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', () => {
            popup.remove();
            resolve(false);
        });
        popup.appendChild(cancelButton);
        document.body.appendChild(popup);
    });
}

async function showPopup(message, duration = null, spanColor ='black') {
    return new Promise(resolve => {
        removeExistingPopUps();
        const popup = document.createElement('div');
        const messageElem = document.createElement('p');
        popup.classList.add('popup');
        messageElem.innerHTML = message;
        const findSpan = Array.from(document.getElementsByTagName('span'));
        findSpan.forEach(span => {
            span.style.color = spanColor;
        });       
        popup.appendChild(messageElem);
        document.body.appendChild(popup);
        //if set a duration it will stay on the screen for the duration time
        if (duration !== null) {
            setTimeout(() => {
                popup.remove();
                resolve();
            }, duration);
        }
        //When clicked outside the popup it will close
        const closePopup = () => {
            popup.remove();
            document.removeEventListener('click', closePopup);
            resolve();
        };

        document.addEventListener('click', function popupClickHandler(event) {
            if (event.target !== popup) {
                // Prevent the immediate closure when opening the popup
                document.removeEventListener('click', popupClickHandler);
                document.addEventListener('click', closePopup);
            }
        });
    });
}


function removeExistingPopUps() {
    const existingPopups = document.querySelectorAll('.popup');
    existingPopups.forEach(popup => popup.remove());
}