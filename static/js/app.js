function createChart(year, xaxis, yaxis) {

  //Ties an svg element to the body
  var svgArea = d3.select("body").select("svg");

  //If svgArea is not empty, empty it
  if (!svgArea.empty()) {
      svgArea.remove();
  }

    var svgWidth = 650;
    var svgHeight = 650;
  //var svgWidth = window.innerWidth;
  //var svgHeight = window.innerHeight;

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
      .select("#line")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);

  //Creates a chart to work on
  var chartGroup = svg.append("g")
                      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  var filepath = year + "_happiness.csv";

  //Read in the csv file
  d3.csv(filepath).then((happinessData) => {

    //Parse through the data
    happinessData.forEach(function(data) {
      data.Country = data.Country;
      data.HappinessRank = +data.HappinessRank;
      data.HappinessScore = +data.HappinessScore;
      data.Freedom = +data.Freedom;
      data.Generosity = +data.Generosity;
      data.Economy = +data.Economy;
      data.Health = +data.Health;
      data.Trust = +data.Trust;
    });


    //Create x axis scale and size
    var xLinearScale = d3.scaleLinear()
                         .domain([0, d3.max(happinessData, d => d[xaxis])])
                         .range([0, width]);

    //Create y axis scale and size
    var yLinearScale = d3.scaleLinear()
                         .domain([0, d3.max(happinessData, d => d[yaxis])])
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
        .attr("cx", d => xLinearScale(d[xaxis]))
        .attr("cy", d => yLinearScale(d[yaxis]))
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
        .text(labelMaker(xaxis));

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("value", "HappinessRank")
        .text(labelMaker(yaxis));

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .html(function(d) {
          return (`${d.Country}`);
        });

    circlesGroup.call(toolTip);

    circlesGroup
        .on("mouseover", function(data) {toolTip.show(data);})
        .on("mouseout", function(data, index) {toolTip.hide(data);});

  
  }).catch(function(error) {
  console.log(error);
  });
}

//function createLineChart(){
//START OF LINE CHART

// var svgArea2 = d3.select("body").select("#line")

// if (!svgArea2.empty()) {
//     svgArea2.remove();
// }

// var svg2Width = 800
// var svg2Height = 500

// var lineMargin = {top: 50, right: 50, bottom: 50, left: 50},

// lineWidth = svg2Width - lineMargin.left - lineMargin.right,
// lineHeight = svg2Height - lineMargin.top - lineMargin.bottom;

// // create svg wrapper

// var lineSvg = d3
//     .select("#line")
//     .append("svg")
//         .attr("width", svg2Width)
//         .attr("height", svg2Height);

// var lineGroup = lineSvg.append("g")
//         .attr("transform", `translate(${lineMargin.left}, ${lineMargin.top})`);

// function createLineChart(lineGroup) {
    
//     //IMPORT DATA
//     var lineFilePath = "merged_HappinessScore.csv";
//     d3.csv(lineFilePath).then((LineHappinessData)  => {
        
//         //Parse through the data
//         var countryList = [];
//         var List2015= [];
//         var List2016 = [];
//         var List2017= [];
//         var List2018= [];
//         var List2019 = [];
        
//         LineHappinessData.forEach(function(lineData) {
//             countryList.push(lineData.Country);
//             List2015.push(lineData.HappinessScore2015)
//             List2016.push(lineData.HappinessScore2016)
//             List2017.push(lineData.HappinessScore2017)
//             List2018.push(lineData.HappinessScore2018)
//             List2019.push(lineData.HappinessScore2019)
//         });
        
//         var ScoreList = [List2015, List2016, List2017, List2018, List2019]
//         var CountryScores = []
        
//         console.log(countryList)
//         for (var i = 0;i < countryList.length; i++){
//             if(countryList[i] == "Denmark"){
//                 for (var q = 0; q < ScoreList.length; q++){
//                     CountryScores.push(ScoreList[q][i])
//                 }                
//             }
//         };
//         console.log(CountryScores)
//         var years = [2015, 2016, 2017, 2018, 2019];
        
//         //CREATE RANGE/SCALES
//         var lineX = d3.scaleLinear().domain([years.min, years.max]).range(0, lineWidth);
//         var lineY = d3.scaleLinear().domain([0, 10]).range(lineHeight, 0);

//         //CREATE AXES
//         var lineBottomAxis = d3.axisBottom(lineX);
//         var lineYAxis = d3.axisLeft(lineY);
        
//         lineGroup.append("g")
//             .attr("transform", `translate(0, ${lineHeight})`)
//             .call(lineBottomAxis);

//         lineGroup.append("g")
//             .call(lineYAxis);

//         // var line1 = d3
//         //     .line()
//         //     .x(d => lineX(years))
//         //     .y(d => lineY(CountryScores));

//         // lineGroup.append("path")
//         //     .data([LineHappinessData])
//         //     .attr("d", line1);

