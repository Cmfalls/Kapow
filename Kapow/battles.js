const enemyDeck = [
    { name: 'Con-dumb', attack: 3, health: 5, ability: 'doubleDamageOnCrit' },
    { name: 'Gangis Con', attack: 4, health: 4, ability: 'healAfterAttack' },
    { name: 'Pecon Cheddas', attack: 6, health: 6, ability: 'generateMana' },
    { name: 'Big Con', attack: 5, health: 7, ability: 'blockFirstAttack' },
    { name: 'Con Academy', attack: 2, health: 3, ability: 'buffAllCreatures' },
    { name: 'Jeff Probst', attack: 3, health: 4, ability: 'voteOutWeakest' },
    { name: 'Hazel', attack: 2, health: 5, ability: 'gainHealthOnSpell' },
    { name: 'Sammy', attack: 1, health: 6, ability: 'applyDebuffOnDeath' },
    { name: 'Bath Time', attack: 0, health: 0, ability: 'healAllCreatures' },
    { name: 'State Farm Agent', attack: 0, health: 0, ability: 'shieldNextCreature' },
    { name: 'Dec', attack: 4, health: 5, ability: 'reducePlayerMana' },
    { name: 'Granola Colorado Boy', attack: 3, health: 4, ability: 'immuneToPartial' },
    { name: 'Politics – Woke Lib', attack: 2, health: 3, ability: 'weakenStrongestCreature' },
    { name: 'Audible', attack: 0, health: 0, ability: 'enemyDrawsCards' },
    { name: 'Put in the Trap (Rage Cage)', attack: 5, health: 2, ability: 'skipPlayerNextTurn' },
    { name: 'Deadly Chop (Bong Rip)', attack: 6, health: 4, ability: 'stunPlayerCreature' }
];

let enemyCreatures = [];
let playerCreatures = [];
let playerHP = 20;
let enemyHP = 20;
let playerMana = 3;
let skipNextPlayerTurn = false;
let enemyShieldActive = false;

function startConBattle() {
    enemyCreatures = enemyDeck.map(card => ({ ...card }));
    playerCreatures = JSON.parse(localStorage.getItem('playerDeck')) || [];
    playerHP = 20;
    enemyHP = 20;
    playerMana = 3;
    skipNextPlayerTurn = false;
    enemyShieldActive = false;
    showScreen('battleScreen');
    logBattle('⚔️ Battle against Commissioner Con begins!');
    updateBattleUI();
}

function rollD20() {
    return Math.floor(Math.random() * 20) + 1;
}

function logBattle(message) {
    const log = document.getElementById('battleLog');
    const entry = document.createElement('div');
    entry.textContent = message;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}

function updateBattleUI() {
    document.getElementById('playerHP').innerText = `Player HP: ${playerHP}`;
    document.getElementById('enemyHP').innerText = `Con HP: ${enemyHP}`;
    const playerField = document.getElementById('playerCreatures');
    const enemyField = document.getElementById('enemyCreatures');
    playerField.innerHTML = '';
    enemyField.innerHTML = '';

    playerCreatures.forEach((creature) => {
        const div = document.createElement('div');
        div.innerText = `${creature.name} (ATK: ${creature.attack}, HP: ${creature.health})`;
        div.classList.add('creature-card');
        playerField.appendChild(div);
    });

    enemyCreatures.forEach((creature) => {
        const div = document.createElement('div');
        div.innerText = `${creature.name} (ATK: ${creature.attack}, HP: ${creature.health})`;
        div.classList.add('enemy-card');
        enemyField.appendChild(div);
    });
}

function playerAttackPhase() {
    if (skipNextPlayerTurn) {
        logBattle('⏭️ Player skips this turn (Trap effect).');
        skipNextPlayerTurn = false;
        enemyTurn();
        return;
    }
    logBattle('🗡️ Player attack phase begins!');
    playerCreatures.forEach((creature) => {
        if (creature.stunned) {
            logBattle(`${creature.name} is stunned and skips this turn.`);
            creature.stunned = false;
            return;
        }

        if (enemyCreatures.length > 0) {
            const target = enemyCreatures[0];
            const roll = rollD20();
            let damage = roll >= 15 ? creature.attack : (roll >= 10 ? Math.floor(creature.attack / 2) : 0);

            if (creature.ability === 'doubleDamageOnCrit' && roll === 20) {
                damage *= 2;
                logBattle(`🔥 ${creature.name} critical hit doubled!`);
            }
            if (enemyShieldActive) {
                logBattle(`🛡️ Enemy shield blocked damage from ${creature.name}!`);
                enemyShieldActive = false;
                damage = 0;
            }

            target.health -= damage;
            logBattle(`${creature.name} hits ${target.name} for ${damage} damage.`);

            if (creature.ability === 'generateMana') {
                playerMana += 1;
                logBattle(`${creature.name} generated +1 mana!`);
            }

            if (target.health <= 0) {
                logBattle(`💀 ${target.name} was defeated!`);
                triggerEnemyOnDeath(target);
                enemyCreatures.shift();
            }
        } else {
            enemyHP -= creature.attack;
            logBattle(`${creature.name} attacks Con directly for ${creature.attack} damage.`);
        }
    });
    updateBattleUI();
    enemyTurn();
}

