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
  featured: true,
  mostRecentActiveYear: "2023",
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
export const durant = {
  playerName: "Kevin Durant",
  data: d3.csv("data/kevindurant/durant-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

export const billups = {
  playerName: "Chauncey Billups",
  data: d3.csv("data/chaunceybillups/billups-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2014",
};

export const bryant = {
  playerName: "Kobe Bryant",
  data: d3.csv("data/kobebryant/bryant-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2016",
};

export const matthews = {
  playerName: "Wesley Matthews",
  data: d3.csv("data/wesleymatthews/matthews-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

export const lewis = {
  playerName: "Rashard Lewis",
  data: d3.csv("data/rashardlewis/lewis-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2014",
};

export const stojakovic = {
  playerName: "Peja Stojakovic",
  data: d3.csv("data/pejastojakovic/stojakovic-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2011",
};

export const anthony = {
  playerName: "Carmelo Anthony",
  data: d3.csv("data/carmeloanthony/anthony-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2022",
};

export const ellis = {
  playerName: "Dale Ellis",
  data: d3.csv("data/daleellis/ellis-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2000",
};

export const hield = {
  playerName: "Buddy Hield",
  data: d3.csv("data/buddyhield/hield-career.csv"),
  isActive: true,
  featured: true,
  mostRecentActiveYear: "2023",
};

export const nash = {
  playerName: "Steve Nash",
  data: d3.csv("data/stevenash/nash-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2014",
};

////////// 31-40
export const walker = {
  playerName: "Kemba Walker",
  data: d3.csv("data/kembawalker/walker-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2023",
};

export const paul = {
  playerName: "Chris Paul",
  data: d3.csv("data/chrispaul/paul-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

export const conley = {
  playerName: "Mike Conley",
  data: d3.csv("data/mikeconley/conley-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

export const richardson = {
  playerName: "Jason Richardson",
  data: d3.csv("data/jasonrichardson/richardson-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2015",
};

export const ariza = {
  playerName: "Trevor Ariza",
  data: d3.csv("data/trevorariza/ariza-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2022",
};

export const mikemiller = {
  playerName: "Mike Miller",
  data: d3.csv("data/mikemiller/mikemiller-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2017",
};

export const batum = {
  playerName: "Nicolas Batum",
  data: d3.csv("data/nicolasbatum/batum-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

export const mccollum = {
  playerName: "CJ McCollum",
  data: d3.csv("data/cjmccollum/mccollum-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

export const green = {
  playerName: "Danny Green",
  data: d3.csv("data/dannygreen/green-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

export const love = {
  playerName: "Kevin Love",
  data: d3.csv("data/kevinlove/love-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

////////// 41-50
export const irving = {
  playerName: "Kyrie Irving",
  data: d3.csv("data/kyrieirving/irving-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};

export const rice = {
  playerName: "Glen Rice",
  data: d3.csv("data/glenrice/rice-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2004",
};

export const jones = {
  playerName: "Eddie Jones",
  data: d3.csv("data/eddiejones/jones-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2008",
};

export const hardaway = {
  playerName: "Tim Hardaway",
  data: d3.csv("data/timhardaway/hardaway-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2003",
};

export const vanexel = {
  playerName: "Nick Van Exel",
  data: d3.csv("data/nickvanexel/vanexcel-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2006",
};

export const bibby = {
  playerName: "Mike Bibby",
  data: d3.csv("data/mikebibby/bibby-career.csv"),
  isActive: false,
  featured: false,
  mostRecentActiveYear: "2012",
};

// export const beal = {
//   playerName: "Bradley Beal",
//   data: d3.csv("data//-career.csv"),
//   isActive: true,
//   featured: false,
//   mostRecentActiveYear: "2023",
// };

// export const mills = {
//   playerName: "Patty Mills",
//   data: d3.csv("data//-career.csv"),
//   isActive: true,
//   featured: false,
//   mostRecentActiveYear: "2023",
// };

// export const ginobli = {
//   playerName: "Manu Ginobli",
//   data: d3.csv("data//-career.csv"),
//   isActive: false,
//   featured: false,
//   mostRecentActiveYear: "",
// };

// export const hardawayjr = {
//   playerName: "Tim Hardaway Jr.",
//   data: d3.csv("data//-career.csv"),
//   isActive: true,
//   featured: false,
//   mostRecentActiveYear: "2023",
// };

////////// 50+ (Selected)
export const lavine = {
  playerName: "Zach Lavine",
  // data: d3.csv("data/zachlavine/lavine-career.csv"),
  isActive: true,
  featured: true,
  mostRecentActiveYear: "2023",
};

export const mitchell = {
  playerName: "Donovan Mitchell",
  data: d3.csv("data/donovanmitchell/mitchell-career.csv"),
  isActive: true,
  featured: true,
  mostRecentActiveYear: "2023",
};

export const tatum = {
  playerName: "Jayson Tatum",
  data: d3.csv("data/jaysontatum/tatum-career.csv"),
  isActive: true,
  featured: false,
  mostRecentActiveYear: "2023",
};
