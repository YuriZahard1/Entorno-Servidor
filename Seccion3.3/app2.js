const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title> Assigment 1 </title></head>");
    res.write(
      '<body><p>Enter Username</p><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>',
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    //process.exit()
    //objetos response y programar directamente html
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> Assigment 1 </title></head>");
    res.write(`<body><ul><li>User 1</li><li>User 2</li></ul></body>`);
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      let message = parsedBody.split("=")[1];
      fs.writeFileSync("Assignment 1.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");

        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>404/Fallback</title><head>");
  res.write("<body> <h1>Page not found</h1></body>");
  res.write("</html>");
  res.end();
};
exports.handler = requestHandler;
exports.someText = "Some hard coded text";
server.listen(3000);
