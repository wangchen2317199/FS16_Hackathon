$(document).ready(
    function() {
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
                    console.log(desired_interest);

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
                  

           // GOOGLE CHART
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
               
                   var totalSavings = 0;
                   var inflation = .04;
                   var death = 80;
                   var expense = income - savings;
                  
                   var actualRate =(desired_interest/ 100.0)  - inflation ;  
                  
                  
                    var agearray = [];
                  for (i = currentAge; i <= 80; i++ ){
                    
                    agearray.push(i);
                    
                  }
                  
                  
                   var idealinterest = [];
                   for ( i = currentAge; i <= retire_age; i++ ) {
                    totalSavings = (totalSavings + savings) * (1 + actualRate);
                    totalSavings = Math.round(totalSavings);
            
                 //   console.log("year = " + i + " amount = " + totalSavings);
                    console.log(savings);
                     
                      idealinterest.push(totalSavings);
            
                }

                for ( i = retire_age + 1; i <= death; i++ ) {
                    totalSavings = (totalSavings - expense) * (1 + actualRate);
                    totalSavings = Math.round(totalSavings);
                //  idealInterest[i] = totalSavings;
                  //  console.log("second loop year = " + i + " amount = " + totalSavings);
            
                  idealinterest.push(totalSavings);
                }
                   console.log(idealinterest);
                 console.log(agearray);
                  
                  
           Highcharts.chart('container', {
             chart: {
      backgroundColor: null,
      style: {
         fontFamily: 'Signika, serif'
      }
   },
        title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
          title: {
                text: 'Age'
            },
            categories: agearray
//          ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
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
          plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'saving with idealinterest',
            data: idealinterest},
           {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }
        ]
    });       
                  
                  
                  
                  
//--------------------------------------------------------------------------------------------------------------------
                     },
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










