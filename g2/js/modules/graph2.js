import { select } from "d3";
import { innerWidth, innerHeight } from "../utils/dimensions.js";
import { xAxis, yAxis } from "../components/axes.js";

export const drawGraph2 = async (data) => {
  const svg = select("#chart")
    .append("svg")
    .attr("width", innerWidth)
    .attr("height", innerHeight);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // X Axis
  g.append("g").attr("transform", `translate(0, ${innerHeight})`).call(xAxis);

  // Y Axis
  g.append("g").call(yAxis);

  // Data Points
  g.selectAll(".dot")
    .data(data)
    .join("circle")
    .attr("class", "dot")
    .attr("cx", (d) => xScale(d.age))
    .attr("cy", (d) => yScale(d.threeMade))
    .attr("r", 5);
};
