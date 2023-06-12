import {
  innerWidth,
  innerHeight,
  margin,
  paddedWidth,
} from "../utils/dimensions.js";

import { xAxis, yAxis, xScale, yScale } from "../components/axes.js";

import { drawCustomYAxis } from "../components/customAxisLabels.js";
import { drawDataPoints } from "../components/drawDataPoints.js";
import { drawPlayerLine } from "../components/drawDataPointLine.js";
import { drawPlayerName } from "../components/drawPlayerName.js";

const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", innerWidth + margin.left + margin.right)
  .attr("height", innerHeight + margin.top + margin.bottom);

export const drawGraph2 = (data, playerName, featured) => {
  const ctr = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // X Axis
  ctr.append("g").attr("transform", `translate(0, ${innerHeight})`).call(xAxis);

  // Y Axis
  ctr.append("g").call(yAxis);
  // drawCustomYAxis(data, yScale, ctr);

  // Draw Data Points
  drawDataPoints(data, playerName, ctr, featured);

  // Draw the line for featured players by default
  if (featured) drawPlayerLine(data, playerName, featured, ctr);

  // Draw the text box for the player's name
  if (featured && playerName != "Steph Curry")
    drawPlayerName(data, playerName, ctr, "end"); // Change 'end' to 'start' for the special player
  if (playerName === "Steph Curry")
    drawPlayerName(data, playerName, ctr, "start");
};
