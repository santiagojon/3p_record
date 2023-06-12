import { datasets } from "./players.js";
import { processPlayerData } from "./processData.js";

export const loadData = async () => {
  return await Promise.all(
    datasets.map(async (dataset) => {
      const data = await dataset.data;
      console.log("DATA", data);
      const processedData = processPlayerData(data);
      return {
        ...dataset,
        data: processedData,
        featured: dataset.featured,
        playerName: dataset.playerName,
      };
    })
  );
};
