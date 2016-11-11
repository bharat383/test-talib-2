var talib = require("../build/Release/talib");
var fs = require("fs");

// Display module version
console.log();
console.log("TALib Version: " + talib.version);

// Load market data
var marketContents = fs.readFileSync('examples/marketdata.json','utf8'); 
var marketData = JSON.parse(marketContents);

// execute ADX indicator function with time period 9
talib.execute({
    name: "MINUS_DM",
    startIdx: 0,
    endIdx: marketData.close.length - 1,
    high: marketData.high,
    low: marketData.low,
    //open: marketData.open,
    //close: marketData.close,
    optInTimePeriod: 45,
    //optInAcceleration: 30,
    //optInMaximum: 50
    
}, function (result) {

    // Show the result array
    console.log("MINUS_DM Function Results:");
    //console.log(result);
    console.log(result);

    /*var http = require('http');
    var server = http.createServer(function(req, res) {
        res.writeHead(200);
        console.log(result);
        //var result_length = result.result.outReal.length;
        res.write(result);
        for(var i=0;i<result.result.outReal.length;i++){
            //res.end("<br>"+i);
            //console.log(i);
            res.write('\n\n');
            if(result.result.outReal[i]>=40 && result.result.outReal[i]<=45){
                res.write('\t\t ADX Result : Sale > True :'+result.result.outReal[i]);     
            } else {
                res.write('\t\t ADX Result : Buy > True :'+result.result.outReal[i]);
            }
        }         
        
        //res.end('ADX Results :'+JSON.stringify(result));    
     
    });
    server.listen(8080);*/

});
