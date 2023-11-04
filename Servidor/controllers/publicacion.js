const Publicacion = require("../models/publicacion");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");

const verPublicaciones = async (req, res) => {
    const publicaciones = await Publicacion.find();
    res.json(publicaciones);
};

const verPublicacion = async (req, res) => {
    const { id } = req.params;
    const publicacion = await Publicacion.findById(id);
    res.json(publicacion);
};

const crearPublicacion = async (req, res) => {
    const { titulo, texto, autor, categoria } = req.body;
    const publicacion = new Publicacion({ titulo, texto, autor, categorias });
    await publicacion.save();
    await Usuario.findByIdAndUpdate(autor, { $push: { publicaciones: publicacion._id } });
    
    for (let i = 0; i < categoria.length; i++){
        await Categoria.findByIdAndUpdate(categoria[i], { $push: { publicaciones: publicacion._id } });
    }

    res.json({
        msg: "Publicación creada",
        publicacion
    })
};

const editarPublicacion = async (req, res) => {
    const { id } = req.params;
    const { autor, titulo, texto, categoria} = req.body;
    const publicacion = await Publicacion.findByIdAndUpdate(id, { autor, titulo, texto, categoria });
    
    for (let i = 0; i < categoria.length; i++){
        await Categoria.findByIdAndUpdate(categoria[i], { $push: { publicaciones: publicacion._id } });
    }

    res.json({
        msg: "Publicación actualizada",
        publicacion
    })
};

const eliminarPublicacion = async (req, res) => {
    const { id } = req.params;
    const publicacion = await Publicacion.findByIdAndDelete(id);
    await Usuario.findByIdAndUpdate(autor, { $pull: { publicaciones: publicacion._id } });
    await Categoria.updateMany(publicacion.categorias, { $pull: { publicaciones: publicacion._id } });
    res.json({
        msg: "Publicación eliminada",
        publicacion
    })
};

modules.export = {
    verPublicaciones,
    verPublicacion,
    crearPublicacion,
    editarPublicacion,
    eliminarPublicacion
}