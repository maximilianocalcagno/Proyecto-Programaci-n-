const Comentario = require("../models/comentario");
const Usuario = require("../models/usuario");
const Publicacion = require("../models/publicacion");

const crearComentario = async (req, res) => {
    const { autor, texto, Publicacion} = req.body;
    const comentario = new Comentario({ autor, texto, Publicacion });
    await Publicacion.findByIdAndUpdate(Publicacion, { $push: { comentarios: comentario._id } });
    await Usuario.findByIdAndUpdate(autor, { $push: { comentarios: comentario._id } });
    await comentario.save();
    res.json({
        msg: "Comentario creado",
        comentario
    })
};

const editarComentario = async (req, res) => {
    const { id } = req.params;
    const { texto } = req.body;
    const comentario = await Comentario.findByIdAndUpdate(id, { texto });
    res.json({
        msg: "Comentario actualizado",
        comentario
    })
};

const eliminarComentario = async (req, res) => {
    const { id } = req.params;
    const comentario = await Comentario.findByIdAndDelete(id);
    await Publicacion.findByIdAndUpdate(comentario.Publicacion, { $pull: { comentarios: id } });
    await Usuario.findByIdAndUpdate(comentario.autor, { $pull: { comentarios: id } });
    res.json({
        msg: "Comentario eliminado",
        comentario
    })
}

modules.export = {
    crearComentario,
    editarComentario,
    eliminarComentario
}