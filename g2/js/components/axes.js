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
export const xAxis = d3.axisBottom(xScale).ticks(5);
export const yAxis = d3.axisLeft(yScale).ticks(7);
