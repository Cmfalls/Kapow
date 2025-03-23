// Example: This will later trigger from your map click event when fully hooked up
function startBattleWithConnor() {
    startBattleWithOpponent("Connor");
}

// Optionally, placeholder turn loop function for future development
function startNewTurn() {
    console.log("New turn started — future battle logic goes here.");
}

const eventChoices = [];

eventChoices.push({
    name: "Vibe Check",
    title: "Can you read the vibe of the room?",
    description: "It’s a casual night in Con’s basement with the boys. Someone tosses out 'wtw'... What game option do you throw out?",
    options: [
        {
            text: "A: Xbox",
            cards: [
                { name: "Gang Beast", mana: 2, type: "creature", attack: 2, health: 2 },
                { name: "Master Chief", mana: 4, type: "creature", attack: 4, health: 4 },
                { name: "Make Way", mana: 3, type: "spell" },
                { name: "2v2 2K Blacktop", mana: 3, type: "spell" },
                { name: "John Madden", mana: 3, type: "creature", attack: 3, health: 3 },
                { name: "Gun Game", mana: 2, type: "spell" }
            ]
        },
        {
            text: "B: Switch",
            cards: [
                { name: "Timberman", mana: 2, type: "creature", attack: 2, health: 2 },
                { name: "Mario", mana: 4, type: "creature", attack: 4, health: 3 },
                { name: "BoomerangFU", mana: 3, type: "creature", attack: 3, health: 2 },
                { name: "Jamboree Loving", mana: 2, type: "spell" },
                { name: "Trivial Pursuit", mana: 3, type: "spell" },
                { name: "Overcooked", mana: 3, type: "spell" }
            ]
        },
        {
            text: "C: Board Game",
            cards: [
                { name: "Secret Hitler", mana: 3, type: "creature", attack: 3, health: 3 },
                { name: "Big Lib", mana: 4, type: "creature", attack: 4, health: 4 },
                { name: "Wingspan", mana: 3, type: "spell" },
                { name: "Catan Robber", mana: 3, type: "creature", attack: 3, health: 3 },
                { name: "Community Chest", mana: 2, type: "spell" },
                { name: "Liar's Dice (Spot On)", mana: 2, type: "spell" }
            ]
        }
    ]
});

eventChoices.push({
    question: "You just turned 18 — Time to vote! Choose your side:",
    options: [
        { 
            text: "Republican",
            cards: [
                { name: "Trump", mana: 4, type: "creature", attack: 4, health: 4 },
                { name: "Elon", mana: 3, type: "creature", attack: 3, health: 2 },
                { name: "RFK", mana: 2, type: "creature", attack: 2, health: 3 },
                { name: "MAGA", mana: 2, type: "spell" },
                { name: "Trickle Down Economics", mana: 3, type: "spell" }
            ]
        },
        { 
            text: "Democrat",
            cards: [
                { name: "Bernie", mana: 4, attack: 4, health: 4, type: "creature" },
                { name: "AOC", mana: 3, attack: 3, health: 2, type: "creature" },
                { name: "Biden", mana: 2, attack: 2, health: 3, type: "creature" },
                { name: "Green New Deal", mana: 3, type: "spell" },
                { name: "Free College", mana: 2, type: "spell" }
            ]
        }
    ]
});

eventChoices.push({
    name: "Grub",
    title: "You hungry?",
    description: "We’re in town and your stomach grumbles — what’s it craving?",
    options: [
        {
            text: "A: Chicken",
            cards: [
                { name: "Buff Joe", mana: 3, type: "creature", attack: 3, health: 3 },
                { name: "Harold's Chicken", mana: 4, type: "creature", attack: 4, health: 4 },
                { name: "Chicken Shack", mana: 3, type: "spell" },
                { name: "My Pleasure", mana: 2, type: "spell" },
                { name: "10Q", mana: 2, type: "spell" },
                { name: "Fried Chicken", mana: 3, type: "creature", attack: 3, health: 3 }
            ]
        },
        {
            text: "B: Pizza",
            cards: [
                { name: "Papa John", mana: 3, type: "creature", attack: 3, health: 3 },
                { name: "Lou Malnati", mana: 4, type: "creature", attack: 4, health: 4 },
                { name: "Gigios", mana: 3, type: "creature", attack: 3, health: 2 },
                { name: "Union Squared", mana: 3, type: "spell" },
                { name: "Bob’s Pizza Trivia", mana: 2, type: "spell" },
                { name: "Cheesy Crust", mana: 2, type: "spell" }
            ]
        },
        {
            text: "C: Burgers",
            cards: [
                { name: "Ali’s Broast", mana: 3, type: "creature", attack: 3, health: 3 },
                { name: "Burger King", mana: 4, type: "creature", attack: 4, health: 4 },
                { name: "Bigback", mana: 3, type: "creature", attack: 3, health: 3 },
                { name: "We Have The Meats", mana: 3, type: "spell" },
                { name: "Squid Sauce", mana: 2, type: "spell" },
                { name: "Backyard Grill", mana: 2, type: "spell" }
            ]
        }
    ]
});

