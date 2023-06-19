import { drawDataPoints } from "../components/drawDataPoints.js";
import { drawPlayerLine } from "../components/drawDataPointLine.js";
import { drawPlayerName } from "../components/drawPlayerName.js";

export const drawGraph2 = (data, playerName, featured, ctr) => {
  console.log("Graph2Draw|Data", data);
  console.log("Graph2Draw|Name", playerName);
  console.log("Graph2Draw|Featured");
  console.log("Graph2Draw|ctr", ctr);

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
