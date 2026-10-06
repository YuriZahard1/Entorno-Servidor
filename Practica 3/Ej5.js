import http from "http";
import { readFile, writeFile } from "fs/promises";
const server = http.createServer(async (req, res) => {
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
    let userName = "User 1";
    try {
      userName = await readFile("Assignment 1.txt", "utf-8");
    } catch (error) {
      console.error("No se puede leer el archivo", error.message);
    }
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> Assigment 1 </title></head>");
    res.write(
      `<body><ul><li>${userName.trim()}</li><li>User 2</li></ul></body>`,
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];

    // Capturamos los fragmentos de datos
    for await (const chunk of req) {
      body.push(chunk);
    }

    const parsedBody = Buffer.concat(body).toString();
    // decodeURIComponent evita errores si se introducen espacios o caracteres especiales
    const username = decodeURIComponent(parsedBody.split("=")[1] || "");

    try {
      // Guardamos en el archivo de forma asíncrona limpia
      await writeFile("Assignment 1.txt", username);
    } catch (err) {
      console.error("Error al escribir el archivo", err);
    }

    // Redirigimos al inicio de forma correcta
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>404/Fallback</title><head>");
  res.write("<body> <h1>Page not found</h1></body>");
  res.write("</html>");
  res.end();
});
server.listen(3000);
