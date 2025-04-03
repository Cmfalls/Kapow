// Example: This will later trigger from your map click event when fully hooked up
function startBattleWithConnor() {
    startBattleWithOpponent("Connor");
}

// Optionally, placeholder turn loop function for future development
function startNewTurn() {
    console.log("New turn started — future battle logic goes here.");
}

function resetGame() {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
        localStorage.clear(); // Clears all saved game data
        location.reload(); // Reloads the game to reflect the reset
    }
}

function showScreen(screenId) {
    hideAllScreens();
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.style.display = 'flex';
        if (screenId === 'mapScreen' && typeof drawMap === 'function') {
            drawMap();
        }
    } else {
        console.error(`Screen ${screenId} not found`);
    }
}

function hideAllScreens() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.add('hidden');
        screen.classList.remove('flex');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    showScreen('homeScreen'); // Show the home screen by default
    console.log("✅ Home screen should now be visible");
});
