import { xScale, yScale } from "./axes.js";
import { innerWidth, innerHeight } from "../utils/dimensions.js";
import { handleMouseOver, handleMouseOut } from "./mouseEvents.js";

import { Delaunay } from "https://cdn.skypack.dev/d3-delaunay";

export const drawVoronoiDiagram = (data, ctr, playerName, featured) => {
  console.log("V-DATA", data);
  // Generate delaunay object
  const delaunay = Delaunay.from(
    data.map((d) => [xScale(d.age), yScale(d.average)])
  );
  // Create Voronoi diagram from delaunay object
  const voronoi = delaunay.voronoi([0, 0, innerWidth, innerHeight]);

  ctr
    .append("g")
    .selectAll(".cell")
    .data(data)
    .join("path")
    .attr("class", "cell")
    .attr("d", (_, i) => voronoi.renderCell(i))
    .attr("fill", "none")
    // .attr("stroke", "black")
    .attr("pointer-events", "all")
    .on("mouseover", function () {
      let datum = d3.select(this).datum();

      let playerData = data.filter((d) => d.playerName === datum.playerName);
      handleMouseOver(playerData, ctr, datum.playerName, datum.featured);
    })
    .on("mouseout", function () {
      let datum = d3.select(this).datum();
      let playerData = data.filter((d) => d.playerName === datum.playerName);
      handleMouseOut(playerData, ctr, datum.playerName, datum.featured);
    });
};
