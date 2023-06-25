import { drawPlayerLine } from "./drawDataPointLine.js";
import { drawDataPoints, getPlayerColor } from "./drawDataPoints.js";
import { drawPlayerName } from "./drawPlayerName.js";

export const handleMouseOver = (data, ctr, playerName, featured) => {
  // Draw Line
  drawPlayerLine(data, playerName, featured, ctr);

  // Change Color of Data Point
  if (featured === false) {
    ctr
      .selectAll(
        `.dot.${playerName.replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-")}`
      )
      .attr("fill", "grey")
      .attr("opacity", 1)
      .raise();
  }

  // Add Text Box with Player Name
  if (playerName === "Steph Curry")
    drawPlayerName(data, playerName, ctr, featured, "start");
  else drawPlayerName(data, playerName, ctr, featured, "end");
};

export const handleMouseOut = (data, ctr, playerName, featured) => {
  // Remove the line drawn for the player
  if (featured === false) {
    ctr
      .selectAll(
        `.player-line.${playerName
          .replace(/[^a-zA-Z0-9]/g, "-")
          .replace(/-+/g, "-")}`
      )
      .remove();

    // Remove player name
    ctr
      .selectAll(
        `text.${playerName.replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-")}`
      )
      .remove();

    // Change data point color
    ctr
      .selectAll(
        `.dot.${playerName.replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-")}`
      )
      .attr("fill", getPlayerColor(playerName));
  }

  // Makes sure featured player's data points are raised
  ctr
    .selectAll(".dot")
    .filter((d) => d.featured)
    .raise();
};
