const games = require('../../games.json');

const mockAPIUrl = "https://67fbef671f8b41c81685508e.mockapi.io/games";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const uploadGames = async () => {
  for (const game of games) {
    try {
      await fetch(mockAPIUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(game),
      });
      await delay(100); // Espera 100ms entre peticiones para evitar límites
      console.log(`Added: ${game.title}`);
    } catch (error) {
      console.error(`Error adding ${game.title}:`, error.message);
    }
  }
};

uploadGames();