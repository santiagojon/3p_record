import { xScale, yScale } from "./axes.js";

export const drawPlayerName = (data, playerName, ctr, position = "end") => {
  let playerDataPoint;

  // Check if the label should be at the start or the end
  if (position === "start") {
    playerDataPoint = data[0]; // First data point
  } else {
    // Default is 'end'
    playerDataPoint = data[data.length - 1]; // Last data point
  }

  const playerNameColor = (playerName) => {
    switch (playerName) {
      case "Steph Curry":
        return "#6e5fd9";
      case "Ray Allen":
        return "gold";
      default:
        return "rgb(140, 140, 140)";
    }
  };

  // Append the label
  ctr
    .append("text")
    .attr(
      "class",
      `${playerName.replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-")}`
    )
    .attr("x", xScale(playerDataPoint.age))
    .attr("y", yScale(playerDataPoint.average) + 20)
    .text(playerName)
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
    .attr("fill", playerNameColor(playerName))
    .attr("z-index", "100")
    .attr("text-anchor", "middle");
};
