import { loadData } from "./data/loadData.js";
import { drawAllGraphs } from "./drawAllGraphs.js";

// Load and process data
loadData().then((players) => {
  drawAllGraphs(players);
});
