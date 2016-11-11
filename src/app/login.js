$(
    function() {
        $('#sign_in').click(
            function() {
                var emailAccount = $('#emailAccount').val().toLowerCase();
                $.ajax(
                    {
                        url: "https://api.mlab.com/api/1/databases/pm/collections/ip_users/" + emailAccount + "?apiKey=mwDHQOuAdZdk7Jj6kN7LUtt77QBcqfUC",
                        method: 'GET',
                        success: function(result) {
                            $('#emailErr').replaceWith('<td id = \'emailErr\' class = \'loginErr\' align = \'left\'><br></td>');
                            var correctPassword = result['password'];
                            if ($('#password').val().toLowerCase() !== correctPassword) {
                                $('#passwordErr').replaceWith('<td id = \'passwordErr\' class = \'loginErr\' align = \'left\'>The password is not correct.</td>');
                            }
                            else {
                                $('#passwordErr').replaceWith('<td id = \'passwordErr\' class = \'loginErr\' align = \'left\'><br></td>');
                                localStorage.setItem('logged_in', true);
                            }
                        },
                        error: function(error) {
                            $('#emailErr').replaceWith('<td id = \'emailErr\' class = \'loginErr\' align = \'left\'>The email address is not registered.</td>');
                        }
                    }
                );
            }
        );
    }
);

$(
    function() {
        $('#sign_up').click(
            function() {
                window.location.href = 'www/registration.html';
            }
        );
    }
);