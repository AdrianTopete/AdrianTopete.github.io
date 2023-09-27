// requestServer.js file
const http = require("http");
const request = require("request");
const port = 8686; 
var args = process.argv.slice(2);
var spec = process.argv.slice(2);

http.createServer(function(req,res){
    var url = args[0] ? args[0] : 'https://adriantopete.github.io/';
    var text = spec[1] ? spec[1] : 'text/html'
request (url, function(error, response, body){
    if (!body || !response || (error === null && response.statusCode !== 200)){
        res.end("bad URL\n");
        return;
    }
    if (response.statusCode === 200 && !error === true){
        res.writeHead(200, {'Content-Type' : text});
        res.write(body); 
    }
    else {
        res.writeHead(response.statusCode, {'Content-Type' : 'text/html'});
        res.write(error.toString());
    }
    res.end();
})
}).listen(port);