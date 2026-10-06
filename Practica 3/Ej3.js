const http = require("http"); //busca modulo global
const fs = require("fs");
const { buffer } = require("stream/consumers");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/users") {
    //process.exit()
    //objetos response y programar directamente html
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> Assigment 1 </title></head>");
    res.write("<body><ul><li>User 1</li><li>User 2</li></ul></body>");
    res.write("</html>");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
