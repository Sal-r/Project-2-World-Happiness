var filepath = "2015_happiness.csv";

function makeResponsive() {

  var svgArea = d3.select("body").select("svg");

    
  if (!svgArea.empty()) {
      svgArea.remove();
  }

  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;
  
  var margin = {
    top: 50,
    bottom: 50,
    right: 50,
    left: 50
  };
  
  var height = svgHeight - margin.top - margin.bottom;
  var width = svgHeight - margin.left - margin.right;

  var svg = d3
      .select("#scatter")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);

  var chartGroup = svg.append("g")
                      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  d3.csv(filepath).then((happinessData) => {

    happinessData.forEach(function(data) {
      data.country = +data.Country;
      data.family = +data.Family;
      data.rank = +data.HappinessRank;
      data.score = +data.Happiness_Score;
      data.anything = +data.Freedom;
      data.generosity = +data.Generosity;
      data.error = +data.Standard_Error;
      data.economy = +data.Economy;
      data.health = +data.Health;
    });

    console.log(happinessData);
    //console.log(happinessData.HappinessRank);

    var xLinearScale = d3.scaleLinear()
                         .domain([(d3.min(happinessData, d => d.anything)), d3.max(happinessData, d => d.anything)])
                         .range([0, width]);

    var yLinearScale = d3.scaleLinear()
                         .domain([(d3.min(happinessData, d => d.generosity)), d3.max(happinessData, d => d.generosity)])
                         .range([height, 0]);

    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(happinessData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.anything))
        .attr("cy", d => yLinearScale(d.generosity))
        .attr("r", "8")
        .attr("fill", "lightblue")
        .attr("stroke-width", ".5")
        .attr("stroke", "blue");
  
  }).catch(function(error) {
  console.log(error);
  });
}

makeResponsive();

d3.select(window).on("resize", makeResponsive);
