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
        var earliestDate = Date.parse(new Date());
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
                                    investmentsBySymbol[k].totalPrice += parseFloat(object.price.replace('$','')) * parseInt(object.shares);
                                    if (Date.parse(investmentsBySymbol[k].date) > Date.parse(object.date)) {
                                        investmentsBySymbol[k].date = Date.parse(object.date);
                                    }
                                    noDuplicate = false;
                                }
                            }
                            if (noDuplicate) {
                                investmentsBySymbol.push(
                                    {
                                        date: Date.parse(object.date),
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
                                if (investmentsBySymbol.length === 1) {
                                    investmentsBySymbol[0].currentValuePerShare = quotes.LastTradePriceOnly;
                                    newsum += parseFloat(quotes.LastTradePriceOnly) * parseInt(investmentsBySymbol[0].shares);
                                }
                                else {
                                    quotes.forEach(
                                        function(object) {
                                            var currentStock = object.symbol.toUpperCase();
                                            var currentShares = 0;
                                            investments.forEach(
                                                function(object3) {
                                                    if (object3.symbol === currentStock) {
                                                        currentShares += parseInt(object3.shares);
                                                    }
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
                                }
                                investmentsBySymbol.forEach(
                                    function(obj2) {
                                        var currentValue = parseFloat(obj2.currentValuePerShare) * parseInt(obj2.shares);
                                        var dollarProfit = currentValue - parseFloat(obj2.totalPrice);
                                        var percentProfit = dollarProfit / parseFloat(obj2.totalPrice) / ((Date.parse(new Date()) - obj2.date) / (1000 * 3600 * 24 * 365));
                                        var valueAfterFiveYears = currentValue * Math.pow(1 + percentProfit, 5);
                                        var negativePercentProfit = 0 - percentProfit;
                                        var valueAfterLoss = currentValue * Math.pow(1 + negativePercentProfit, 5);
                                        if (earliestDate > obj2.date) {
                                            earliestDate = obj2.date;
                                        }
                                        $('#s_details').append(
                                            '<div class = \'row\'>' +
                                            '<div class = \'col-sm-1\' align = \'center\'>' + obj2.symbol + '</div>' +
                                            '<div class = \'col-sm-2\' align = \'center\'>$' + parseFloat(obj2.totalPrice).toFixed(2) + '</div>' +
                                            '<div class = \'col-sm-2\' align = \'center\' style = \'color: black;\'>$' + currentValue.toFixed(2) + '</div>' +
                                            '<div class = \'col-sm-1\' align = \'center\' style = \'color: ' + redOrGreen(dollarProfit) + ';\'>$' + dollarProfit.toFixed(2) + '</div>' +
                                            '<div class = \'col-sm-2\' align = \'center\' style = \'color: ' + redOrGreen(dollarProfit) + ';\'><strong>' + (percentProfit * 100).toFixed(2) + '%</strong></div>' +
                                            '<div class = \'col-sm-2\' align = \'center\' style = \'color: blue;\'><strong>$' + valueAfterFiveYears.toFixed(2) + '</strong></div>' +
                                            '<div class = \'col-sm-2\' align = \'center\' style = \'color: gray;\'>$' + valueAfterLoss.toFixed(2) + '</div>' +
                                            '</div>'
                                        );
                                    }
                                );
                                
                                // Caculate the actual interest.
                                var interest = (newsum - oldsum) / oldsum / ((Date.parse(new Date()) - earliestDate) / (1000 * 3600 * 24 * 365));
                                sessionStorage.setItem('interest', interest);
                                
                                            //         high chart         
            //--------------------------------------------------------------------------------------------------------------------
                                var d = new Date();
                                d  = Date.parse(d);
                                var D = Date.parse(DOB);
                                var age = d - D;
                                sessionStorage.setItem('age', age);
                                var minutes = 1000 * 60;
                                var hours = minutes * 60;
                                var days = hours * 24;
                                var years = days * 365;
                                var currentAge = Math.round(age / years);
                                income = parseFloat(income);
                                savings = parseFloat(savings);
                                retire_age = parseInt(retire_age);
                                sessionStorage.setItem('retire_age', retire_age);
                                desired_interest = parseFloat(desired_interest);
                                var totalSavings = newsum;   //with idealinterest
                                var realSaving = newsum;      //with realinterest
                                var inflation = .04;
                                var death = 80;
                                var expense = income - savings;
                                var actualRate = (desired_interest / 100.0) - inflation;  
                                var realinterest = parseFloat(sessionStorage.getItem('interest')) - inflation;
                                var agearray = [];
                                for (var i = currentAge; i <= 80; i++){
                                    agearray.push(i);
                                }

            //---------------------------idealinterest--------------------------------------------
                                var idealinterest = [];
                                for (var i = currentAge; i <= retire_age; i++) {
                                    totalSavings = (totalSavings + savings) * (1 + actualRate);
                                    totalSavings = Math.round(totalSavings);
                                    idealinterest.push(totalSavings);
                                }
                                console.log(idealinterest);
                                for (var i = retire_age + 1; i <= death; i++) {
                                    totalSavings = (totalSavings - expense) * (1 + actualRate);
                                    totalSavings = Math.round(totalSavings);
                                    idealinterest.push(totalSavings);
                                }
                                console.log(idealinterest);

            //---------------------------actualinterest--------------------------------------------     
                                var  actualinterest = [];
                                for (var i = currentAge; i <= retire_age; i++) {
                                    realSaving = (realSaving + savings) * (1 + realinterest);//with actualinterest
                                    realSaving = Math.round(realSaving);
                                    actualinterest.push(realSaving);
                                }
                                console.log(actualinterest);
                                for (var i = retire_age + 1; i <= death; i++) {
                                    realSaving = (realSaving - expense) * (1 + realinterest);//with actualinterest
                                    realSaving = Math.round(realSaving);
                                    actualinterest.push(realSaving);
                                }
                                console.log(actualinterest);

            //---------loadchart---------     
                                Highcharts.chart(
                                    'container',
                                    {
                                        chart: {
                                            backgroundColor: null,
                                            style: {
                                                fontFamily: 'Trebuchet MS'
                                            }
                                        },
                                        title: {
                                            style: {
                                                color: 'red',
                                            },
                                            text: 'Total saving Chart',
                                            x: -20 //center
                                        },    
                                        xAxis: {
                                            className: 'x',
                                            title: {
                                                text: 'Age'
                                            },
                                            categories: agearray
                                        },
                                        yAxis: {
                                            gridLineColor: 'green',
                                            gridLineDashStyle: 'longdash',
                                            gridLineWidth: 0.5,
                                            className: 'y',
                                            title: {
                                                text: 'Total Saving'
                                            },
                                            plotLines: [{
                                                value: 0,
                                                width: 2,
                                                color: 'red'
                                            }]
                                        },
                                        tooltip: {
                                            valuePrefix: '$'
                                        },
                                        legend: {
                                            padding: 80,
                                            itemMarginTop: 10,
                                            floating: true,
                                            enabled: true,
                                            layout: 'vertical',
                                            align: 'left',
                                            verticalAlign: 'top',
                                            borderWidth: 0
                                        },
                                        series: [
                                            {
                                                name: 'saving with idealinterest',
                                                data: idealinterest
                                            },
                                            {
                                                name: 'saving with actualinterest',
                                                data: actualinterest
                                            }
                                        ]
                                    }
                                );
                            }
                        }
                    );
                    
                    $('#welcome').replaceWith('<div id = \'welcome\' class = \'row\' style = \'padding-bottom: 1em;\'>Welcome ' + name + '!</div>');
                    //$('#tableCellDOB').replaceWith('<div class = \'col-sm-2\' id = \'tableCellDOB\'>' + DOB + '</div>');
                    $('#tableCellIncome').replaceWith('<div class = \'col-sm-2\' id = \'tableCellIncome\'>$' + income + '</div>');
                    $('#tableCellIncome').css('color', 'red');
                    $('#savingsCell').replaceWith('<div class = \'col-sm-2\' id = \'savingsCell\'>$' + savings + '</div>');
                    $('#savingsCell').css('color', 'red');
                    $('#retireAgeCell').replaceWith('<div class = \'col-sm-2\' id = \'retireAgeCell\'>' + retire_age + '</div>');
                    $('#retireAgeCell').css('color', 'red');
                    $('#rateCell').replaceWith('<div class = \'col-sm-2\' id = \'rateCell\'>' + desired_interest + '%</div>');
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