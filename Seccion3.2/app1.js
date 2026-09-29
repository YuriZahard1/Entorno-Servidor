const http = require("http"); //busca modulo global
const fs = require("fs");
const { buffer } = require("stream/consumers");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    //process.exit()
    //objetos response y programar directamente html
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> Enter message </title></head>");
    res.write(
      '<body><p>Enter Message</p><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>',
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      let message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", (message += "\n" + message));
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
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
