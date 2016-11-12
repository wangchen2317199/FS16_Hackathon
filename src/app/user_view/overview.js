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

// Function to calculate the compount interest effect on investments over time, input is a interest rate, retirement age, current age, total Savings, expense amount, and salary amount
$(document).ready(  function() {
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
                
                // Compound interest project to retirement
                for ( i = currentAge; i <= retirement; i++ ) {
                    totalSavings = (totalSavings + investment) * (1 + actualRate);
                    totalSavings = Math.round(totalSavings);
                    idealInterest[i] = totalSavings;
                    console.log("year = " + i + " amount = " + totalSavings);
                }
                
                // Compound interest project from retirement to death
                for ( i = retirement + 1; i <= death; i++ ) {
                    totalSavings = (totalSavings - expense) * (1 + actualRate);
                    totalSavings = Math.round(totalSavings);
                    idealInterest[i] = totalSavings;
                    console.log("second loop year = " + i + " amount = " + totalSavings);
                }
              
    });

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

// Function to calculate the actual interest rate from an investment, needs a start date, start total amount, and current value
$(document).ready(  function() {
                console.log( "Lets calc a interest rate" );

                
                // Percentage rate for what given by customer, inflation, and actual
                var inflation = .04;
                var calcRate;

                // Expected saving per year
                
                var pastValue = 2000;
                var currentValue = 5000;
                var initialDate = new Date(2008,01,12);
                var currentDate = new Date();
                console.log("Initial Date = " + initialDate);
                console.log("Today's Date = " + currentDate);
               

                var oneDay = 24*60*60*1000; 
                var diffDays = Math.round(Math.abs((initialDate.getTime() - currentDate.getTime())/(oneDay)));
                var totalYears = diffDays/365;
                console.log("Days = " + diffDays);
                console.log("Years = " + totalYears);
                
                calcRate = ((currentValue/pastValue - 1) / totalYears);

                 console.log("Rate = " + calcRate);
               

                
    });


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