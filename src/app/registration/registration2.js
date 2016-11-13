var investments; // Global variable
var index; // Controls deletion.

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
        investments = new SinglyList();
        index = 0;
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
                
                var e = document.getElementById('stockSymbol');
                var symbol = e.options[e.selectedIndex].value;
                
                // Check if the price is empty.
                var price = $('#price').text();
                if (price.length === 0 || price === null) {
                    valid = false;
                    $('#priceErr').replaceWith('<p id = \'priceErr\' class = \'loginErr\' align = \'left\' style = \'padding-top: 0.3em;\'>The price cannot be empty.</p>');
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
                    var currentInvestment = {
                        index: index,
                        date: date,
                        symbol: symbol,
                        price: price,
                        shares: shares
                    };
                    
                    index++;
                    
                    investments.add(currentInvestment);
                     
                    $('#investments').append(
                        '<div class = \'row\'>' +
                        '<div class = \'col-sm-3\'>' + date + '</div>' +
                        '<div class = \'col-sm-2\'>' + symbol + '</div>' +
                        '<div class = \'col-sm-3\'>' + price + '</div>' +
                        '<div class = \'col-sm-2\'>' + shares + '</div>' +
                        '<div class = \'col-sm-2\'>' + '<button class = \'d\' onclick = \'delInv(' + currentInvestment.index + ');\'>Delete</button>' + '</div>' +
                        '</div>'
                    );
                    $('#addInvestment').hide();
                    $('#next').replaceWith('<button id = \'next\' class = \'button\' style = \'vertical-align: middle; background-color: green;\' onclick = \'next();\'><span>Next</span></button>');
                    $('#date').val('');
                    $('#autoPrice').val('');
                    $('#price').text('');
                    $('#shares').val('');
                }
            }
        );
    }
);

function next() {
    var final_inv_string = '[';
    var firstTime = true;
    var node = investments.head;
    
    while (node) {
        if (firstTime) {
            final_inv_string += JSON.stringify(node.data);
            firstTime = false;
        }
        else {
            final_inv_string += ', ' + JSON.stringify(node.data);
        }
        
        node = node.next;
    }
    
    final_inv_string = final_inv_string + ']';
    
    localStorage.setItem('investments', final_inv_string);
    
    window.location.href = 'registration3.html';
}

function delInv(j) {
    var node = investments.head;
    var position = 1;
    while (node) {
        if (parseInt(node.data.index) === parseInt(j)) {
            break;
        }
        else {
            node = node.next;
            position++;
        }
    }
    investments.remove(position);
    
    var current;
    node = investments.head;
    $('#investments').replaceWith('<div id = \'investments\'></div>');
    
    while (node) {
        current = node.data;
        $('#investments').append(
            '<div class = \'row\'>' +
            '<div class = \'col-sm-3\'>' + current.date + '</div>' +
            '<div class = \'col-sm-2\'>' + current.symbol + '</div>' +
            '<div class = \'col-sm-3\'>' + current.price + '</div>' +
            '<div class = \'col-sm-2\'>' + current.shares + '</div>' +
            '<div class = \'col-sm-2\'>' + '<button class = \'d\' onclick = \'delInv(' + current.index + ');\'>Delete</button>' + '</div>' +
            '</div>'
        );
        node = node.next;
    }
}

function getP() {
    var dateValue = $('#date').val();
    var e = document.getElementById('stockSymbol');
    var symbol = e.options[e.selectedIndex].value;
    $.ajax(
        {
            url: 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22' +
            symbol + '%22%20and%20startDate%20%3D%20%22' + dateValue + '%22%20and%20endDate%20%3D%20%22' + dateValue + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=',
            method: 'GET',
            success: function(result) {
                var closePrice = result['query']['results'];
                var finalPrice;
                if (closePrice === null || closePrice.length === 0) {
                    alert('Error!  Cannot get the price!  Check the date!');
                }
                else {
                    finalPrice = closePrice['quote']['Close'];
                    $('#autoPrice').replaceWith(
                        '<div id = \'autoPrice\' class = \'row\'><button class = \'d\' style = \'margin-bottom: 0.1em;\' onclick = \'getP();\'>GetPrice</button><a id = \'price\'>' +
                        '  $' + parseFloat(finalPrice).toFixed(2) + '</a></div>'
                    );
                    $('#autoPrice').val(finalPrice);
                }
            },
            error: function(error) {
                alert('Error!  There was no trade on the date you picked!');
            }
        }
    );
}