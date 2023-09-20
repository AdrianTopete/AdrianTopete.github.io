const http = require("http");
var port = process.argv[2]

http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hola ');
    res.end('Como estas');
}).listen(Number(port));

