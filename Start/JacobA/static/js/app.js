var filepath = "2015_happiness.csv";

function makeResponsive() {
  //Ties an svg element to the body
  var svgArea = d3.select("body").select("svg");

  //If svgArea is not empty, empty it
  if (!svgArea.empty()) {
      svgArea.remove();
  }

  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  //Set margin parameters of svg area
  var margin = {
    top: 50,
    bottom: 50,
    right: 50,
    left: 50
  };

  //Set height and width values relative to the page and specified margins
  var height = svgHeight - margin.top - margin.bottom;
  var width = svgHeight - margin.left - margin.right;

  //Append the svg element into the specified place
  var svg = d3
      .select("#scatter")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);

  //Creates a chart to work on
  var chartGroup = svg.append("g")
                      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //Read in the csv file
  d3.csv(filepath).then((happinessData) => {

    //Parse through the data
    happinessData.forEach(function(data) {
      data.country = data.Country;
      data.family = +data.Family;
      data.rank = +data.HappinessRank;
      data.score = +data.Happiness_Score;
      data.freedom = +data.Freedom;
      data.generosity = +data.Generosity;
      data.error = +data.Standard_Error;
      data.economy = +data.Economy;
      data.health = +data.Health;
    });

    console.log(happinessData);
    //console.log(happinessData.HappinessRank);

    //Create x axis scale and size
    var xLinearScale = d3.scaleLinear()
                         .domain([0, d3.max(happinessData, d => d.freedom)])
                         .range([0, width]);

    //Create y axis scale and size
    var yLinearScale = d3.scaleLinear()
                         .domain([0, d3.max(happinessData, d => d.rank)])
                         .range([height, 0]);

    //Determine affixation to bottom and left for axes
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    //Append axes to svg element
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    //Append the value points to the chart
    var circlesGroup = chartGroup.selectAll("circle")
        .data(happinessData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.freedom))
        .attr("cy", d => yLinearScale(d.rank))
        .attr("r", "8")
        .attr("fill", "lightblue")
        .attr("stroke-width", ".5")
        .attr("stroke", "blue");

    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var freedomLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "freedom")
        .text("Freedom Rating");

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .text("Happiness Ranking");

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .html(function(d) {
          return (`${d.country}`);
        });

    circlesGroup.call(toolTip);

    circlesGroup
        .on("mouseover", function(data) {toolTip.show(data);})
        .on("mouseout", function(data, index) {toolTip.hide(data);});

  
  }).catch(function(error) {
  console.log(error);
  });
}

makeResponsive();

d3.select(window).on("resize", makeResponsive);
