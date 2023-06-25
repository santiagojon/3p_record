import {
  width,
  height,
  innerWidth,
  innerHeight,
  paddedWidth,
} from "../utils/dimensions.js";

// Scales
export const xScale = d3.scaleLinear().domain([17, 45]).range([0, innerWidth]);

export const yScale = d3.scaleLinear().domain([0, 6]).range([innerHeight, 0]);

// Axis
export const xAxis = d3
  .axisBottom(xScale)
  .tickValues([20, 25, 30, 35, 40])
  .tickSize(12);

export const yAxis = d3.axisLeft(yScale).ticks(7);

// Labels
export const yAxisLabels = (ctr) => {
  const labels = [0, 1, 2, 3, 4, 5, 6];

  labels.forEach((label) => {
    ctr
      .append("text")
      .attr("class", "y-axis-label")
      .attr("x", 0)
      .attr("y", yScale(label) - 7)
      .text(() => {
        const formattedLabel = label.toLocaleString(); // add commas for values over 1,000
        return label === 6
          ? `${formattedLabel} three-pointers per game`
          : formattedLabel;
      })
      .style("font-size", "14px") // decrease font size
      .style("fill", "#2d2d2d")
      .attr("text-anchor", "start");
  });
};

export const xAxisLabels = (ctr) => {
  // X-Axis style edits
  ctr
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(xAxis)
    .call(
      (g) => g.select(".domain").attr("stroke-width", 2).attr("stroke", "grey")
      // .attr(
      //   "stroke-dasharray",
      //   `0 ${xScale(20)} ${xScale(40) - xScale(20)} ${
      //     innerWidth - xScale(40)
      //   }`
      // )
    )
    .call((g) =>
      g
        .selectAll(".tick line")
        .attr("stroke-width", 2)
        .attr("stroke", "lightgrey")
    );

  // Age Label
  ctr
    .append("text")
    .attr("x", 0)
    .attr("y", innerHeight)
    .attr("dy", "2em")
    .text("Age")
    .attr("font-size", "14px");
};