function triggerEnemyOnDeath(creature) {
    if (creature.ability === 'applyDebuffOnDeath') {
        playerCreatures.forEach(pc => pc.attack = Math.max(pc.attack - 1, 1));
        logBattle('😈 Sammy’s death debuffed your creatures.');
    }
}

function enemyTurn() {
    logBattle('👾 Con\'s turn begins!');
    enemyCreatures.forEach((creature) => {
        if (playerCreatures.length > 0 && creature.attack > 0) {
            const target = playerCreatures[Math.floor(Math.random() * playerCreatures.length)];
            let roll = rollD20();
            let damage = roll >= 15 ? creature.attack : (roll >= 10 ? Math.floor(creature.attack / 2) : 0);

            if (creature.ability === 'doubleDamageOnCrit' && roll === 20) {
                damage *= 2;
                logBattle(`🔥 ${creature.name} lands a double critical hit!`);
            }
            target.health -= damage;
            logBattle(`${creature.name} attacks ${target.name} for ${damage} damage.`);

            if (creature.ability === 'healAfterAttack') {
                creature.health += 2;
                logBattle(`${creature.name} healed 2 HP after attacking.`);
            }

            if (target.health <= 0) {
                logBattle(`💀 Your ${target.name} was defeated!`);
                playerCreatures = playerCreatures.filter(pc => pc.health > 0);
            }
        } else if (creature.attack > 0) {
            playerHP -= creature.attack;
            logBattle(`${creature.name} attacks you directly for ${creature.attack} damage!`);
            if (creature.ability === 'reducePlayerMana') {
                playerMana = Math.max(playerMana - 1, 0);
                logBattle(`${creature.name} reduced your mana by 1!`);
            }
            if (creature.ability === 'skipPlayerNextTurn') {
                skipNextPlayerTurn = true;
                logBattle(`⚠️ ${creature.name}'s attack caused you to skip your next turn!`);
            }
        }

        triggerEnemyAbilities(creature);
    });

    updateBattleUI();
    checkBattleEnd();
}

function triggerEnemyAbilities(creature) {
    if (creature.ability === 'buffAllCreatures') {
        enemyCreatures.forEach(c => {
            if (c !== creature) c.attack += 1;
        });
        logBattle(`${creature.name} buffs all enemy creatures by +1 attack!`);
    }
    if (creature.ability === 'shieldNextCreature') {
        enemyShieldActive = true;
        logBattle('🛡️ State Farm Agent provided a shield for the next enemy hit!');
    }
    if (creature.ability === 'healAllCreatures') {
        enemyCreatures.forEach(c => c.health += 2);
        logBattle('💧 Bath Time healed all enemy creatures for +2 HP!');
    }
    if (creature.ability === 'weakenStrongestCreature') {
        let strongest = playerCreatures.reduce((prev, curr) => (prev.attack > curr.attack) ? prev : curr);
        strongest.attack = Math.max(strongest.attack - 2, 1);
        logBattle(`${creature.name} weakened your strongest creature!`);
    }
    if (creature.ability === 'enemyDrawsCards') {
        logBattle('📖 Audible allowed Con to draw extra backup creatures!');
    }
    if (creature.ability === 'stunPlayerCreature') {
        if (playerCreatures.length > 0) {
            const stunned = playerCreatures[Math.floor(Math.random() * playerCreatures.length)];
            stunned.stunned = true;
            logBattle(`${creature.name} stunned your ${stunned.name}!`);
        }
    }
}

function checkBattleEnd() {
    if (enemyHP <= 0 || enemyCreatures.length === 0) {
        logBattle('🎉 You defeated Commissioner Con!');
        showVictoryScreen();
    } else if (playerHP <= 0 || playerCreatures.length === 0) {
        logBattle('💀 You have been defeated by Commissioner Con.');
        showDefeatScreen();
    } else {
        setTimeout(playerAttackPhase, 1000);
    }
}

function showVictoryScreen() {
    const victoryModal = document.createElement('div');
    victoryModal.className = 'victory-modal';
    victoryModal.innerHTML = `
        <h2>🎉 Victory!</h2>
        <p>You have defeated Commissioner Con and unlocked his deck!</p>
        <button onclick="claimConDeck()">Add Con's Cards to Collection & Return to Map</button>
    `;
    document.body.appendChild(victoryModal);
}

function claimConDeck() {
    const currentCollection = JSON.parse(localStorage.getItem('playerCollection')) || [];
    enemyDeck.forEach(card => currentCollection.push(card));
    localStorage.setItem('playerCollection', JSON.stringify(currentCollection));
    document.querySelector('.victory-modal').remove();
    logBattle('🏆 Con\'s deck has been added to your collection.');
    showScreen('mapScreen');
}

function showDefeatScreen() {
    const defeatModal = document.createElement('div');
    defeatModal.className = 'defeat-modal';
    defeatModal.innerHTML = `
        <h2>😢 Defeat</h2>
        <p>Commissioner Con proved too strong. Try building a stronger deck and challenge him again!</p>
        <button onclick="returnToMapAfterDefeat()">Return to Map</button>
    `;
    document.body.appendChild(defeatModal);
}

function returnToMapAfterDefeat() {
    document.querySelector('.defeat-modal').remove();
    showScreen('mapScreen');
}