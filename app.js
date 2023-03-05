async function draw(data) {
  // Data
  const dataset = await data;

  const parseDate = d3.timeParse("%Y-%m-%d");

  const xAccessor = (d) => parseDate(d.Date);
  const yAccessor = (d) => parseInt(d.TPM);

  const dataWithRunningTotal = dataset.map((d, i) => ({
    ...d,
    TPM_running_total: d3.sum(dataset.slice(0, i + 1), yAccessor),
  }));

  // Dimensions
  let dimensions = {
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
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.ctrWidth]);

  // Generators
  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(d.TPM_running_total));

  ctr
    .append("path")
    .datum(dataWithRunningTotal)
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "#30475e")
    .attr("stroke-width", 2);

  // Axis
  const yAxis = d3.axisLeft(yScale); //will draw a vertical axis with the tickers to the left

  ctr.append("g").call(yAxis);

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"));

  ctr
    .append("g")
    .style("transform", `translateY(${dimensions.ctrHeight}px)`)
    .call(xAxis);
}

const curry = d3.csv("data/stephcurry/curry-career.csv");

draw(curry);
