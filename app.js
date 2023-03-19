import { curry, allen, harden, korver, thompson } from "./players.js";

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
          TPM_running_total: d3.sum(validData.slice(0, i + 1), (d) => +d.TPM),
          initialColor: initialColor,
        }))
      );
    })
  );

  //Dimensions
  const dimensions = {
    width: 1000,
    height: 500,
    margins: 50,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 3; //modified to prevent text cutoff on right side of graph
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 3;

  // Adds dashes lines for each value on the y-axis
  function make_y_gridlines(yScale) {
    return d3
      .axisLeft(yScale)
      .tickValues([500, 1000, 1500, 2000, 2500, 3000, 3500]);
  }

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
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
      new Date(1997, 0, 1), // set your desired start date
      new Date(2023, 0, 1), // set your desired end date
    ])
    .range([0, dimensions.ctrWidth]);

  const lineGenerator = d3
    .line()
    .x((d) => xScale(parseDate(d.Date)))
    .y((d) => yScale(d.TPM_running_total));

  // This loop iterates over each dataset in the input array and creates a line and text element for each one
  // It takes an array of datasets as input and uses the index of each dataset to access the corresponding dataWithRunningTotal object
  datasets.forEach((_, datasetIndex) => {
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
          : "#e4e4e4";
        if (dataWithRunningTotal[datasetIndex][0].featured) {
          const hslColor = d3.hsl(baseColor);
          hslColor.l = Math.max(0, hslColor.l - 0.3); // Darken the color by 30%
          return hslColor;
        }
        return baseColor;
      })
      .attr(
        "stroke-width",
        dataWithRunningTotal[datasetIndex][0].featured ? 2 : 1
      ) // Set stroke width based on featured property's value
      // Adds a mouseover event listener to the line element
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

          endPointCircle = ctr
            .append("circle")
            .attr("cx", xScale(parseDate(lastPoint.Date)))
            .attr("cy", yScale(lastPoint.TPM_running_total))
            .attr("r", 4)
            .attr("fill", "black");
        }

        // Create a tooltip element and set its position and content
        const tooltip = d3
          .select("#chart")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

        tooltip
          .html(
            `<div>Date: ${currentData.Date}</div><div>Three Pointers Made: ${currentData.TPM_running_total}</div>`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`)
          .style("opacity", 1);

        // Highlight the line element on mouseover
        d3.select(this).attr("stroke-width", 2.5);
        d3.select(this).attr("stroke", "black");
      })
      // Add a mousemove event listener to the line element
      .on("mousemove", function (event) {
        // Update the position of the tooltip on mousemove
        d3.select(".tooltip")
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      })
      // Add a mouseleave event listener to the line element
      .on("mouseleave", function (event, d) {
        // Remove the tooltip on mouseleave and unhighlight the line element
        d3.select(".tooltip").remove();
        d3.select(this).attr("stroke-width", 2);

        if (!firstPoint.featured) {
          d3.select(`#player-name-${datasetIndex}`).text("");

          endPointCircle.remove();
        }

        d3.select(this).attr(
          "stroke",
          dataWithRunningTotal[datasetIndex][0].initialColor
        );
      });

    // Create a text element for a player's name to be added the top of the line
    const firstPoint = dataWithRunningTotal[datasetIndex][0];
    const lastPoint =
      dataWithRunningTotal[datasetIndex][
        dataWithRunningTotal[datasetIndex].length - 1
      ];

    ctr
      .append("text")
      // Add an ID to the text element for future reference
      .attr("id", `player-name-${datasetIndex}`)
      // Set the x coordinate to the x position of the last data point in the line
      .attr("x", xScale(parseDate(lastPoint.Date)))
      // Set the y coordinate to the y position of the last data point in the line, with a vertical offset
      .attr("y", yScale(lastPoint.TPM_running_total))
      // Set the location of the player's name in relation to the circle
      .attr("dx", "0.5em")
      .attr("text-anchor", "start")
      .text(firstPoint.featured ? firstPoint.playerName : "");

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

  // Axes
  const yAxis = d3.axisLeft(yScale);
  const xAxis = d3.axisBottom(xScale);

  ctr.append("g").attr("class", "axis").call(yAxis);

  //Adds x-axis and uses transform to make visisble
  ctr
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${dimensions.ctrHeight})`)
    .call(xAxis);

  //Adds horizontal gridlines for y-axis values
  ctr
    .append("g")
    .attr("class", "grid")
    .call(
      make_y_gridlines(yScale).tickSize(-dimensions.ctrWidth).tickFormat("")
    )
    .selectAll(".tick line")
    .attr("stroke-dasharray", "4,4")
    .attr("stroke-opacity", 0.2)
    .attr("stroke-width", 1);
}

//Consolidate data and call function
const dataset = [curry, allen, harden, korver, thompson];

draw(dataset);

//////////////////////////////////

//Current To Do
