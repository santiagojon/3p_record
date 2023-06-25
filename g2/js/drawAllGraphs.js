import {
  innerWidth,
  innerHeight,
  margin,
  paddedWidth,
} from "./utils/dimensions.js";

import { xAxis, yAxis, yAxisLabels, xAxisLabels } from "./components/axes.js";

import { drawGraph2 } from "./modules/graph2.js";
import { drawGridlines } from "./components/gridlines.js";
import { drawVoronoiDiagram } from "./components/voronoi.js";

const graphSvg = d3
  .select("#chart")
  .append("svg")
  .attr("width", innerWidth + margin.left + margin.right)
  .attr("height", innerHeight + margin.top + margin.bottom);

export const drawAllGraphs = (players) => {
  const ctr = graphSvg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Custom Y Axis + Label
  yAxisLabels(ctr);

  // Custom X Axis + Label
  xAxisLabels(ctr);
  const xAxisLength = ctr.select(".domain").node().getTotalLength();

  // Gridlines along Y Axis
  drawGridlines(ctr, xAxisLength);

  // Sort player data for dot stacking purposes
  players.sort((a, b) => {
    if (a.playerName === "Steph Curry" || a.playerName === "Ray Allen")
      return 1;
    if (b.playerName === "Steph Curry" || b.playerName === "Ray Allen")
      return -1;
    return 0;
  });

  // Draw graphs for each player and collect all data
  let allData = [];
  players.forEach((player) => {
    allData = allData.concat(player.data);
    drawGraph2(player.data, player.playerName, player.featured, ctr);
  });

  // Draw Voronoi Diagram for all players
  drawVoronoiDiagram(allData, ctr);
};
