import { loadData } from "./data/loadData.js";
import { drawAllGraphs } from "./drawAllGraphs.js";

// Load and process data
loadData().then((players) => {
  // Draw a graph for each player
  // players.forEach((player) =>
  //   drawGraph2(player.data, player.playerName, player.featured)
  // );
  drawAllGraphs(players);
});
