// import { dataset } from "./players.js";
// import dataset from "./players.js";
import { curry, allen, korver, thompson } from "./players.js";

async function draw(datasets) {
  const parseDate = d3.timeParse("%Y-%m-%d");
  const dataWithRunningTotal = [];

  await Promise.all(
    datasets.map(async (dataset) => {
      const data = await dataset.data;
      dataWithRunningTotal.push(
        data.map((d, i) => ({
          ...d,
          playerName: dataset.playerName,
          isActive: dataset.isActive,
          featured: dataset.featured,
          TPM_running_total: d3.sum(data.slice(0, i + 1), (d) => +d.TPM),
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
    .domain(
      d3.extent(
        dataWithRunningTotal.flatMap((data) => data),
        (d) => parseDate(d.Date)
      )
    )
    .range([0, dimensions.ctrWidth]);

  const lineGenerator = d3
    .line()
    .x((d) => xScale(parseDate(d.Date)))
    .y((d) => yScale(d.TPM_running_total));

  // This loop iterates over each dataset in the input array and creates a line and text element for each one
  // It takes an array of datasets as input and uses the index of each dataset to access the corresponding dataWithRunningTotal object
  datasets.forEach((_, datasetIndex) => {
    // Create a line element for the current dataset
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
        d3.select(this).attr("stroke-width", 3);
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
        }
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
      .attr("dy", "-1.5em")
      .attr("text-anchor", "start")
      .text(firstPoint.featured ? firstPoint.playerName : "");
  });

  // Axes
  const yAxis = d3.axisLeft(yScale);
  const xAxis = d3.axisBottom(xScale);

  ctr.append("g").attr("class", "axis").call(yAxis);

  ctr
    .append("g")
    // Draws dashes lines using the make_y_gridlones function
    .attr("class", "grid")
    .call(
      make_y_gridlines(yScale).tickSize(-dimensions.ctrWidth).tickFormat("")
    )
    .selectAll(".tick line")
    .attr("stroke-dasharray", "4,4")
    .attr("stroke-opacity", 0.5)
    .attr("stroke-width", 1);
}

//Consolidate data and call function
const dataset = [curry, allen, korver, thompson];

draw(dataset);

//////////////////////////////////

//Current To Do
// 2. Make on hover black and reveal the player's name if featured was set to false. Do this withouth changing the value of featured.
