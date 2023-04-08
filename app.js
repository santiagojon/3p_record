import {
  curry,
  allen,
  harden,
  miller,
  korver,
  lillard,
  carter,
  terry,
  james,
  crawford,
  //
  thompson,
  pierce,
  lowry,
  george,
  kidd,
  nowitzki,
  johnson,
  redick,
  smith,
  gordon,
  //
  nash,
  hield,
  tatum,
} from "./players.js";

async function draw(datasets) {
  const parseDate = d3.timeParse("%Y-%m-%d");
  const dataWithRunningTotal = [];

  await Promise.all(
    datasets.map(async (dataset) => {
      const data = await dataset.data;
      const baseColor = dataset.isActive ? "#6e5fd9" : "#e4e4e4";
      const initialColor = dataset.featured
        ? d3.hsl(baseColor).darker(0.3)
        : baseColor;

      const validData = data.filter((d) => d.Date && !isNaN(+d.TPM)); // Filter out invalid data points

      dataWithRunningTotal.push(
        validData.map((d, i) => ({
          ...d,
          playerName: dataset.playerName,
          isActive: dataset.isActive,
          featured: dataset.featured,
          mostRecentActiveYear: dataset.mostRecentActiveYear,
          TPM_running_total: d3.sum(validData.slice(0, i + 1), (d) => +d.TPM),
          initialColor: initialColor,
        }))
      );
    })
  );

  //Dimensions
  const dimensions = {
    width: 1000,
    height: 700,
    margins: 50,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 3; //modified to prevent text cutoff on right side of graph
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 4;

  // Adds dashes lines for each value on the y-axis
  function make_y_gridlines(yScale) {
    return d3
      .axisLeft(yScale)
      .tickValues([500, 1000, 1500, 2000, 2500, 3000, 3500])
      .tickSize(-dimensions.ctrWidth)
      .tickFormat("")
      .tickSizeOuter(0);
  }

  const paddingPercentage = 0.1;
  const paddedWidth = dimensions.width * (1 + paddingPercentage);

  const svg = d3
    .select("#chart")
    .append("svg")
    // .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
    // .attr("width", "100%")
    // .attr("height", "100%");
    .attr("width", paddedWidth) // Set the SVG width to the new paddedWidth
    .attr("height", dimensions.height);

  // Create your graph's container
  const ctr = svg
    .append("g")
    .attr(
      "transform",
      `translate(${dimensions.margins}, ${dimensions.margins})`
    );

  // Scales
  const yScale = d3
    .scaleLinear()
    .domain([0, 3500])
    .range([dimensions.ctrHeight, 0])
    .nice();

  const xScale = d3
    .scaleTime()
    .domain([
      new Date(1987, 9, 11), // set your desired start date
      new Date(2023, 0, 5), // set your desired end date
    ])
    .range([0, paddedWidth - dimensions.margins * 3]);

  // Creates clip path to be added to lines in loop
  // const clipPathId = "clip-path";
  // svg
  //   .append("clipPath")
  //   .attr("id", clipPathId)
  //   .append("rect")
  //   .attr("x", 0)
  //   .attr("y", 0)
  //   .attr("width", dimensions.ctrWidth)
  //   .attr("height", dimensions.ctrHeight);

  //Creates player lines
  const lineGenerator = d3
    .line()
    .x((d) => xScale(parseDate(d.Date)))
    .y((d) => yScale(d.TPM_running_total));

  /////////////////////////////////////////Loop/////////////////////////////////////////
  // This loop iterates over each dataset in the input array and creates a line and text element for each one
  // It takes an array of datasets as input and uses the index of each dataset to access the corresponding dataWithRunningTotal object
  datasets.forEach((_, datasetIndex) => {
    //Finds location of endPoint circle for the current record holder - Steph Curry
    // This will be used later when drawing to create a horizontal line
    const stephCurryData = dataWithRunningTotal.find(
      (data) => data[0].playerName === "Steph Curry"
    );
    const lastStephCurryPoint = stephCurryData[stephCurryData.length - 1];

    // Create a line element for the current dataset
    let endPointCircle = null; // the circle at the end of each line

    ctr
      .append("path")
      .datum(dataWithRunningTotal[datasetIndex])
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", () => {
        // Set stroke width based on isActive and featured properties' values
        const baseColor = dataWithRunningTotal[datasetIndex][0].isActive
          ? "#6e5fd9"
          : "#cdcdcd";

        let lineColor = baseColor;
        if (dataset.isActive && !dataset.featured) {
          lineColor = d3.color(baseColor).copy({ opacity: 0.1 }).toString();
        } else if (dataset.featured) {
          lineColor = d3.hsl(baseColor).darker(0.3);
        }

        const initialColor = dataset.featured ? lineColor : baseColor;

        if (dataWithRunningTotal[datasetIndex][0].featured) {
          const hslColor = d3.hsl(baseColor);
          hslColor.l = Math.max(0, hslColor.l - 0.3); // Darken the color by 30%
          return hslColor;
        }
        return baseColor;
      })
      .attr(
        "stroke-width",
        dataWithRunningTotal[datasetIndex][0].featured ? 2 : 0.5
      ) // Set stroke width based on featured property's value
      //.attr("clip-path", `url(#${clipPathId})`) // Apply the clipping area

      /////////////////////////////////////////Mouse Events/////////////////////////////////////////

      /////////////////////////////////////////Mouse Over
      .on("mouseover", function (event, d) {
        // Get the x coordinate of the mouse cursor
        const xCoord = xScale.invert(d3.pointer(event)[0]);
        // Use bisectDate to find the index of the closest data point to the mouse cursor
        const bisectDate = d3.bisector((d) => parseDate(d.Date)).left;
        const i = bisectDate(
          dataWithRunningTotal[datasetIndex],
          xCoord,
          1,
          dataWithRunningTotal[datasetIndex].length - 1
        );
        // Get the data points before and after the closest data point
        const d0 = dataWithRunningTotal[datasetIndex][i - 1];
        const d1 = dataWithRunningTotal[datasetIndex][i];
        // Determine which data point is closer to the mouse cursor
        const currentData =
          xCoord - parseDate(d0.Date) > parseDate(d1.Date) - xCoord ? d1 : d0;

        // Update the player's name text element if featured is set to false
        if (!firstPoint.featured) {
          d3.select(`#player-name-${datasetIndex}`).text(
            `${currentData.playerName}`
          );

          // d3,
          //   select(".totalAccumulationText").text(
          //     `${lastPoint.TPM_running_total} (${lastPoint.mostRecentActiveYear})`
          //   );

          endPointCircle = ctr
            .append("circle")
            .attr("cx", xScale(parseDate(lastPoint.Date)))
            .attr("cy", yScale(lastPoint.TPM_running_total))
            .attr("r", 4)
            .attr("fill", "black");
        }

        // Show tspan on hover

        // Create a tooltip element and set its position and content
        const tooltip = d3
          .select("#chart")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

        tooltip
          .html(
            `<div>Date: ${currentData.Date}</div><div>Total 3-Pointers Made: ${currentData.TPM_running_total}</div>`
            // Add more? Instead of a quick blurb, add more info? (TPA, %, Opponent)?
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`)
          .style("opacity", 1);

        // Highlight the line element on mouseover
        d3.select(this).attr("stroke-width", 2);
        d3.select(this).attr("stroke", "black");
      })
      /////////////////////////////////////////Mouse Move
      .on("mousemove", function (event) {
        // Update the position of the tooltip on mousemove
        d3.select(".tooltip")
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      })
      /////////////////////////////////////////Mouse Leave
      .on("mouseleave", function (event, d) {
        // Remove the tooltip on mouseleave and unhighlight the line element
        d3.select(".tooltip").remove();

        const originalStrokeWidth = dataWithRunningTotal[datasetIndex][0]
          .featured
          ? 2
          : 0.5;
        d3.select(this).attr("stroke-width", originalStrokeWidth);

        if (!firstPoint.featured) {
          d3.select(`#player-name-${datasetIndex}`).text("");

          endPointCircle.remove();
        }

        d3.select(this).attr(
          "stroke",
          dataWithRunningTotal[datasetIndex][0].initialColor
        );
      });
    /////////////////////////////////////////Mouse Events - End/////////////////////////////////////////

    /////////////////////////////////////////Draw/////////////////////////////////////////

    // Add a clip path to the text element to prevent it from overlapping with the lines
    // const defs = svg.append("defs");
    // const clipPath = defs.append("clipPath").attr("id", "text-clip-path");
    // clipPath
    //   .append("rect")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("width", dimensions.ctrWidth + 10)
    //   .attr("height", dimensions.ctrHeight);

    // Draw a text element for a player's name to be added the top of the line
    const firstPoint = dataWithRunningTotal[datasetIndex][0];
    const lastPoint =
      dataWithRunningTotal[datasetIndex][
        dataWithRunningTotal[datasetIndex].length - 1
      ];

    // Apply the clip path to the parent <g> element
    const playerNameText = ctr
      // .append("g")
      // .attr("clip-path", "url(#text-clip-path)")
      // .attr("id", `player-name-${datasetIndex}`)
      // .attr(
      //   "transform",
      //   `translate(${xScale(parseDate(lastPoint.Date))}, ${yScale(
      //     lastPoint.TPM_running_total
      //   )})`
      // )

      .append("text")
      .attr("clip-path", "url(#text-clip-path)")
      .attr("id", `player-name-${datasetIndex}`)
      .attr("x", xScale(parseDate(lastPoint.Date)))
      .attr("y", yScale(lastPoint.TPM_running_total))
      .attr("dx", "0.5em")
      .attr("text-anchor", "start")
      .attr("z-index", 2)
      .text(firstPoint.featured ? firstPoint.playerName : "")
      .style("font-weight", (d) => {
        if (
          firstPoint.playerName === "Steph Curry" ||
          firstPoint.playerName === "Ray Allen"
        ) {
          return "bold";
        }
      })
      .style("stroke-width", "2px") // set the stroke width to 2 pixels
      .style("fill", "black") // set the text color to black
      .append("tspan")
      .attr("x", xScale(parseDate(lastPoint.Date)))
      .attr("dx", "0.5em")
      .attr("dy", "1.2em")
      .text(
        `${lastPoint.TPM_running_total} (${lastPoint.mostRecentActiveYear})`
      )
      .attr("class", "light")
      .attr("class", "accumulatedTotalText")
      .style("stroke-width", "2px") // set the stroke width to 2 pixels
      .style("fill", "black") // set the text color to black

      .append("rect")
      // .attr("x", -padding / 2)
      .attr("y", -10)
      // .attr("width", rectWidth)
      .attr("height", 30)
      .attr("fill", "#f7f7f7")
      .attr("rx", 5)
      .attr("ry", 5)
      // .attr("x", padding / 2)
      .attr("y", 0)
      .attr("text-anchor", "start")
      .style("fill", "white");

    // Draw a horizontal line for the current record holder - Steph Curry
    if (firstPoint.playerName === "Steph Curry") {
      // Get the y coordinate of the circle end point for Steph Curry
      const yPos = yScale(lastStephCurryPoint.TPM_running_total);
      ctr
        .append("line")
        .attr("x1", xScale(xScale.domain()[0]))
        .attr("y1", yPos)
        .attr("x2", xScale(xScale.domain()[1]))
        .attr("y2", yPos)
        .attr("stroke", "black")
        .attr("stroke-dasharray", "8")
        .attr("stroke-opacity", 0.5)
        .attr("stroke-width", 2);
    }

    // Add this new block to create a circle element for the bullet point
    if (firstPoint.featured) {
      ctr
        .append("circle")
        .attr("cx", xScale(parseDate(lastPoint.Date)))
        .attr("cy", yScale(lastPoint.TPM_running_total))
        .attr("r", 4)
        .attr("fill", firstPoint.initialColor);
    }
  });

  // Draw a vertical line for the year when 3 pointers overtook midrange shots
  ctr
    .append("line")
    .attr("x1", xScale(new Date(2015, 0, 1)))
    .attr("y1", 0)
    .attr("x2", xScale(new Date(2015, 0, 1)))
    .attr("y2", dimensions.ctrHeight)
    .attr("stroke", "black")
    .attr("stroke-dasharray", "4,4")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1);

  // Axes - Setup
  const yAxis = d3
    .axisLeft(yScale)
    .tickSizeOuter(0)
    .tickSizeInner(-dimensions.ctrWidth)
    .tickPadding(15)
    .tickValues([500, 1000, 1500, 2000, 2500, 3000, 3500]);

  const xAxis = d3.axisBottom(xScale);

  // Draws the y-axis and uses transform to make visisble
  ctr
    .append("g")
    .attr("class", "axis y-axis")
    .attr("id", "y-axis")
    .call(yAxis)
    .selectAll(".tick line")
    .attr("stroke-dasharray", "4,4")
    .attr("stroke-opacity", 0.2)
    .attr("stroke-width", 0)
    .attr("transform", `translate(${dimensions.ctrWidth}, 0)`);

  // Draws the x-axis and uses transform to make visisble
  ctr
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${dimensions.ctrHeight})`)
    .call(xAxis);

  // Draws the horizontal gridlines for y-axis values
  ctr
    .append("g")
    .attr("class", "grid")
    .attr("id", "y-axis")
    .attr("transform", `translate(0, 0)`)
    .call(
      make_y_gridlines(yScale)
        .tickSize(-(paddedWidth - dimensions.margins * 3)) // Makes tick line stop to match the x-axis width
        .tickFormat("")
        .tickSizeOuter(0)
    )
    .selectAll(".tick line")
    .attr("stroke-dasharray", "2,4")
    .attr("stroke-opacity", 0.2)
    .attr("stroke-width", 1);
}

//Consolidate data and call function
const dataset = [
  curry,
  allen,
  harden,
  miller,
  korver,
  lillard,
  carter,
  terry,
  james,
  crawford,
  //
  thompson,
  pierce,
  lowry,
  george,
  kidd,
  nowitzki,
  johnson,
  redick,
  smith,
  gordon,
  //
  nash,
  hield,
  tatum,
];

draw(dataset);

//////////////////////////////////

// Where I left off.

// I thought it might make sense to have all tspan text that goes under player names automatically visible.
// But create a conditinal somewhere that sayings if the player index or name isn't (0,1 or just by names), set it to hidden
// The onhover toggles that CSS

// Once that's done go back to setting up a clip path
// Place the text in there with a background and all that
// Make sure everything is visible
// Refactor conditional and onhover to target the clip path instead of just the text

////////////

//Current To Do
// 1. Change tooltip to display total number and year retired. Add better styling
// 4. Add 10+ other players
// 5. Add conditional for showing only Curry's current total

//Final
//- Top 50 players on list
//- Select younger players who are known for being making a lot of threes since the "three point era" began
//- A way to filter out the colors of other featured players and just leaving the younger players
// This brings up other stats??? To paint a picture of how much more they're making and when they may overtake Steph's record
//Research reddit boards/elsewhere to see if this conversation has already been had before. Who are those players?
//Projected 5 year growth for all current active players based on their average since the 3 point era

// Create a color of slider that changes the date range on the x-axis
