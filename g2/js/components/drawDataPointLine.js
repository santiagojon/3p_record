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
        return "#1b1c1c";
    }
  };

  console.log("Line Generator Data", playerName, data);
  //Should be an array of objects, each with two properties, age and average

  // Draw the line for each player
  ctr
    .append("path")
    .datum(data)
    .attr(
      "class",
      `player-line ${playerName
        .replace(/[^a-zA-Z0-9]/g, "-")
        .replace(/-+/g, "-")}`
    )
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", playerLineColor(playerName))
    .attr("stroke-width", 1.5);
};
