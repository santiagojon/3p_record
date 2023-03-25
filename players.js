//Players
const curryData = d3.csv("data/stephcurry/curry-career.csv");
const allenData = d3.csv("data/rayallen/allen-career.csv");
const hardenData = d3.csv("data/jamesharden/harden-career.csv");
const korverData = d3.csv("data/kylekorver/korver-career.csv");
const thompsonData = d3.csv("data/klaythompson/thompson-career.csv");

//1-10
export const curry = {
  playerName: "Steph Curry",
  data: curryData,
  isActive: true,
  featured: true,
  mostRecentActiveYear: "2023",
};

export const allen = {
  playerName: "Ray Allen",
  data: allenData,
  isActive: false,
  featured: true,
  mostRecentActiveYear: "2014",
};

export const harden = {
  playerName: "James Harden",
  data: hardenData,
  isActive: true,
  featured: true,
  mostRecentActiveYear: "2023",
};

export const miller = {
  playerName: "Reggie Miller",
  data: d3.csv("data/reggiemiller/miller-career.csv"),
  isActive: false,
  featured: true,
  mostRecentActiveYear: "2005",
};

export const korver = {
  playerName: "Kyle Korver",
  data: korverData,
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2020",
};

export const lillard = {};

export const carter = {
  playerName: "Vince Carter",
  data: d3.csv("data/vincecarter/carter-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2020",
};

export const terry = {};

export const james = {};

export const crawford = {};

//11-20
export const thompson = {
  playerName: "Klay Thompson",
  data: thompsonData,
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

export const nash = {
  playerName: "Steve Nash",
  data: d3.csv("data/stevenash/nash-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2014",
};

//21-30
export const hield = {
  playerName: "Buddy Hield",
  data: d3.csv("data/buddyhield/hield-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

//31-40

//41-50
