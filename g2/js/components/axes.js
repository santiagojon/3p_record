import { scaleLinear } from "d3";
import { innerWidth, innerHeight } from "../utils/dimensions.js";

// Scales
const xScale = scaleLinear().domain([20, 40]).range([0, innerWidth]);

const yScale = scaleLinear().domain([1, 12]).range([innerHeight, 0]);

// Axis
export const xAxis = d3.axisBottom(xScale).ticks(5);
export const yAxis = d3.axisLeft(yScale);
