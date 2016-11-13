var redOrGreen = function(s) {
    if (s >= 0) {
        return 'green';
    }
    else {
        return 'red';
    }
}

$(document).ready(
    function() {
        sessionStorage.setItem('interest', '');
        var email = localStorage.getItem('current_email');
        $.ajax(
            {
                url: "https://api.mlab.com/api/1/databases/pm/collections/ip_users/" + email + "?apiKey=mwDHQOuAdZdk7Jj6kN7LUtt77QBcqfUC",
                method: 'GET',
                success: function(result) {
                    var name = result['name'];
                    var DOB = result['DOB'];
                    var income = result['income'];
                    var savings = result['savings'];
                    var retire_age = result['retire_age'];
                    var desired_interest = result['desired_interest'];
                    var investments= result['investments'];
                    var oldsum=0;
                    var newsum=0;
                  
                    // Caculate the old sum of the user.
                    var investmentsBySymbol = [];
                    var symbols = '';
                    investments.forEach(
                        function(object) {
                            symbols += ',' + object.symbol;
                            oldsum += parseInt(object.shares) * parseFloat(object.price.replace('$',''));
                            var noDuplicate = true;
                            for (var k = 0; k < investmentsBySymbol.length; k++) {
                                if (investmentsBySymbol[k].symbol === object.symbol) {
                                    investmentsBySymbol[k].totalPrice += parseFloat(object.price) * parseInt(object.shares);
                                    noDuplicate = false;
                                }
                            }
                            if (noDuplicate) {
                                investmentsBySymbol.push(
                                    {
                                        symbol: object.symbol,
                                        totalPrice: parseFloat(object.price.replace('$','')) * parseInt(object.shares),
                                        shares: object.shares,
                                        currentValuePerShare: ''
                                    }
                                );
                            }
                        }
                    );
                    symbols = symbols.substr(1);
                    // Caculate the new sum of the user.
                    $.ajax(
                        {
                            url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22' +
                            symbols + 
                            '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=',
                            method: 'GET',
                            success: function(result) {
                                var quotes = result.query.results.quote;
                                quotes.forEach(
                                    function(object) {
                                        var currentStock = object.symbol.toUpperCase();
                                        var currentShares = 0;
                                        investments.forEach(
                                            function(object) {
                                                currentShares += parseInt(object.shares);
                                            }
                                        );
                                        newsum += parseFloat(object.LastTradePriceOnly) * currentShares;

                                        investmentsBySymbol.forEach(
                                            function(obj) {
                                                if (obj.symbol === object.symbol.toUpperCase()) {
                                                    obj.currentValuePerShare = object.LastTradePriceOnly;
                                                }
                                            }
                                        );
                                    }
                                );
                                investmentsBySymbol.forEach(
                                    function(obj2) {
                                        var currentValue = parseFloat(obj2.currentValuePerShare) * parseInt(obj2.shares);
                                        var dollarProfit = currentValue - parseFloat(obj2.totalPrice);
                                        var percentProfit = dollarProfit / parseFloat(obj2.totalPrice);
                                        var valueAfterFiveYears = currentValue * Math.pow(1 + percentProfit, 5);
                                        $('#s_details').append(
                                            '<div class = \'row\'>' +
                                            '<div class = \'col-sm-2\' align = \'center\'>' + obj2.symbol + '</div>' +
                                            '<div class = \'col-sm-2\' align = \'center\'>$' + obj2.totalPrice + '</div>' +
                                            '<div class = \'col-sm-2\' align = \'center\' style = \'color: black;\'>$' + currentValue + '</div>' +
                                            '<div class = \'col-sm-2\' align = \'center\' style = \'color: ' + redOrGreen(dollarProfit) + ';\'>$' + dollarProfit.toFixed(2) + '</div>' +
                                            '<div class = \'col-sm-2\' align = \'center\' style = \'color: ' + redOrGreen(dollarProfit) + ';\'><strong>' + (percentProfit * 100).toFixed(2) + '%</strong></div>' +
                                            '<div class = \'col-sm-2\' align = \'center\' style = \'color: blue;\'><strong>$' + valueAfterFiveYears.toFixed(2) + '</strong></div>' +
                                            '</div>'
                                        );
                                    }
                                );
    //                            investments.forEach(
    //                              function(object) {
    //                                  
    //                                  
    //                                  $('#s_details').append(
    //                                      '<div class = \'row\' id = \'' + object.symbol + '\'>' +
    //                                      '<div class = \'col-sm-2\'>' + object.symbol + '</div>' +
    //                                      '<div class = \'col-sm-2\'>' + object.symbol + '</div>' +
    //                                      '<div class = \'col-sm-2\' style = \'color: red;\'>' + object.price + '</div>' +
    //                                      '<div class = \'col-sm-2\'>' + object.shares + '</div>' +
    //                                      '</div>'
    //                                  );
    //                                  quotes.forEach(
    //                                      function(obj2) {
    //                                          if(obj2.symbol.toUpperCase() === object.symbol) {
    //                                              $('#' + obj2.symbol.toUpperCase()).append(
    //                                                  '<div class = \'col-sm-3\' style = \'color:red;\'><strong>' +
    //                                                  '$' + obj2.LastTradePriceOnly +
    //                                                  '</strong></div>'
    //                                              );
    //                                          }
    //                                      }
    //                                  );
    //                              }
    //                          );

    //caculate the actual interest
                                var interest = (newsum - oldsum) / oldsum;
                                sessionStorage.setItem('interest', interest);
                            }
                        }
                    );
                    $('#welcome').replaceWith('<div id = \'welcome\' class = \'row\' style = \'padding-bottom: 1em;\'>Welcome ' + name + '!</div>');
                    $('#tableCellDOB').replaceWith('<div class = \'col-sm-6\' id = \'tableCellDOB\'>' + DOB + '</div>');
                    $('#tableCellIncome').replaceWith('<div class = \'col-sm-6\' id = \'tableCellIncome\'>$' + income + '</div>');
                    $('#tableCellIncome').css('color', 'red');
                    $('#savingsCell').replaceWith('<div class = \'col-sm-6\' id = \'savingsCell\'>$' + savings + '</div>');
                    $('#savingsCell').css('color', 'red');
                    $('#retireAgeCell').replaceWith('<div class = \'col-sm-6\' id = \'retireAgeCell\'>' + retire_age + '</div>');
                    $('#retireAgeCell').css('color', 'red');
                    $('#rateCell').replaceWith('<div class = \'col-sm-6\' id = \'rateCell\'>' + desired_interest + '%</div>');
                    $('#rateCell').css('color', 'red');
                  
                  
                  
                  
                   // Show suggested funds in regards to the risk tolerance (desired_interest rate)
                    if(desired_interest > 14)
                    {
                        $('#suggested_stocks').replaceWith('<div class = \'col-md-12\' id = \'suggested_stocks\'>' + 
                        '<a href="https://www.thriventfunds.com/mutual-funds/asset-allocation/aggressive-allocation-fund/class-s.html">Aggressive Allocation(TAAAX)</a>' + '<br>'
                        + '<a href=https://www.thriventfunds.com/mutual-funds/income-plus/growth-and-income-plus-fund/class-s.html">Thrivent Growth and Income Plus Fund(TEIIX)</a>' + '<br><br><br><br>'

                         + '</div>');
                        $('#suggested_stocks').css('color', 'red');
                         $('#suggested_class').replaceWith('Aggressive');
                        $('#suggested_class').css('color', 'red');
                       
                    }

                    else if( 5 < desired_interest && desired_interest <= 14)
                    {
                         $('#suggested_stocks').replaceWith('<div class = \'col-md-12\' id = \'suggested_stocks\'>' + 
                            '<a href="https://www.thriventfunds.com/mutual-funds/income-plus/balanced-income-plus-fund/class-s.html">Balanced Income Plus(AABFX)</a>' + '<br>'
                         + '<a href="https://www.thriventfunds.com/mutual-funds/asset-allocation/moderate-allocation-fund/class-s.html">Thrivent Moderate Allocation Fund(TMAIX)</a>' + '<br><br><br><br>'

                         + '</div>');
                        $('#suggested_stocks').css('color', 'red');
                         $('#suggested_stocks').css('color', 'red');
                          $('#suggested_class').replaceWith('<div class = \'col-md-12\' id = \'suggested_class\'>' + 'Medium Risk' +  
                             '</div>');
                        $('#suggested_class').css('color', 'chocolate');
                    }

                    else
                    {
                         
                         $('#suggested_stocks').replaceWith('<div class = \'col-md-12\' id = \'suggested_stocks\'>' + 
                           '<a href="https://www.thriventfunds.com/mutual-funds/fixed-income/government-bond-fund/class-s.html">Government Bond(TBFAX)</a>' + '<br>'
                        + '<a href="https://www.thriventfunds.com/mutual-funds/fixed-income/limited-maturity-bond-fund/class-s.html">Thrivent Limited Maturity Bond Fund</a>' + '<br><br><br><br>'
                         + '</div>');
                        $('#suggested_stocks').css('color', 'red');
                        $('#suggested_stocks').css('color', 'red');
                          $('#suggested_class').replaceWith('<div class = \'col-md-12\' id = \'suggested_class\'>' + 'Low Risk' +  
                             '</div>');
                        $('#suggested_class').css('color', 'blue');
                       
                    }
                  
                   //if success show the graph
                  
                   //      GOOGLE CHART
//--------------------------------------------------------------------------------------------------------------------
                    
//                  var data = new google.visualization.DataTable();
//                    data.addColumn('number', 'X');
//                    data.addColumn('number', 'saving with desired interest');
//
//                  
//                 var d = new Date() ;
//                  var d  = Date.parse(d);
//                var D = Date.parse(DOB);
//                  var age = d - D;
//                  var minutes = 1000 * 60;
//                  var hours = minutes * 60;
//                  var days = hours * 24;
//                  var years = days * 365;
//
//                  var currentAge = Math.round(age / years);
//                  
//                      
//               //  var idealInterest = [];
//                   var income = parseFloat(income);
//                   var savings = parseFloat(savings);
//                   var retire_age = parseFloat(retire_age);
//                   var desired_interest = parseFloat(desired_interest);
//               
//                   var totalSavings = 0;
//                   var inflation = .04;
//                   var death = 80;
//                   var expense = income - savings;
//                  
//                var actualRate =(desired_interest/ 100.0)  - inflation ;
//  
//                  
//                  for ( i = currentAge; i <= retire_age; i++ ) {
//                    totalSavings = (totalSavings + savings) * (1 + actualRate);
//                    totalSavings = Math.round(totalSavings);
//                 //   idealInterest[i] = totalSavings;
//                    console.log("year = " + i + " amount = " + totalSavings);
//                  console.log(savings);
//                 // data.addRow();
//                 // data.addRow([i,totalSavings]);
//                  
//                }
//
//                for ( i = retire_age + 1; i <= death; i++ ) {
//                    totalSavings = (totalSavings - expense) * (1 + actualRate);
//                    totalSavings = Math.round(totalSavings);
//                //  idealInterest[i] = totalSavings;
//                    console.log("second loop year = " + i + " amount = " + totalSavings);
//                  
//                 // data.addRow();
//                 // data.addRow([i,totalSavings]);
//                  
//                }
//              
//
//  
//
//      var options = {
//        hAxis: {
//          title: 'Age'
//        },
//        vAxis: {
//          title: 'Total Saving'
//        },
//        series: {
//          1: {curveType: 'function'}
//        },
//        
//        backgroundColor :{
//        fill:'transparent'
//        
//      }
//      };
//
//      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
//      chart.draw(data, {width: 500, height: 500});
//      chart.draw(data, options);
//                  
              
//--------------------------------------------------------------------------------------------------------------------

//         high chart         
//--------------------------------------------------------------------------------------------------------------------

                  
                  
                  
               
                  var d = new Date() ;
                  var d  = Date.parse(d);
                  var D = Date.parse(DOB);
                  var age = d - D;
                  var minutes = 1000 * 60;
                  var hours = minutes * 60;
                  var days = hours * 24;
                  var years = days * 365;

                  var currentAge = Math.round(age / years);
                  
                   
                   var income = parseFloat(income);
                   var savings = parseFloat(savings);
                   var retire_age = parseFloat(retire_age);
                   var desired_interest = parseFloat(desired_interest);
               
                   var totalSavings = 0;   //with idealinterest
                   var realSaving = 0;      //with realinterest
                   var inflation = .04;
                   var death = 80;
                   var expense = income - savings;
                  
                   var actualRate =(desired_interest/ 100.0)  - inflation ;  
                   var realinterest=   sessionStorage.getItem('interest');
                  
                   var agearray = [];
                   for (i = currentAge; i <= 80; i++ ){
                    
                    agearray.push(i);
                    
                  }
                  
//---------------------------idealinterest--------------------------------------------
                    var idealinterest = [];
                    for ( i = currentAge; i <= retire_age; i++ ) {
                    totalSavings = (totalSavings + savings) * (1 + actualRate);
                    totalSavings = Math.round(totalSavings);
                    
                    console.log("year = " + i + " amount = " + totalSavings);
                    console.log(savings);
                     
                    idealinterest.push(totalSavings);
            
                }

                for ( i = retire_age + 1; i <= death; i++ ) {
                    totalSavings = (totalSavings - expense) * (1 + actualRate);
                    totalSavings = Math.round(totalSavings);
                //  idealInterest[i] = totalSavings;
                    console.log("second loop year = " + i + " amount = " + totalSavings);
            
                  idealinterest.push(totalSavings);
                }
                   console.log(idealinterest);
                 console.log(agearray);
                  
//---------------------------actualinterest--------------------------------------------     
                  var  actualinterest = [];
                  
                  for ( i = currentAge; i <= retire_age; i++ ) {
                    realSaving = (realSaving + savings) * (1 + realinterest);//with actualinterest
                    realSaving = Math.round(realSaving);
            
                    console.log("1.real year = " + i + " amount = " + realSaving);
                  //  console.log(savings);
                     
                      actualinterest.push(realSaving);
            
                }

                for ( i = retire_age + 1; i <= death; i++ ) {
                    realSaving = (realSaving - expense) * (1 + realinterest);//with actualinterest
                    realSaving = Math.round(realSaving);
                //  idealInterest[i] = totalSavings;
                    console.log("2.real year = " + i + " amount = " + realSaving);
            
                  actualinterest.push(realSaving);
                }
                  
                  
                  
//---------loadchart---------     
           Highcharts.chart('container', {
             chart: {
      backgroundColor: null,
      style: {
         fontFamily: 'Signika, serif'
      }
   },
        title: {
            text: 'Total saving Chart',
            x: -20 //center
        },    
        xAxis: {
          title: {
                text: 'Age'
            },
            categories: agearray },
        yAxis: {
            title: {
                text: 'Total Saving'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
//          plotOptions: {
//            line: {
//                dataLabels: {
//                    enabled: true
//                },
//                enableMouseTracking: false
//            }
//        },
        tooltip: {
            valuePrefix: '$'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'saving with idealinterest',
            data: idealinterest
        }
//                 ,{
//                type: 'flags',
//                data: [{
//                    x: currentAge,
//                    title: 'Current Year',
//                    text: 'Shape: "circlepin"'
//                }]
//        }
                 ,
                 
                 
                 
                 
                 
           {
            name: 'saving with actualinterest',
            data: actualinterest
           }
                 
//                 ,{
//                type: 'flags',
//                data: [{
//                    x: currentAge,
//                    title: 'Current Year',
//                    text: 'Shape: "circlepin"'
//                }
                    ]
                   
            }
         
                  
                  
                  
           );
//--------------------------------------------------------------------------------------------------------------------
                     },//end of success
                error: function(error) {
                    alert('Error!  Cannot get information!');
                    localStorage.setItem('logged_in', false);
                    window.location.href = '../../index.html';
                }
            }
        );
    }
  
 
  );

$(
    function() {
        $('#log_out').click(
            function() {
                localStorage.setItem('logged_in', false);
                localStorage.setItem('current_email', null);
                window.location.href = '../../index.html';
            }
        );
    }
);










