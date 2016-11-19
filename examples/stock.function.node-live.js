var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "stock-function-node.htm" );
})

console.log('app started 2');

app.post('/getfunction_data', urlencodedParser, function (req, res) {

   console.log('app started 3'); 
   // Prepare output in JSON format
   console.log(req.body);
   console.log(req.body.function_name);

   $function_name = req.body.function_name;
   $min_amount = req.body.min_amount;
   $max_amount = req.body.max_amount;
   console.log($function_name);


   console.log('app started 4');

   var talib = require("../build/Release/talib");
   var fs = require("fs");

   // Display module version
   //console.log("TALib Version: " + talib.version);

   // Load market data
   var marketContents = fs.readFileSync('examples/marketdata.json','utf8'); 
   var marketData = JSON.parse(marketContents);
   //console.log(marketData);

   console.log('app started 5');

   var response = '';
   //response = marketdata;
   // execute ADX indicator function with time period 9

   if($function_name=="ADX") {
      $function_array = {
                           name:$function_name,
                           startIdx: 0,
                           endIdx: marketData.close.length - 1,
                           high: marketData.high,
                           low: marketData.low,
                           close: marketData.close,
                           volume: marketData.volume,
                           optInTimePeriod: 9
                     };
   } else if($function_name=="AD") {
      $function_array = {
                           name:$function_name,
                           startIdx: 0,
                           endIdx: marketData.close.length - 1,
                           high: marketData.high,
                           low: marketData.low,
                           close: marketData.close,
                           volume: marketData.volume
                        };
   } else if($function_name=="RSI") {
      $function_array = {
                           name:$function_name,
                           inReal: marketData.high,
                           startIdx: 0,
                           endIdx: marketData.close.length - 1,
                           optInTimePeriod: 9
                        };
   } else if($function_name=="SAR") {
      $function_array = {
                           name:$function_name,
                           startIdx: 0,
                           endIdx: marketData.close.length - 1,
                           high: marketData.high,
                           low: marketData.low,
                           optInAcceleration: 30,
                           optInMaximum: 50
                            
                        };
   } else if($function_name=="ATR") {
      $function_array = {
                           name:$function_name,
                           startIdx: 0,
                           endIdx: marketData.close.length - 1,
                           high: marketData.high,
                           low: marketData.low,
                           close: marketData.close,
                           optInTimePeriod: 9
                            
                        };
   } else if($function_name=="BOP") {
      $function_array = {
                           name:$function_name,
                           startIdx: 0,
                           endIdx: marketData.close.length - 1,
                           high: marketData.high,
                           low: marketData.low,
                           open: marketData.open,
                           close: marketData.close
                          };
   } else if($function_name=="ADOSC") {
      $function_array = {
                           name:$function_name,
                           startIdx: 0,
                           endIdx: marketData.close.length - 1,
                           high: marketData.high,
                           low: marketData.low,
                           open: marketData.open,
                           close: marketData.close,
                           volume: marketData.volume,
                           optInFastPeriod: 5,
                           optInSlowPeriod: 10
                          };
   } else if($function_name=="ADXR") {
      $function_array = {
                           name:$function_name,
                           high: marketData.high,
                           low: marketData.low,
                           close: marketData.close,
                           startIdx: 0,
                           endIdx: marketData.close.length - 1,
                           //volume: marketData.volume,
                           optInTimePeriod: 9
                     };
   } else {
      $function_array = {
                           name:$function_name,
                           startIdx: 0,
                           endIdx: marketData.close.length - 1,
                           high: marketData.high,
                           low: marketData.low,
                           close: marketData.close,
                           volume: marketData.volume,
                           optInTimePeriod: 9
                     };
   }

   console.log($function_array);
   talib.execute($function_array, function (result) {
      console.log(result);
      response = result;
      response_array = {'marketdata':JSON.stringify(marketData),'functiondata':response.result.outReal};
      console.log(result);
      res.end(JSON.stringify(response_array));
   });
});


app.listen(app.get('port'), function() {
   console.log('app launched');
  console.log('Node app is running on port', app.get('port'));
});


/*var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})*/