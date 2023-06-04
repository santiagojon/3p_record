import { loadData } from "./data/loadData.js";
import { drawGraph2 } from "./modules/graph2.js";

// Load and process data
loadData().then((data) => {
  // Draw the graph
  drawGraph2(data);
});
