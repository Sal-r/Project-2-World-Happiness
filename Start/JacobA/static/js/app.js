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
    
    var rank = "Happiness Rank";

    happinessData.forEach(function(data) {
      data.country = +data.Country;
      data.rank = +data.rank;
      data.freedom = +data.Freedom;
    });


    var xLinearScale = d3.scaleLinear()
                         .domain([(d3.min(happinessData, d => d.freedom)), d3.max(happinessData, d => d.freedom)])
                         .range([0, width]);

    var yLinearScale = d3.scaleLinear()
                         .domain([(d3.min(happinessData, d => d.rank)), d3.max(happinessData, d => d.rank)])
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
        .attr("cx", d => xLinearScale(d.freedom))
        .attr("cy", d => yLinearScale(d.rank))
        .attr("r", "8")
        .attr("fill", "lightblue")
        .attr("stroke-width", ".5")
        .attr("stroke", "blue");
  
  }).catch(function(error) {
  console.log(error);
  });
}

makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
