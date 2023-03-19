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

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;

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

  datasets.forEach((_, datasetIndex) => {
    ctr
      .append("path")
      .datum(dataWithRunningTotal[datasetIndex])
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", `hsl(${(datasetIndex * 40) % 360}, 50%, 50%)`)
      .attr("stroke-width", 2)
      .on("mouseover", function (event, d) {
        const xCoord = xScale.invert(d3.pointer(event)[0]);
        const bisectDate = d3.bisector((d) => parseDate(d.Date)).left;
        const i = bisectDate(
          dataWithRunningTotal[datasetIndex],
          xCoord,
          1,
          dataWithRunningTotal[datasetIndex].length - 1
        );
        const d0 = dataWithRunningTotal[datasetIndex][i - 1];
        const d1 = dataWithRunningTotal[datasetIndex][i];
        const currentData =
          xCoord - parseDate(d0.Date) > parseDate(d1.Date) - xCoord ? d1 : d0;

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

        d3.select(this).attr("stroke-width", 4);
      })
      .on("mousemove", function (event) {
        d3.select(".tooltip")
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      })
      .on("mouseleave", function (event, d) {
        d3.select(".tooltip").remove();
        d3.select(this).attr("stroke-width", 2);
      });

    // Add player's name at the top of the line
    const firstPoint = dataWithRunningTotal[datasetIndex][0];
    const lastPoint =
      dataWithRunningTotal[datasetIndex][
        dataWithRunningTotal[datasetIndex].length - 1
      ];

    ctr
      .append("text")
      .attr("x", xScale(parseDate(lastPoint.Date)))
      .attr("y", yScale(lastPoint.TPM_running_total))
      .attr("dy", "-0.5em")
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
