async function draw(datasets) {
  // Data
  const parseDate = d3.timeParse("%Y-%m-%d");
  const dataWithRunningTotal = [];

  await Promise.all(
    datasets.map(async (dataset) => {
      const data = await dataset;
      dataWithRunningTotal.push(
        data.map((d, i) => ({
          ...d,
          TPM_running_total: d3.sum(data.slice(0, i + 1), (d) =>
            parseFloat(d.TPM)
          ),
        }))
      );
    })
  );

  // Dimensions
  const dimensions = {
    width: 1000,
    height: 500,
    margins: 50,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;

  // Draw Image
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const ctr = svg
    .append("g") // <g>
    .attr(
      "transform",
      `translate(${dimensions.margins}, ${dimensions.margins})`
    );

  // Scales
  const yScale = d3
    .scaleLinear()
    .domain([0, 3500]) //swap with the current record. make dynamic
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

  // Generators
  const lineGenerator = d3
    .line()
    .x((d) => xScale(parseDate(d.Date)))
    .y((d) => yScale(d.TPM_running_total));

  datasets.forEach((dataset, i) => {
    ctr
      .append("path")
      .datum(dataWithRunningTotal[i])
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", `hsl(${(i * 40) % 360}, 50%, 50%)`) // generate a unique color for each line
      .attr("stroke-width", 2)
      .on("mouseover", function (event, d) {
        const xCoord = d3.pointer(event)[0];
        const bisectDate = d3.bisector((d) => parseDate(d.Date)).left;
        const i = bisectDate(dataWithRunningTotal[0], xCoord, 1);
        const d0 = dataWithRunningTotal[0][i - 1];
        const d1 = dataWithRunningTotal[0][i];
        const currentData =
          xCoord - parseDate(d0.Date) > parseDate(d1.Date) - xCoord ? d1 : d0;

        const tooltip = d3
          .select("#chart")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

        tooltip
          .html(
            `<div>Date: ${currentData.Date}</div><div>3PM: ${currentData.TPM_running_total}</div>`
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

        // tooltip
        //   .html(
        //     `<div>Date: ${currentData.Date}</div><div>3PM: ${currentData.TPM_running_total}</div>`
        //   )
        //   .style("left", `${event.pageX + 10}px`)
        //   .style("top", `${event.pageY + 10}px`)
        //   .style("opacity", 1);
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
  });
}

//Players
const curry = d3.csv("data/stephcurry/curry-career.csv");

//Consolidate data and call function
const dataset = [curry];

draw(dataset);
