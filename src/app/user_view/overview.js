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
                  
                   //if success show the graph
                  
                  
                 
//var uri = "http://finance.google.com/finance/info?client=ig&q=NSE:TAAAX";
//
// $.ajax(
//            {
//                url : uri,
//                method: 'GET',
//                success: function(result) {
//                
//                var str = result ;
//                var res = str.substring(4,res.length - 1);
//
//                console.log(res);
//
//                },
//                error: function(error) {
//                    alert('Error!  Cannot get information!');
//                   // localStorage.setItem('logged_in', false);
//                  //  window.location.href = '../../index.html';
//                }
//
//}
//);

           
//--------------------------------------------------------------------------------------------------------------------
                    
                  var data = new google.visualization.DataTable();
                    data.addColumn('number', 'X');
                    data.addColumn('number', 'saving with desired interest');

                  
                 var d = new Date() ;
                  var d  = Date.parse(d);
                var D = Date.parse(DOB);
                  var age = d - D;
                  var minutes = 1000 * 60;
                  var hours = minutes * 60;
                  var days = hours * 24;
                  var years = days * 365;

                  var currentAge = Math.round(age / years);
                  
                      
               //  var idealInterest = [];
                   var income = parseFloat(income);
                   var savings = parseFloat(savings);
                   var retire_age = parseFloat(retire_age);
                   var desired_interest = parseFloat(desired_interest);
               //    var currentAge = parseFloat('30');
                   var totalSavings = 0;
                   var inflation = .04;
                   var death = 80;
                   var expense = income - savings;
                  
                var actualRate =(desired_interest/ 100.0)  - inflation ;
  
                  
                  for ( i = currentAge; i <= retire_age; i++ ) {
                    totalSavings = (totalSavings + savings) * (1 + actualRate);
                    totalSavings = Math.round(totalSavings);
                 //   idealInterest[i] = totalSavings;
                    console.log("year = " + i + " amount = " + totalSavings);
                  console.log(savings);
                 // data.addRow();
                  data.addRow([i,totalSavings]);
                  
                }

                for ( i = retire_age + 1; i <= death; i++ ) {
                    totalSavings = (totalSavings - expense) * (1 + actualRate);
                    totalSavings = Math.round(totalSavings);
                //    idealInterest[i] = totalSavings;
                    console.log("second loop year = " + i + " amount = " + totalSavings);
                  
                 // data.addRow();
                  data.addRow([i,totalSavings]);
                  
                }
              

  

      var options = {
        hAxis: {
          title: 'Age'
        },
        vAxis: {
          title: 'Total Saving'
        },
        series: {
          1: {curveType: 'function'}
        },
        
        backgroundColor :{
        fill:'transparent'
        
      }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, {width: 500, height: 500});
      chart.draw(data, options);
                  
                  
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










