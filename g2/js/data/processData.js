export function processPlayerData(playerData, playerName, featured) {
  // Create an empty object to accumulate data
  const accumulator = {};
  let totalCareerThrees = 0;
  console.log("PROCESSDATA", playerData);

  playerData.forEach((game) => {
    // Ensure the game's 'age' and 'TPM' are numbers
    const ageStr = game.Age;
    const ageComponents = game.Age.split("-");
    const age = +ageComponents[0];

    const threesMade = +game["TPM"];

    if (isNaN(threesMade)) {
      return; // Skip this game if the threesMade could not be determined
    }

    // If this age is not yet in the accumulator, add it
    if (!accumulator[age]) {
      accumulator[age] = { total: 0, gamesPlayed: 0 };
    }

    // Add this game's data to the accumulator
    accumulator[age].total += threesMade;
    accumulator[age].gamesPlayed++;
    totalCareerThrees += +game["TPM"];
  });

  // Convert the accumulator into an array of averages
  const averages = Object.keys(accumulator).map((age) => {
    const { total, gamesPlayed } = accumulator[age];
    return {
      age: +age,
      average: total / gamesPlayed,
      playerName: playerName,
      featured: featured,
    };
  });

  return averages;
}
