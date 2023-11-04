const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publicacionSchema = new Schema({
   titulo: String,
   texto: String,
   autor: {type: Schema.Types.ObjectId, ref: "Usuario"},
   categorias: {type: Schema.Types.ObjectId, ref: "Categoria"},
   comentarios: [{type: Schema.Types.ObjectId, ref: "Comentario"}], 
});

module.exports = mongoose.model("Publicacion", publicacionSchema);