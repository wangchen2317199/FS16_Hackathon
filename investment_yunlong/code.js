
function drawCurveTypes() {
  
  
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'X');
        data.addColumn('number', 'saving with desired interest');

  
//$(document).ready(  function() {
                console.log( "Lets calc" );

                // Interest rate calculation for idea
                var idealInterest = [];

                // Percentage rate for what given by customer, inflation, and actual
                var inflation = .04;
                var initialRate = .1;
                var actualRate = initialRate - inflation;

                // Expected saving per year
                var investment = 10000;
                var salary = 50000;
                var expense = salary - investment;
                console.log(expense);
                

                // futureValue starts with what the cutomer currently has in savings
                var totalSavings = 50000;

                // Current age, assume death at 80
                var currentAge = 30;
                var death = 80;
                var retirement = 60;
               console.log(actualRate);

                for ( i = currentAge; i <= retirement; i++ ) {
                    totalSavings = (totalSavings + investment) * (1 + actualRate);
                    totalSavings = Math.round(totalSavings);
                    idealInterest[i] = totalSavings;
                    console.log("year = " + i + " amount = " + totalSavings);
                  
                  data.addRow();
                  data.addRow([i,totalSavings]);
                  
                }

                for ( i = retirement + 1; i <= death; i++ ) {
                    totalSavings = (totalSavings - expense) * (1 + actualRate);
                    totalSavings = Math.round(totalSavings);
                    idealInterest[i] = totalSavings;
                    console.log("second loop year = " + i + " amount = " + totalSavings);
                  
                  data.addRow();
                  data.addRow([i,totalSavings]);
                  
                }
              
//    });
  
  
  
//  
//  data.addRow();  // Add an empty row
//data.addRow(['Hermione', new Date(1999,0,1)]); // Add a row with a string and a date value.
//
//// Add a row with two cells, the second with a formatted value.
//data.addRow(['Hermione', {v: new Date(1999,0,1),
//                          f: 'January First, Nineteen ninety-nine'}
//]);
//
//data.addRow(['Col1Val', null, 'Col3Val']); // Second column is undefined.
//data.addRow(['Col1Val', , 'Col3Val']);     // Same as previous.
//  
  
  
  
  
//      var data = new google.visualization.DataTable();
//      data.addColumn('number', 'X');
//      data.addColumn('number', 'saving with actual interest');
//     // data.addColumn('number', 'saving with desired interest');
//
//      data.addRows([

//        [0, 0, 0],    [1, 10, 5],   [2, 23, 15],  [3, 17, 9],   [4, 18, 10],  [5, 9, 5],
//        [6, 11, 3],   [7, 27, 19],  [8, 33, 25],  [9, 40, 32],  [10, 32, 24], [11, 35, 27],
//        [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
//        [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
//        [24, 60, 52], [25, 50, 42], [26, 552, 44], [27, 51, 43], [28, 49, 41], [29, 53, 45],
//        [30, 55, 47], [31, 60, 52], [32, 61, 53], [33, 59, 51], [34, 62, 54], [35, 65, 57],
//        [36, 62, 54], [37, 58, 50], [38, 55, 47], [39, 61, 53], [40, 64, 56], [41, 65, 57],
//        [42, 63, 55], [43, 66, 58], [44, 67, 59], [45, 69, 61], [46, 69, 61], [47, 70, 62],
//        [48, 72, 64], [49, 68, 60], [50, 66, 58], [51, 65, 57], [52, 67, 59], [53, 70, 62],
//        [54, 71, 63], [55, 72, 64], [56, 73, 65], [57, 75, 67], [58, 70, 62], [59, 68, 60],
//        [60, 64, 56], [61, 60, 52], [62, 65, 57], [63, 67, 59], [64, 68, 60], [65, 69, 61],
//        [66, 70, 62], [67, 72, 64], [68, 75, 67], [69, 80, 72]
//      ]);

  
  
      var options = {
        hAxis: {
          title: 'Age'
        },
        vAxis: {
          title: 'Total Saving'
        },
        series: {
          1: {curveType: 'function'}
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, {width: 500, height: 500});
      chart.draw(data, options);
    }