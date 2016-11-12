$(
    function() {
        $('#add_investment').click(
            function() {
                $('#addInvestment').show();
                $('#next').replaceWith('<button id = \'next\' class = \'button\' style = \'vertical-align: middle; background-color: green; opacity: 0.3;\'>Next</button>');
            }
        );
    }
);

$(document).ready(
    function() {
        $('#addInvestment').hide();
        localStorage.setItem('investments', '');
    }
);

$(
    function() {
        $('#Cancel').click(
            function() {
                $('#addInvestment').hide();
                $('#next').replaceWith('<button id = \'next\' class = \'button\' style = \'vertical-align: middle; background-color: green;\' onclick = \'next();\'><span>Next</span></button>');
            }
        );
    }
);

$(
    function() {
        $('#Add').click(
            function() {
                var valid = true;
                
                // Check if the date is empty.
                var date = $('#date').val();
                if (date.length === 0 || date === null) {
                    valid = false;
                    $('#dateErr').replaceWith('<p id = \'dateErr\' class = \'loginErr\' align = \'left\' style = \'padding-top: 0.3em;\'>Purchase date cannot be empty.</p>');
                }
                else {
                    $('#dateErr').replaceWith('<p id = \'dateErr\' class = \'loginErr\' align = \'left\' style = \'padding-top: 0.3em;\'><br></p>');
                }
                
                // Check if the symbol is empty.
                var symbol = $('#symbol').val().toUpperCase();
                if (symbol.length === 0 || symbol === null) {
                    valid = false;
                    $('#symbolErr').replaceWith('<p id = \'symbolErr\' class = \'loginErr\' align = \'left\' style = \'padding-top: 0.3em;\'>Stock symbol cannot be empty.</p>');
                }
                else {
                    $('#symbolErr').replaceWith('<p id = \'symbolErr\' class = \'loginErr\' align = \'left\' style = \'padding-top: 0.3em;\'><br></p>');
                }
                
                // Check if the price is empty.
                var price = $('#price').val();
                if (price.length === 0 || price === null) {
                    valid = false;
                    $('#priceErr').replaceWith('<p id = \'priceErr\' class = \'loginErr\' align = \'left\' style = \'padding-top: 0.3em;\'>Price cannot be empty.</p>');
                }
                else {
                    $('#priceErr').replaceWith('<p id = \'priceErr\' class = \'loginErr\' align = \'left\' style = \'padding-top: 0.3em;\'><br></p>');
                }
                
                // Check if the shares is empty.
                var shares = $('#shares').val();
                if (shares.length === 0 || shares == null) {
                    valid = false;
                    $('#sharesErr').replaceWith('<p id = \'sharesErr\' class = \'loginErr\' align = \'left\' style = \'padding-top: 0.3em;\'>Number of shares cannot be empty.</p>');
                }
                else {
                    $('#sharesErr').replaceWith('<p id = \'sharesErr\' class = \'loginErr\' align = \'left\' style = \'padding-top: 0.3em;\'><br></p>');
                }
                
                // Append of investments if the input is valid.
                if (valid) {
                    $('#investments').append(
                        '<div class = \'row\'>' +
                        '<div class = \'col-sm-3\'>' + date + '</div>' +
                        '<div class = \'col-sm-3\'>' + symbol + '</div>' +
                        '<div class = \'col-sm-3\'>' + price + '</div>' +
                        '<div class = \'col-sm-3\'>' + shares + '</div>' +
                        '</div>'
                    );
                    $('#addInvestment').hide();
                    $('#next').replaceWith('<button id = \'next\' class = \'button\' style = \'vertical-align: middle; background-color: green;\' onclick = \'next();\'><span>Next</span></button>');
                    $('#date').val('');
                    $('#symbol').val('');
                    $('#price').val('');
                    $('#shares').val('');
                    
                    var inv = localStorage.getItem('investments');
                    inv = inv.substr(0, inv.length - 1); // Remove the last ']' character.
                    var currentInvestment = {
                        date: date,
                        symbol: symbol,
                        price: price,
                        shares: shares
                    }
                    
                    if (inv.length === 0 || inv === null) {
                        inv = '[' + JSON.stringify(currentInvestment);
                    }
                    else {
                        inv += ',' + JSON.stringify(currentInvestment);
                    }
                    
                    localStorage.setItem('investments', inv + ']');
                }
            }
        );
    }
);

function next() {
    window.location.href = 'registration3.html';
}
