import { xScale, yScale } from "./axes.js";
import { handleMouseOver, handleMouseOut } from "./mouseEvents.js";
import { drawPlayerLine } from "./drawDataPointLine.js";

export const getPlayerColor = (playerName) => {
  switch (playerName) {
    case "Steph Curry":
      return "#6e5fd9";
    case "Ray Allen":
      return "gold";
    default:
      return "lightgrey";
  }
};

export const drawDataPoints = (data, playerName, ctr, featured) => {
  console.log("drawDataPoints|Data", data);
  console.log("drawDataPoints|Name", playerName);
  console.log("drawDataPoints|Featured");
  console.log("drawDataPoints|ctr", ctr);

  const playerClass = playerName.replace(/ /g, "-");

  const dots = ctr
    .selectAll(`.dot.${playerClass}`)
    .data(data)
    .join("circle")
    .attr("class", `dot ${playerClass}`)
    .attr("cx", (d) => xScale(d.age))
    .attr("cy", (d) => yScale(d.average))
    .attr("r", 5)
    .attr("fill", getPlayerColor(playerName))
    .attr("opacity", 0.5);

  if (featured) {
    dots.attr("opacity", 1);
    dots.raise();
  }

  return ctr;
};
