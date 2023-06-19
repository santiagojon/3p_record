// import { xScale, yScale } from "./axes.js";

// import {
//   width,
//   height,
//   margin,
//   innerWidth,
//   innerHeight,
//   paddedWidth,
// } from "../utils/dimensions.js";

// //Custom y-axis labels
// function make_y_gridlines(yScale) {
//   return (
//     d3
//       .axisLeft(yScale)
//       .tickValues([1, 2, 3, 4, 5, 6])
//       .tickSize(-dimensions.ctrWidth)
//       // .tickFormat("")
//       .tickFormat((d) => "")
//     //.tickSizeOuter(0)
//   );
// }

// export const drawGridlines = (ctr) => {
//   ctr
//     .append("g")
//     .attr("class", "grid")
//     .attr("id", "y-axis")
//     .attr("transform", `translate(0, 0)`)
//     .call(
//       make_y_gridlines(yScale)
//         .tickSize(-(paddedWidth - margin * 3)) // Makes tick line stop to match the x-axis width
//         .tickFormat("")
//         .tickSizeOuter(0)
//     )
//     .selectAll(".tick line")
//     .attr("stroke-dasharray", "2,4")
//     .attr("stroke-opacity", 0.2)
//     .attr("stroke-width", 1);
// };
