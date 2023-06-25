import { xScale, yScale } from "./axes.js";
import { width, margin, paddedWidth } from "../utils/dimensions.js";

export const drawGridlines = (ctr, xAxisLength) => {
  ctr
    .append("g")
    .attr("class", "grid")
    .attr("id", "y-axis")
    .attr("transform", `translate(5, 5)`)
    .call(
      d3
        .axisLeft(yScale)
        .tickValues([1, 2, 3, 4, 5, 6])
        .tickSize(-xAxisLength + 20) //Fix this
        .tickFormat("")
    )
    .selectAll(".tick line")
    .attr("stroke-dasharray", "2,4")
    .attr("stroke-opacity", 0.2)
    .attr("stroke-width", 1);
};
