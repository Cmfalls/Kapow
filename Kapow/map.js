if (typeof playerCollection === 'undefined') {
    var playerCollection = JSON.parse(localStorage.getItem('playerCollection')) || [];
}
if (typeof playerDeck === 'undefined') {
    var playerDeck = JSON.parse(localStorage.getItem('playerDeck')) || [];
}
if (typeof completedEvents === 'undefined') {
    var completedEvents = JSON.parse(localStorage.getItem('completedEvents')) || [];
}

const mapNodes = [
  { label: 'Event 1', type: 'event', eventIndex: 0, unlocked: true },
  { label: 'Event 2', type: 'event', eventIndex: 1, unlocked: false },
  { label: 'Event 3', type: 'event', eventIndex: 2, unlocked: false },
  { label: 'Event 4', type: 'event', eventIndex: 3, unlocked: false },
  { label: 'Boss: Connor', type: 'fight', boss: true, unlocked: false }
];

function drawMap() {
  const list = document.getElementById('levelList');
  list.innerHTML = '';

  mapNodes.forEach((node, index) => {
    const btn = document.createElement('button');
    btn.innerText = `${node.label} ${node.unlocked ? '' : '(Locked)'}`;
    btn.disabled = !node.unlocked;
    btn.className = 'home-button';

    if (node.unlocked) {
      btn.onclick = () => {
        if (node.type === 'event') {
          triggerEventByIndex(node.eventIndex, index);
        } else if (node.boss) {
          startConBattle();
        }
      };
    }

    list.appendChild(btn);
  });
}

function unlockNextLevel(index) {
  if (mapNodes[index + 1]) {
    mapNodes[index + 1].unlocked = true;
    drawMap();
  }
}

function startConBattle() {
  showScreen('battleScreen');
}
