// requestServer.js file
const http = require("http");
const request = require("request");
const port = 8686; 

http.createServer(function(req,res){
request ('https://adriantopete.github.io/', function(error, response, body){
    if (!body || !response || (error === null && response.statusCode !== 200)){
        res.end("bad URL\n");
        return;
    }
    if (response.statusCode === 200 && !error === true){
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(body); 
    }
})
}).listen(port);