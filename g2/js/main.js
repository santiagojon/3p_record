import { loadData } from "./data/loadData.js";
import { drawGraph2 } from "./modules/graph2.js";

// Load and process data
loadData().then((players) => {
  // Draw a graph for each player
  players.forEach((player) =>
    drawGraph2(player.data, player.playerName, player.featured)
  );
});
