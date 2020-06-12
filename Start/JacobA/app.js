filepath = "C:\Users\nitec\Desktop\Data_Science_Bootcamp\Project2_WorldHappiness\Project-2-World-Happiness\Start\Data\2015_happiness.csv";

d3.csv(filepath)
    .row(function(d) { return {key: d.key, value: +d.value}; })
    .get(function(error, rows) { console.log(rows); });
