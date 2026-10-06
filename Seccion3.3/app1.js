const http = require("http");
const routes = require("./routes");
console.log(routes.someText);
const server = http.createServer(routes.handler);
//exports.handler = requestHandler;
//exports.someText = "Some hard coded text";
server.listen(3000);
