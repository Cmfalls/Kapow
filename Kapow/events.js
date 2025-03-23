let playerCollection = JSON.parse(localStorage.getItem('playerCollection')) || [];
let playerDeck = JSON.parse(localStorage.getItem('playerDeck')) || [];
let completedEvents = JSON.parse(localStorage.getItem('completedEvents')) || [];

function triggerEventByIndex(index) {
  const event = eventChoices[index]; // FIXED: pulling from eventChoices
  if (!event) {
    console.error(`Event with index ${index} not found.`);
    return;
  }

  const popup = document.getElementById('eventPopup');
  popup.innerHTML = `
    <h2>${event.title}</h2>
    <p>${event.description}</p>
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

      // Save updated collections to localStorage
      localStorage.setItem('playerCollection', JSON.stringify(playerCollection));
      localStorage.setItem('playerDeck', JSON.stringify(playerDeck));

      // Mark event as completed and save to localStorage
      completedEvents.push(index);
      localStorage.setItem('completedEvents', JSON.stringify(completedEvents));

      // Close the popup and redraw the map
      popup.style.display = 'none';
      drawMap();
      alert(`✅ You gained cards from: "${option.text}"`);
    };
    popup.appendChild(btn);
  });

  popup.style.display = 'block';
}
