import { drawPlayerLine } from "./drawDataPointLine.js";
import { drawPlayerName } from "./drawPlayerName.js";

export const handleMouseOver = (data, ctr, playerName, featured) => {
  drawPlayerLine(data, playerName, featured, ctr);
  if (playerName === "Steph Curry")
    drawPlayerName(data, playerName, ctr, "start");
  else drawPlayerName(data, playerName, ctr, "end");
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
    ctr
      .selectAll(
        `text.${playerName.replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-")}`
      )
      .remove();
  }
};
