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

                for ( i = currentAge; i <= retirement; i++ ) {
                    totalSavings = (totalSavings + investment) * (1 + actualRate);
                    totalSavings = Math.round(totalSavings);
                    idealInterest[i] = totalSavings;
                    console.log("year = " + i + " amount = " + totalSavings);
                }

                for ( i = retirement + 1; i <= death; i++ ) {
                    totalSavings = (totalSavings - expense) * (1 + actualRate);
                    totalSavings = Math.round(totalSavings);
                    idealInterest[i] = totalSavings;
                    console.log("second loop year = " + i + " amount = " + totalSavings);
                }
              
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