//Players
const curryData = d3.csv("data/stephcurry/curry-career.csv");
const allenData = d3.csv("data/rayallen/allen-career.csv");
const korverData = d3.csv("data/kylekorver/korver-career.csv");
const thompsonData = d3.csv("data/klaythompson/thompson-career.csv");

//Top 10
export const curry = {
  playerName: "Steph Curry",
  data: curryData,
  isActive: true,
  featured: true,
};

export const allen = {
  playerName: "Ray Allen",
  data: allenData,
  isActive: false,
  featured: true,
};

export const korver = {
  playerName: "Kyle Korver",
  data: korverData,
  isActive: false,
  featured: false,
};

//Top 20
export const thompson = {
  playerName: "Klay Thompson",
  data: thompsonData,
  isActive: true,
  featured: true,
};
