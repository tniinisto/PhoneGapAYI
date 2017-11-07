
var serviceURL = "https://r-youin.com/pgmobile/services/";


function getChart() {

    $.ajax({type: "GET",
    url: serviceURL + 'getChartData.php',
    dataType : 'json',
    data: {'teamid': sessionStorage['teamID'], 'playerid': sessionStorage['playerID']},

        success:function(result){
            //alert("success"); 
             
            // var dataTable = new google.visualization.DataTable();
            // dataTable.addColumn('string', 'Month');
            // dataTable.addColumn('number', 'You');
            // dataTable.addColumn('number', 'Events set');
    
            // //dataTable.addRow(['Elokuu', 1, 1]);
    
            // //var dataArray = $.parseJSON(result);
            // var dataArray = result;
            // //alert(dataArray[0].month);
    
            // for (i = 0; i < dataArray.length; i++) {
    
            //     dataTable.addRow([dataArray[i].month, ((dataArray[i].participated != null) ? Number(dataArray[i].participated) : 0) , ((dataArray[i].games != null) ? Number(dataArray[i].games) : 0)]);
    
            // }
             
             
            // //instantiate our chart object
            // var chart = new google.visualization.ComboChart(document.getElementById('chartContent'));
        
            // //define options for visualization
            // //if (animate == 1) {
            //     var options = {
            //         //width: 300,
            //         height: 450,
            //         //left: 10,
            //         //chartArea:{left:20, top:20,width:"70%",height:"700"},                    
            //         is3D: true,
            //         title: 'Team Events & Your activity',
            //         vAxis: { title: 'Events' },
            //         hAxis: { title: 'Month',
            //                 slantedText: 'true', slantedTextAngle: 75 },
            //         seriesType: 'bars',
            //         series: { 0: { type: 'line'} },
            //         legend: { position: 'top' },
            //         animation: {
            //             duration: 1000,
            //             easing: 'out',
            //             startup: 'true'
            //         },
            //         colors:['blue','orange']
            //     };
             
             
            // //draw our chart
            // chart.draw(dataTable, options);
                 
             //Draw the chart with animation
            //  function drawChart() {
            //      document.getElementById('chartContent').innerHTML = "";
             
            if(result.length > 0)
                setTimeout(function () {
                    drawChart(result);
                }, 200);
            else {
                $("#chartContent").empty();
                $("#chartContent").append( "<h2 style='text-align: center;'>Team has no statistics yet...</h2>" );
            }       
        },

        error: function () {
            //alert("error"); 
        }

    });

}

function drawChart(result) {

    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Month');
    dataTable.addColumn('number', 'You');
    dataTable.addColumn('number', 'Events set');

    //dataTable.addRow(['Elokuu', 1, 1]);

    //var dataArray = $.parseJSON(result);
    var dataArray = result;
    //alert(dataArray[0].month);

    for (i = 0; i < dataArray.length; i++) {

        dataTable.addRow([dataArray[i].month, ((dataArray[i].participated != null) ? Number(dataArray[i].participated) : 0) , ((dataArray[i].games != null) ? Number(dataArray[i].games) : 0)]);

    }
     
     
    //instantiate our chart object
    var chart = new google.visualization.ComboChart(document.getElementById('chartContent'));

    //define options for visualization
    //if (animate == 1) {
        var options = {
            //width: 300,
            height: 450,
            //left: 10,
            //chartArea:{left:20, top:20,width:"70%",height:"700"},                    
            is3D: true,
            title: 'Team Events & Your activity',
            vAxis: { title: 'Events' },
            hAxis: { title: 'Month',
                    slantedText: 'true', slantedTextAngle: 75 },
            seriesType: 'bars',
            series: { 0: { type: 'line'} },
            legend: { position: 'top' },
            animation: {
                duration: 1000,
                easing: 'out',
                startup: 'true'
            },
            colors:['blue','orange']
        };
     
     
    //draw our chart
    chart.draw(dataTable, options);

}