express = require("express");
const path = require("path");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const port = process.env.PORT || 3000;

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"src" ,"public")));

//rutas de navefacion (html)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "public", "index.html"))
});

app.get("/users", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "public", "users.html"))
})

// rutas de la api

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
})