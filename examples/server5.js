var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));


app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "formula2.htm" );
})

/*app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "formula.htm" );
})


app.get('/formula.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "formula.htm" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})*/

//app.get('/formula.htm', function (req, res) {
app.post('/getfunction_data', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   //console.log(req.body);
   //console.log(req.body.function_name);

   $function_name = req.body.function_name;
   $min_amount = req.body.min_amount;
   $max_amount = req.body.max_amount;
   console.log($function_name);


   var talib = require("../build/Release/talib");
   var fs = require("fs");

   // Display module version
   //console.log("TALib Version: " + talib.version);

   // Load market data
   var marketContents = fs.readFileSync('examples/marketdata.json','utf8'); 
   var marketData = JSON.parse(marketContents);
   //console.log(marketData);

   var response = '';
   //response = marketdata;
   // execute ADX indicator function with time period 9

   /*for(var i=0;i<marketData.close.length-1;i++){
        if($function_name=="ADX" && i<5) {
              $function_array = {
                           name:$function_name,
                           startIdx: 0,
                           //endIdx: marketData.close[i].length - 1,
                           endIdx:1,
                           high: marketData.high[i],
                           low: marketData.low[i],
                           close: marketData.close[i],
                           volume: marketData.volume[i],
                           optInTimePeriod: 9
                     };
           } 
           
           console.log($function_array);
           talib.execute($function_array, function (result) {
                 console.log(result);
                 response = result;
                 res.end(JSON.stringify(response));
                 //res.end(JSON.stringify(response.result.outReal));
            });
   }*/

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

   /*talib.execute({
       name: "AD",
       startIdx: 0,
       endIdx: marketData.close.length - 1,
       high: marketData.high,
       low: marketData.low,
       close: marketData.close,
       volume: marketData.volume,
       //optInTimePeriod: 9
       
   }, function (result) {
      //console.log(result);
      response = result;
      //res.end(JSON.stringify(response));
      res.end(JSON.stringify(response.result.outReal));
   });*/

   //console.log($function_array);
   talib.execute($function_array, function (result) {
      console.log(result);
      response = result;
      //res.end(JSON.stringify(response));
      //response_array = {'marketdata_open':JSON.stringify(marketData.open),'functiondata':response.result.outReal};
      response_array = {'marketdata':JSON.stringify(marketData),'functiondata':response.result.outReal};
      //res.end(JSON.stringify(response.result.outReal));
      res.end(JSON.stringify(response_array));
   });

   /*response = {
         test:marketData,
      };*/
    
   //res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})