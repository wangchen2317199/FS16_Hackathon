$(
    function() {
        $('#finish').click(
            function() {
                var valid = true;
                
                // Check if the income is empty.
                var income = $('#income').val();
                if (income.length === 0 || income === null) {
                    valid = false;
                    $('#incomeErr').replaceWith('<td id = \'incomeErr\' class = \'loginErr\' align = \'left\'>Income cannot be empty.</td>');
                }
                else {
                    $('#incomeErr').replaceWith('<td id = \'incomeErr\' class = \'loginErr\' align = \'left\'><br></td>');
                }
                
                // Check if the savings is empty.
                var savings = $('#savings').val();
                if (savings.length === 0 || savings === null) {
                    valid = false;
                    $('#savingsErr').replaceWith('<td id = \'savingsErr\' class = \'loginErr\' align = \'left\'>Savings cannot be empty.</td>');
                }
                else {
                    $('#savingsErr').replaceWith('<td id = \'savingsErr\' class = \'loginErr\' align = \'left\'><br></td>');
                }
                
                // Check if the retirement age is empty.
                var retireAge = $('#retireAge').val();
                if (retireAge.length === 0 || retireAge === null) {
                    valid = false;
                    $('#retireErr').replaceWith('<td id = \'retireErr\' class = \'loginErr\' align = \'left\'>Retirement age cannot be empty.</td>');
                }
                else {
                    $('#retireErr').replaceWith('<td id = \'retireErr\' class = \'loginErr\' align = \'left\'><br></td>');
                }
                
                // Get the interest rate based on risk tolerance 
                var e = document.getElementById('rate');
                var rate = e.options[e.selectedIndex].value;
                console.log(rate);
                
                // Register at MongoDB if everything is OK.
                if (valid) {
                    $.ajax(
                        {
                            url: "https://api.mlab.com/api/1/databases/pm/collections/ip_users?apiKey=mwDHQOuAdZdk7Jj6kN7LUtt77QBcqfUC",
                            data: JSON.stringify(
                                {
                                    "_id": localStorage.getItem('email'),
                                    "password": localStorage.getItem('password'),
                                    "name": localStorage.getItem('name'),
                                    "DOB": localStorage.getItem('DOB'),
                                    "investments": JSON.parse(localStorage.getItem('investments')),
                                    "income": income,
                                    "savings": savings,
                                    "retire_age": retireAge,
                                    "desired_interest": rate
                                }
                            ),
                            type: "POST",
                            contentType: "application/json",
                            success: function(result) {
                                localStorage.setItem('logged_in', true);
                                localStorage.setItem('current_email', localStorage.getItem('email'));
                                window.location.href = '../user_view/overview.html';
                            },
                            error: function(error) {
                                alert("Cannot register.  Please try later.");
                                window.location.href = '../../index.html';
                            }
                        }
                    );
                }
            }
        );
    }
);

$(
    function() {
        $('#back_to_home').click(
            function() {
                window.location.href = '../../index.html';
            }
        );
    }
);