//         // lineGroup.append("text")
//         //     .attr("transform", `translate(${lineWidth / 2}, ${lineHeight + lineMargin.top + 50})`)
//         //     .attr("text-anchor", "middle")
//         //     .attr("font-size", "16px")
//         //     .text("Years");
        
//     }).catch(function(error) {
//         console.log(error);
//     });
// }

function labelMaker(axis){ 
    
    switch(axis) {
        case ("HappinessRank"):
            return("Happiness Rank")
            break;
            case ("HappinessScore"):
                return("Happiness Score")
            break;
        case ("Economy"):
            return("Economy (GPD Per Capita)")
            break;
        case ("Generosity"):
            return("Generosity Rating")
            break;
        case ("Health"):
            return("Health (Life Expectancy)")
            break;
        case ("Trust"):
            return("Trust (Perception of Government Corruption)")
            break;
        case ("Freedom"):
            return("Freedom Rating")
            break;
    }

}

function createInfoBlock(){

    var yearMenu = d3.select("#selYear");
    var yearSet = yearMenu.property("value");
    var countryMenu = d3.select("#selCountry");
    var countrySet = countryMenu.property("value");

    var filepath = yearSet + "_happiness.csv";

    d3.csv(filepath).then((happinessData) => {
        var countryList = [];

        happinessData.forEach(function(data) {
            countryList.push(data.Country);
        });

        for (var i = 0;i < countryList.length; i++){
            if(countryList[i] == countrySet){
                d3.select(".country").text("Country: " + happinessData[i].Country);
                d3.select(".rank").text("Happiness Rank: " + happinessData[i].HappinessRank);
                d3.select(".score").text("Score: " + happinessData[i].HappinessScore);
                d3.select(".economy").text("Economy: " + happinessData[i].Economy);
                d3.select(".health").text("Health: " + happinessData[i].Health);
                d3.select(".generosity").text("Generosity: " + happinessData[i].Generosity);
                d3.select(".trust").text("Trust: " + happinessData[i].Trust);
                d3.select(".freedom").text("Freedom: " + happinessData[i].Freedom);
                break;
            }
            else{
                d3.select(".country").text("That country has no data for this year. Try selecting another country!");
                d3.select(".rank").text("");
                d3.select(".score").text("");
                d3.select(".economy").text("");
                d3.select(".health").text("");
                d3.select(".generosity").text("");
                d3.select(".trust").text("");
                d3.select(".freedom").text("");
            }
        }

    }).catch(function(error) {
        console.log(error);
    });
}

function init() {

    var years = ["2015", "2016", "2017", "2018", "2019"]
    var axes = ["HappinessRank", "HappinessScore", "Economy", "Generosity", "Trust", "Health", "Freedom"]

    var yearMenu = d3.select("#selYear");
    var xMenu = d3.select("#selX");
    var yMenu = d3.select("#selY");
    var countryMenu = d3.select("#selCountry");
    
    yearMenu.selectAll("option")
                 .data(years.reverse())
                 .enter().append("option")
                 .attr("value", ((d) => {d}))
                 .text(function(d){return d});

    xMenu.selectAll("option")
                 .data(axes)
                 .enter().append("option")
                 .attr("value", ((d) => {d}))
                 .text(function(d){return d});
    
    yMenu.selectAll("option")
                 .data(axes.reverse())
                 .enter().append("option")
                 .attr("value", ((d) => {d}))
                 .text(function(d){return d});
    
    var yearSet = yearMenu.property("value");
    var filepath = "merged_HappinessScore.csv";

    d3.csv(filepath).then((happinessData) => {
        //Parse through the data
        var countryList = [];

        happinessData.forEach(function(data) {
            countryList.push(data.Country);
        });

        console.log(countryList);

        countryMenu.selectAll("option")
            .data(countryList)
            .enter().append("option")
            .attr("value", ((d) => {d}))
            .text(function(d){return d});
        console.log(countryMenu.property("value"));


        
        console.log(countryMenu.property("value"));
        var xSet = xMenu.property("value");
        var ySet = yMenu.property("value");
        var countrySet = countryMenu.property("value");
        console.log(countrySet);

        createChart(yearSet, xSet, ySet);
        createInfoBlock();
        //createLineChart(yearSet, xSet, ySet);

    }).catch(function(error) {
        console.log(error);
    });
}

function optionChanged(){
    var yearMenu = d3.select("#selYear");
    var yearSet = yearMenu.property("value");

    var xMenu = d3.select("#selX");
    var xSet = xMenu.property("value");

    var yMenu = d3.select("#selY");
    var ySet = yMenu.property("value");

    createChart(yearSet, xSet, ySet);
    createInfoBlock();
}

function countryChanged(){
    //Line Chart Change will go here
    createInfoBlock();
}

init();
//d3.select(window).on("resize", optionChanged());
