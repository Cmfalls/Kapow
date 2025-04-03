function openDeckManager() {
    renderDeckManager();
    showScreen('deckScreen');
}

// Example starter collection and deck setup
const collection = [
    { name: "Jeff Probst", mana: 3, type: "creature" },
    { name: "Pecon Cheddas", mana: 5, type: "creature" },
    { name: "Gangis Con", mana: 3, type: "creature" },
    { name: "Sammy", mana: 1, type: "creature" },
    { name: "Hazel", mana: 2, type: "creature" },
    { name: "Bath Time", mana: 2, type: "spell" },
    { name: "Deadly Chop", mana: 3, type: "spell" },
    { name: "State Farm Agent", mana: 2, type: "spell" }
];

function saveDeck() {
    localStorage.setItem('playerDeck', JSON.stringify(playerDeck));
    alert('Deck saved!');
}

function renderDeckManager() {
    const collectionDiv = document.getElementById('collectionList');
    const deckDiv = document.getElementById('deckList');
    collectionDiv.innerHTML = '';
    deckDiv.innerHTML = '';

    playerCollection.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card-slot');
        cardDiv.innerHTML = `
            <strong>${card.name}</strong> (ATK: ${card.attack}, HP: ${card.health})<br>
            <small>${card.ability ? `Ability: ${card.ability}` : ''}</small><br>
        `;
        collectionDiv.appendChild(cardDiv);
    });

    playerDeck.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card-slot');
        cardDiv.innerHTML = `
            <strong>${card.name}</strong> (ATK: ${card.attack}, HP: ${card.health})<br>
            <small>${card.ability ? `Ability: ${card.ability}` : ''}</small><br>
            <button onclick="removeFromDeck(${index})">Remove</button>
        `;
        deckDiv.appendChild(cardDiv);
    });

    document.getElementById('deckCount').innerText = `Deck size: ${playerDeck.length}/20`;
}

function addToDeck(cardIndex) {
    if (playerDeck.length >= 20) {
        alert('Deck is full (20 cards max).');
        return;
    }
    playerDeck.push(playerCollection[cardIndex]);
    renderDeckManager();
}

function removeFromDeck(cardIndex) {
    playerDeck.splice(cardIndex, 1);
    renderDeckManager();
}

function saveAndReturn() {
    if (playerDeck.length < 20) {
        alert('Your deck must have 20 cards.');
        return;
    }
    saveDeck();
    showScreen('homeScreen');
}
