$document.ready(function() {
    $.ajax({
        type: "GET",
        url: "../Data/2015_happiness",
        dataType: "text",
        success: function(data) {processData(data);}

    });
};

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headlines = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
            }
            lines.push(tarr);
        }
    }
    // alert(lines);
}
