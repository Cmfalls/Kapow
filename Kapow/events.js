// Moved eventChoices array and all event pushes to the top level
const eventChoices = [];

eventChoices.push({
  title: "🎮 Vibe Check",
  description: "It's a casual night in Con's basement with the boys. Someone tosses out 'wtw'... What game option do you throw out?",
  options: [
    {
      text: "A: Xbox",
      cards: [
        { name: "Master Chief", attack: 6, health: 4 },
        { name: "Make Way", ability: "clearField" },
        { name: "2v2 Blacktop", ability: "boostAttack" },
        { name: "John Madden", attack: 4, health: 5 },
        { name: "Gun Game", ability: "stunEnemy" }
      ]
    },
    {
      text: "B: Switch",
      cards: [
        { name: "Timberman", attack: 3, health: 6 },
        { name: "Mario", attack: 4, health: 4 },
        { name: "Boomerang FU", attack: 5, health: 2 },
        { name: "Jamboree Loving", ability: "healPlayer" },
        { name: "Trivial Pursuit", ability: "revealTopCard" },
        { name: "Overcooked", ability: "shuffleDeck" }
      ]
    },
    {
      text: "C: Board Game",
      cards: [
        { name: "Secret Hitler", attack: 5, health: 5 },
        { name: "Big Lib", attack: 2, health: 3 },
        { name: "Wingspan", ability: "drawCard" },
        { name: "Catan Robber", attack: 1, health: 6 },
        { name: "Community Chest", ability: "gainMana" },
        { name: "Liar's Dice", ability: "rollLuck" }
      ]
    }
  ]
});

if (typeof playerCollection === 'undefined') {
    var playerCollection = JSON.parse(localStorage.getItem('playerCollection')) || [];
}
if (typeof playerDeck === 'undefined') {
    var playerDeck = JSON.parse(localStorage.getItem('playerDeck')) || [];
}
if (typeof completedEvents === 'undefined') {
    var completedEvents = JSON.parse(localStorage.getItem('completedEvents')) || [];
}

function triggerEventByIndex(index) {
  const event = eventChoices[index];
  if (!event) {
    console.error(`Event with index ${index} not found.`);
    return;
  }

  const popup = document.getElementById('eventPopup');
  popup.innerHTML = `
    <h2>${event.title}</h2>
    <p>${event.description}</p>
    <div id="eventOptions"></div>
  `;

  event.options.forEach((option, i) => {
    const btn = document.createElement('button');
    btn.innerText = option.text;
    btn.className = 'home-button';
    btn.style.margin = '10px';
    btn.onclick = () => {
      option.cards.forEach(card => {
        playerCollection.push(card);
        playerDeck.push(card);
      });

      localStorage.setItem('playerCollection', JSON.stringify(playerCollection));
      localStorage.setItem('playerDeck', JSON.stringify(playerDeck));

      completedEvents.push(index);
      localStorage.setItem('completedEvents', JSON.stringify(completedEvents));

      popup.style.display = 'none';

      if (typeof unlockNextLevel === 'function') {
        unlockNextLevel(index);
      } else if (typeof drawMap === 'function') {
        drawMap();
      }

      alert(`✅ You gained cards from: "${option.text}"`);
    };
    popup.appendChild(btn);
  });

  popup.style.display = 'block';
}
