import { xScale, yScale } from "./axes.js";
import { handleMouseOver, handleMouseOut } from "./mouseEvents.js";
import { drawPlayerLine } from "./drawDataPointLine.js";

export const drawDataPoints = (
  data,
  playerName,
  ctr,
  featured
  //   drawPlayerLine
) => {
  const getPlayerColor = (playerName) => {
    switch (playerName) {
      case "Steph Curry":
        return "#6e5fd9";
      case "Ray Allen":
        return "gold";
      default:
        return "lightgrey";
    }
  };

  ctr
    .selectAll(".dot")
    .data(data)
    .join("circle")
    .attr("class", "dot")
    .attr("cx", (d) => xScale(d.age))
    .attr("cy", (d) => yScale(d.average))
    .attr("r", 5)
    .attr("fill", getPlayerColor(playerName))
    .on("mouseover", (d, i, nodes) =>
      handleMouseOver(d, i, nodes, data, ctr, playerName, featured)
    )
    .on("mouseout", (d, i, nodes) =>
      handleMouseOut(d, i, nodes, data, ctr, playerName, featured)
    );

  return ctr;
};
