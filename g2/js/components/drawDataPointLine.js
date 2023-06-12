import { xScale, yScale } from "./axes.js";

// Line Generator
export const drawPlayerLine = (data, playerName, featured, ctr) => {
  const lineGenerator = d3
    .line()
    .x((d) => xScale(d.age))
    .y((d) => yScale(d.average));

  const playerLineColor = (playerName) => {
    switch (playerName) {
      case "Steph Curry":
        return "#6e5fd9";
      case "Ray Allen":
        return "gold";
      default:
        return "lightgrey";
    }
  };

  // Draw the line for each player
  ctr
    .append("path")
    .datum(data) // assuming each player's games are stored here
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", playerLineColor(playerName)) // use the function here
    .attr("stroke-width", 1.5);
};
