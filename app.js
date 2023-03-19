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

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const ctr = svg
    .append("g")
    .attr(
      "transform",
      `translate(${dimensions.margins}, ${dimensions.margins})`
    );

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
      .attr("stroke", `hsl(${(datasetIndex * 40) % 360}, 50%, 50%)`)
      .attr("stroke-width", 2)
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

        // Create a tooltip element and set its position and content
        const tooltip = d3
          .select("#chart")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

        tooltip
          .html(
            `<div>Date: ${currentData.Date}</div><div>${currentData.playerName}: ${currentData.TPM_running_total}</div>`
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
      });

    // Create a text element for a player's name to be added the top of the line
    const firstPoint = dataWithRunningTotal[datasetIndex][0];
    const lastPoint =
      dataWithRunningTotal[datasetIndex][
        dataWithRunningTotal[datasetIndex].length - 1
      ];

    ctr
      .append("text")
      // Set the x coordinate to the x position of the last data point in the line
      .attr("x", xScale(parseDate(lastPoint.Date)))
      // Set the y coordinate to the y position of the last data point in the line, with a vertical offset
      .attr("y", yScale(lastPoint.TPM_running_total))
      .attr("dy", "-1.5em")
      .attr("text-anchor", "start")
      .text(firstPoint.playerName);
  });

  // Axes
  const yAxis = d3.axisLeft(yScale);
  const xAxis = d3.axisBottom(xScale);

  ctr.append("g").attr("class", "axis").call(yAxis);

  ctr
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${dimensions.ctrHeight})`)
    .call(xAxis);
}

//Players
const curryData = d3.csv("data/stephcurry/curry-career.csv");
const allenData = d3.csv("data/rayallen/allen-career.csv");

const curry = { playerName: "Steph Curry", data: curryData };
const allen = { playerName: "Ray Allen", data: allenData };

// const curry = d3.csv("data/stephcurry/curry-career.csv");

//Consolidate data and call function
const dataset = [curry, allen];

draw(dataset);

//////////////////////////////////

//Current To Do
// 3. Add 1-2 other players to test
