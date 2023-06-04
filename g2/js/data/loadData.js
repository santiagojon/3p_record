import { json } from "d3";

export const loadData = () => {
  return json("../data/playerData.json");
};
