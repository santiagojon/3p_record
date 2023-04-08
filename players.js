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
  featured: false,
  mostRecentActiveYear: "2023",
};

export const miller = {
  playerName: "Reggie Miller",
  data: d3.csv("data/reggiemiller/miller-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2005",
};

export const korver = {
  playerName: "Kyle Korver",
  data: korverData,
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2020",
};

export const lillard = {
  playerName: "Damian Lillard",
  data: d3.csv("data/damianlillard/lillard-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

export const carter = {
  playerName: "Vince Carter",
  data: d3.csv("data/vincecarter/carter-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2020",
};

export const terry = {
  playerName: "Jason Terry",
  data: d3.csv("data/jasonterry/terry-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2018",
};

export const james = {
  playerName: "Lebron James",
  data: d3.csv("data/lebronjames/james-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

export const crawford = {
  playerName: "Jamal Crawford",
  data: d3.csv("data/jamalcrawford/crawford-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2020",
};

////////// 11-20
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

export const pierce = {
  playerName: "Paul Pierce",
  data: d3.csv("data/paulpierce/pierce-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2017",
};

export const lowry = {
  playerName: "Kyle Lowry",
  data: d3.csv("data/kylelowry/lowry-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

export const george = {
  playerName: "Paul George",
  data: d3.csv("data/paulgeorge/george-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

export const kidd = {
  playerName: "Jason Kidd",
  data: d3.csv("data/jasonkidd/kidd-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2013",
};

export const nowitzki = {
  playerName: "Dirk Nowitzski",
  data: d3.csv("data/dirknowitzski/nowitzski-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2019",
};

export const johnson = {
  playerName: "Joe Johnson",
  data: d3.csv("data/joejohnson/johnson-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2022",
};

export const redick = {
  playerName: "J.J. Redick",
  data: d3.csv("data/jjredick/redick-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2021",
};

export const smith = {
  playerName: "J.R. Smith",
  data: d3.csv("data/jrsmith/smith-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2020",
};

export const gordon = {
  playerName: "Eric Gordon",
  data: d3.csv("data/ericgordon/gordon-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

////////// 21-30
export const hield = {
  playerName: "Buddy Hield",
  data: d3.csv("data/buddyhield/hield-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

////////// 31-40

////////// 41-50

//50+
export const tatum = {
  playerName: "Jason Tatum",
  data: d3.csv("data/jasontatum/tatum-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};
