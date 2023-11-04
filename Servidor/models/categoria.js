const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    nombre: String,
    publicaciones: [{type: Schema.Types.ObjectId, ref: "Publicacion"}],
})

module.exports = mongoose.model("Categoria", categoriaSchema);