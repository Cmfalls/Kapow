const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

const mapNodes = [
    { x: 100, y: 100, type: 'event', eventIndex: 0, unlocked: true, completed: false },
    { x: 250, y: 150, type: 'event', eventIndex: 1, unlocked: false, completed: false },
    { x: 400, y: 100, type: 'event', eventIndex: 2, unlocked: false, completed: false },
    { x: 550, y: 150, type: 'event', eventIndex: 3, unlocked: false, completed: false },
    { x: 700, y: 100, type: 'fight', boss: true, unlocked: false, completed: false }
];

const completedEvents = JSON.parse(localStorage.getItem('completedEvents')) || [];
const playerCollection = JSON.parse(localStorage.getItem('playerCollection')) || [];

// Standardized screen switching
function hideAllScreens() {
    ['homeScreen', 'mapScreen', 'deckScreen', 'instructionsModal', 'creditsModal', 'battleScreen', 'eventPopup'].forEach(id => {
        const screen = document.getElementById(id);
        if (screen) screen.style.display = 'none';
    });
}

function showScreen(screenId) {
    hideAllScreens();
    document.getElementById(screenId).style.display = 'flex';
}

// Draw the map
function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paths
    ctx.strokeStyle = 'white';
    for (let i = 0; i < mapNodes.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(mapNodes[i].x, mapNodes[i].y);
        ctx.lineTo(mapNodes[i + 1].x, mapNodes[i + 1].y);
        ctx.stroke();
    }

    // Draw nodes
    mapNodes.forEach((node, index) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
        const isCompleted = completedEvents.includes(index);
        ctx.fillStyle = isCompleted
            ? 'green'
            : node.unlocked
            ? node.boss
                ? 'red'
                : 'orange'
            : 'gray';
        ctx.fill();

        ctx.strokeStyle = 'black';
        ctx.stroke();

        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(
            node.boss ? 'Con' : `E${index + 1}`,
            node.x,
            node.y + 5
        );
    });
}

// Handle map node clicks
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    mapNodes.forEach((node, index) => {
        const dist = Math.sqrt((node.x - clickX) ** 2 + (node.y - clickY) ** 2);
        if (dist <= 20 && node.unlocked) {
            if (node.type === 'event' && !completedEvents.includes(index)) {
                triggerEventByIndex(node.eventIndex);
            } else if (node.boss && completedEvents.length >= 4) {
                startConBattle();
            }
        }
    });
});

// Trigger event by index
function triggerEventByIndex(eventIndex) {
    const event = eventChoices[eventIndex];
    if (!event) return;

    const popup = document.getElementById('eventPopup');
    popup.innerHTML = `
      <h2>${event.title}</h2>
      <p>${event.description}</p>
      <div id="eventOptions"></div>
    `;

    event.options.forEach((option, i) => {
        const btn = document.createElement('button');
        btn.innerText = option.text;
        btn.onclick = () => {
            // Add cards to playerCollection and playerDeck
            option.cards.forEach(card => {
                playerCollection.push(card);
                playerDeck.push(card);
            });

            // Save updates to localStorage
            localStorage.setItem('playerCollection', JSON.stringify(playerCollection));
            localStorage.setItem('playerDeck', JSON.stringify(playerDeck));

            // Mark event as completed
            completedEvents.push(eventIndex);
            localStorage.setItem('completedEvents', JSON.stringify(completedEvents));

            // Close popup and redraw map
            popup.style.display = 'none';
            drawMap();
            alert(`✅ You gained cards from: "${option.text}"`);
        };
        popup.appendChild(btn);
    });

    popup.style.display = 'block';
}

// Start the battle
function startConBattle() {
    showScreen('battleScreen'); // Use standardized screen switching
}

// Initialize the map
drawMap();
