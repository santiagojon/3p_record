async function draw() {
  // Data
  const dataset = await d3.csv("data/stephcurry/curry-2009.csv");

  const parseDate = d3.timeParse("%Y-%m-%d");
  //returns a function that can parse a string
  //it'll return a date object based on this string
  const xAccessor = (d) => parseDate(d.Date);
  const yAccessor = (d) => parseInt(d.TPM);

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
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.ctrHeight, 0])
    .nice();

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data), xAccessor)
    .range([0, dimensions.ctrWidth]);

  // Generators
  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)));

  ctr
    .append("path")
    .datum(dataset)
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "#30475e")
    .attr("stroke-width", 2);
}

draw();
