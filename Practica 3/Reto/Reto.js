const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  // 1. Ruta Principal
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Assignment 1</title></head>");
    res.write(
      '<body><p>Enter Username</p><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>',
    );
    res.write('<a href="http://localhost:3000/users">Users</a>');
    res.write("</html>");
    return res.end();
  }

  // 2. Mostrar Usuarios (/users) - fs.readFile asíncrono
  if (url === "/users") {
    return fs.readFile("users.txt", "utf-8", (err, data) => {
      let userListHtml = "<li>No hay usuarios guardados</li>";

      // Si el archivo existe y tiene texto, generamos las etiquetas <li>
      if (!err && data.trim()) {
        const usersArray = data.trim().split("\n");
        userListHtml = usersArray.map((user) => `<li>${user}</li>`).join("");
      }

      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title>Assignment 1</title></head>");
      res.write(`<body><ul>${userListHtml}</ul></body>`);
      res.write('<a href="http://localhost:3000/">Formulario</a>');
      res.write("</html>");
      return res.end();
    });
  }

  // 3. Guardar Usuario (/create-user) - fs.appendFile con redirección en callback
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const rawValue = parsedBody.split("=")[1] || "";
      const username = decodeURIComponent(rawValue.replace(/\+/g, " "));

      // Añade el nombre con salto de línea sin borrar los anteriores
      fs.appendFile("users.txt", username + "\n", (err) => {
        if (err) {
          console.error("Error al escribir el archivo:", err);
        }

        // La redirección DEBE ir dentro del callback de escritura
        console.log(`Usuario creado: ${username}`);
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  // 4. Página 404
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>404 Error</title></head>");
  res.write("<body><h1>Page not found</h1></body>");
  res.write("</html>");
  res.end();
};

exports.handler = requestHandler;
exports.someText = "Some hard coded text";
