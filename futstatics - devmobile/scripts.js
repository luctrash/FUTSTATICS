document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("index.html")) {
    loadPlayers();
    loadGames();
  }
});

function savePlayersToStorage() {
  localStorage.setItem("players", JSON.stringify(players));
}

function loadPlayersFromStorage() {
  const storedPlayers = localStorage.getItem("players");
  return storedPlayers ? JSON.parse(storedPlayers) : [];
}

function saveGamesToStorage() {
  localStorage.setItem("games", JSON.stringify(games));
}

function loadGamesFromStorage() {
  const storedGames = localStorage.getItem("games");
  return storedGames ? JSON.parse(storedGames) : [];
}

const players = loadPlayersFromStorage();
const games = loadGamesFromStorage();

const playerForm = document.getElementById("add-player-form");
if (playerForm) {
  playerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const playerName = document.getElementById("player-name").value;
    const playerPosition = document.getElementById("player-position").value;
    const playerTeam = document.getElementById("player-team").value;

    players.push({
      name: playerName,
      position: playerPosition,
      team: playerTeam,
    });

    savePlayersToStorage();
    alert("Jogador adicionado com sucesso!");
    playerForm.reset();
  });
}

const gameForm = document.getElementById("add-game-form");
if (gameForm) {
  gameForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const gameName = document.getElementById("game-name").value;
    const gameDate = document.getElementById("game-date").value;
    const gameTime = document.getElementById("game-time").value;

    games.push({
      name: gameName,
      date: gameDate,
      time: gameTime,
    });

    saveGamesToStorage();
    alert("Jogo adicionado com sucesso!");
    gameForm.reset();
  });
}

function loadPlayers() {
  const playerList = document.getElementById("player-list");
  if (playerList) {
    playerList.innerHTML = "";
    players.forEach((player, index) => {
      const li = document.createElement("li");
      li.textContent = `${player.name} - ${player.position} - ${player.team}`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remover";
      removeButton.addEventListener("click", () => removePlayer(index));

      li.appendChild(removeButton);
      playerList.appendChild(li);
    });
  }
}

function loadGames() {
  const gameList = document.getElementById("game-list");
  if (gameList) {
    gameList.innerHTML = "";
    games.forEach((game, index) => {
      const li = document.createElement("li");
      li.textContent = `${game.name} - ${game.date} - ${game.time}`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remover";
      removeButton.addEventListener("click", () => removeGame(index));

      li.appendChild(removeButton);
      gameList.appendChild(li);
    });
  }
}

function removePlayer(index) {
  players.splice(index, 1);
  savePlayersToStorage();
  loadPlayers();
}

function removeGame(index) {
  games.splice(index, 1);
  saveGamesToStorage();
  loadGames();
}
