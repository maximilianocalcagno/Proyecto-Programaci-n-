const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
    texto: String,
    puntuacion: Number,
    autor: {type: Schema.Types.ObjectId, ref: "Usuario"},
    publicacion: {type: Schema.Types.ObjectId, ref: "Publicacion"},
})

module.exports = mongoose.model("Comentario", comentarioSchema);