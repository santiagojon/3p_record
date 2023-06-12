import { drawPlayerLine } from "./drawDataPointLine.js";
import { drawPlayerName } from "./drawPlayerName.js";

export const handleMouseOver = (
  d,
  i,
  nodes,
  data,
  ctr,
  playerName,
  featured
) => {
  drawPlayerLine(data, playerName, featured, ctr);
  drawPlayerName(data, playerName, ctr);
};

export const handleMouseOut = (
  d,
  i,
  nodes,
  data,
  ctr,
  playerName,
  featured
) => {
  if (featured === false) {
    ctr.selectAll("path").remove();
    ctr.selectAll("text").remove();
  }
};
