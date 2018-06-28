const express = require('express')
const app = express()

var stop_id = null;
var https = require('https');

/* Format
app.HTTP_VERB('ROUTE_NAME', function(request, response) {
	// do something...
	// Send response back via `response.send();`
});
*/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/redline/schedule.json', function(req, res, next) {
    //parse query
    //typeof idea from https://stackoverflow.com/a/3390468/4651336
    if (typeof req.query.stop_id != "undefined") {
        stop_id = req.query.stop_id;
    }
    else {
        res.send({"errors":"No stop_id provided"});
        return;
    }

    //make v3 api lookup
    //from https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
    apiURL = 'https://api-v3.mbta.com/predictions?filter[route]=Red&filter[stop]='+stop_id+'&page[limit]=10&sort=departure_time'; 
    getJsonSample(apiURL, function(jsonToSend) {
        //send response with json data object
        if (jsonToSend.data[0].attributes.departure == 'undefined') {
            res.send({"errors":"No such stop_id exists"});
        }
        else {
            res.send(jsonToSend);
        }
        return;
    });
});
app.listen(process.env.PORT || 3000);

function getJsonSample(urlToGet, callBack) {
    //from https://nodejs.org/api/http.html#http_http_methods
    https.get(urlToGet, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];
        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}`);
        } else if (!/^application\/vnd.api\+json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                            `Expected application/vnd.api+json but received ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            // consume response data to free up memory
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                callBack(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
}
