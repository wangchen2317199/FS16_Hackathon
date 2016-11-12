$(
    function() {
        $('#create_account').click(
            function() {
                var valid = true;
                
                // Check if the email is valid and not pre-occupied.
                var email = $('#emailAccount').val();
                if (email.indexOf('@') === -1) {
                    valid = false;
                    $('#emailErr').replaceWith('<td id = \'emailErr\' class = \'loginErr\' align = \'left\'>Not a valid email.</td>');
                }
                else {
                    $.ajax(
                        {
                            url: "https://api.mlab.com/api/1/databases/pm/collections/ip_users/" + email + "?apiKey=mwDHQOuAdZdk7Jj6kN7LUtt77QBcqfUC",
                            method: 'GET',
                            success: function(result) {
                                valid = false;
                                $('#emailErr').replaceWith('<td id = \'emailErr\' class = \'loginErr\' align = \'left\'>The email has been used.</td>');
                            },
                            error: function(error) {
                                $('#emailErr').replaceWith('<td id = \'emailErr\' class = \'loginErr\' align = \'left\'><br></td>');
                            },
                            complete: function() {
                                // Check if the password is valid.
                                var password = $('#password').val();
                                var password2 = $('#password2').val();
                                if (password !== password2) {
                                    valid = false;
                                    $('#passwordErr').replaceWith('<td id = \'passwordErr\' class = \'loginErr\' align = \'left\'>The two passwords are not same.</td>');
                                }
                                else if (password.length === 0 || password === null) {
                                    valid = false;
                                    $('#passwordErr').replaceWith('<td id = \'passwordErr\' class = \'loginErr\' align = \'left\'>Password cannot be empty.</td>');
                                }
                                else {
                                    $('#passwordErr').replaceWith('<td id = \'passwordErr\' class = \'loginErr\' align = \'left\'><br></td>');
                                }

                                // Check if the name is empty.
                                var name = $('#name').val();
                                if (name.length === 0 || name === null) {
                                    valid = false;
                                    $('#nameErr').replaceWith('<td id = \'nameErr\' class = \'loginErr\' align = \'left\'>The name cannot be empty.</td>');
                                }
                                else {
                                    $('#nameErr').replaceWith('<td id = \'nameErr\' class = \'loginErr\' align = \'left\'><br></td>');
                                }

                                // Check if the DOB is empty.
                                var DOB = $('#DOB').val();
                                if (DOB.length === 0 || DOB === null) {
                                    valid = false;
                                    $('#DOBErr').replaceWith('<td id = \'DOBErr\' class = \'loginErr\' align = \'left\'>DOB cannot be empty.</td>');
                                }
                                else {
                                    $('#DOBErr').replaceWith('<td id = \'DOBErr\' class = \'loginErr\' align = \'left\'><br></td>');
                                }

                                // If everything is OK, then go to the next data collection page.
                                if (valid) {
                                    localStorage.setItem('email', email);
                                    localStorage.setItem('password', password);
                                    localStorage.setItem('name', name);
                                    localStorage.setItem('DOB', DOB);
                                    window.location.href = 'registration2.html';
                                }
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