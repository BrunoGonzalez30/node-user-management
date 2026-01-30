const express = require("express");
const bodyParser = require("body-parser");
const sqlite = require("sqlite3").verbose();

const app = express();
const port = 3000;

// middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.json());


db = new sqlite.Database("./database.db");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/guardar", (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;

  db.run(`INSERT INTO users (name, email) VALUES (?,?)`, [name, email], () => {
    res.send("Usuario guardado correctamente");
  });
});

app.get("/api/users", (req, res) => {
  db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) {
      return res.status(500).send("Error al obtener los usuarios");
    }
    res.json(rows);
  });
});

app.get("/users", (req, res) => {
    res.sendFile(__dirname + "/users.html")
})

app.delete("/api/users/:id", (req, res) => {
  const {id} = req.params;

  db.run(`DELETE FROM users WHERE ID = ?`, [id], (err) => {
    if (err) {
      return res.status(500).send("Error al eliminar el usuario");
    }
    if (this.changes === 0) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.json({success: true, message: "Usuario eliminado correctamente"});
  });
});

app.put("/api/users/:id", (req, res) => {
  const {id} = req.params;
  const {name, email} = req.body;

  db.run(`UPDATE users SET name = ?, email = ? WHERE ID = ?`, [name, email, id], (err) => {
    if (err) {
      return res.status(500).send("Error al actualizar el usuario");
    }
    if (this.changes === 0) {
      return res.status(404).send("Usuario no encontrado");
    }
    res.json({ success: true, message: "Usuario actualizado correctamente" });
  })
})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