eventChoices.push({
    name: "Let’s Get Physical",
    title: "Can you go D1?",
    description: "The boys have gathered for a pick-up — what are we picking up?",
    options: [
        {
            text: "A: The Basketball",
            cards: [
                { name: "Baby Jokic", mana: 3, type: "creature", attack: 3, health: 3 },
                { name: "Nazr Mohammed", mana: 4, type: "creature", attack: 4, health: 4 },
                { name: "D-Rose", mana: 4, type: "creature", attack: 4, health: 3 },
                { name: "LeBron", mana: 5, type: "creature", attack: 5, health: 5 },
                { name: "Heat Check", mana: 3, type: "spell" },
                { name: "Larry Legend", mana: 3, type: "spell" }
            ]
        },
        {
            text: "B: The Football",
            cards: [
                { name: "The Squatcher", mana: 3, type: "creature", attack: 3, health: 3 },
                { name: "Tommy Bohanon", mana: 4, type: "creature", attack: 4, health: 4 },
                { name: "Caleb Williams", mana: 5, type: "creature", attack: 5, health: 4 },
                { name: "Budda Baker", mana: 4, type: "creature", attack: 4, health: 3 },
                { name: "Bears Offensive Playbook", mana: 3, type: "spell" },
                { name: "The Sacko", mana: 2, type: "spell" }
            ]
        }
    ]
});

function triggerEventByIndex(index) {
    const event = eventChoices[index];
    if (!event) {
        console.error(`Event with index ${index} not found.`);
        return;
    }

    document.getElementById('eventTitle').innerText = event.title;
    document.getElementById('eventDescription').innerText = event.description;

    const optionsDiv = document.getElementById('eventOptions');
    optionsDiv.innerHTML = '';
    event.options.forEach((option, optionIndex) => {
        const btn = document.createElement('button');
        btn.innerText = option.text;
        btn.className = 'home-button';
        btn.style.margin = '10px';
        btn.onclick = () => {
            option.cards.forEach(card => {
                playerCollection.push(card);
                playerDeck.push(card);
            });

            // Save updated collections to localStorage
            localStorage.setItem('playerCollection', JSON.stringify(playerCollection));
            localStorage.setItem('playerDeck', JSON.stringify(playerDeck));

            // Mark event as completed and save to localStorage
            completedEvents.push(index);
            localStorage.setItem('completedEvents', JSON.stringify(completedEvents));

            // Redraw the map and close the popup
            drawMap();
            document.getElementById('eventPopup').style.display = 'none';
            logMessage(`✅ You gained cards from '${option.text}' choice.`);
        };
        optionsDiv.appendChild(btn);
    });

    hideAllScreens();
    document.getElementById('eventPopup').style.display = 'flex';
}

function showScreen(screenId) {
    hideAllScreens(); // Hide all other screens
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.style.display = 'flex'; // Show the selected screen
        if (screenId === 'mapScreen') {
            loadMap(); // Load the map when showing the map screen
        }
    } else {
        console.error(`Screen ${screenId} not found`);
    }
}

// Add event listeners for buttons
document.getElementById('startButton').addEventListener('click', () => showScreen('mapScreen'));
document.getElementById('deckButton').addEventListener('click', () => showScreen('deckScreen'));

document.addEventListener('DOMContentLoaded', () => {
    showScreen('homeScreen'); // Show the home screen by default
});
