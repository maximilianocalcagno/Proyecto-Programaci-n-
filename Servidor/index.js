const express = require("express");
const app = express();
const mongoose = require("mongoose");
const puerto = 3000;
const bodyParser = require("body-parser");
const routerUsuarios = require("./routes/usuario");
const routerComentarios = require("./routes/comentario");
const routerCategorias = require("./routes/categoria");
const routerPublicaciones = require("./routes/publicacion");

app.use(bodyParser.json());

//db
mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Base de datos conectada");
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

app.use("/usuarios", routerUsuarios);
app.use("/comentarios", routerComentarios);
app.use("/publicaciones", routerPublicaciones);
app.use("/categorias", routerCategorias);

app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
  });