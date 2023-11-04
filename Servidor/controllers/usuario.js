const Usuario = require("../models/usuario");
const Publicacion = require("../models/publicacion");
const Comentario = require("../models/comentario");

const verUsuarios = async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
};

const verUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    res.json(usuario);
};

const crearUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;
    const usuario = new Usuario({ nombre, email, password });
    await usuario.save();
    res.json({
        msg: "Usuario creado",
        usuario
    })
};

const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;
    const usuario = await Usuario.findByIdAndUpdate(id, { nombre, email, password });
    res.json({
        msg: "Usuario actualizado",
        usuario
    })
};

const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);
    const publicaciones = await Publicacion.deleteMany({ autor: id });
    const comentarios = await Comentario.deleteMany({ autor: id });
    res.json({
        msg: "Usuario eliminado",
        usuario
    })
}

module.exports = {
    verUsuarios,
    verUsuario,
    crearUsuario,
    editarUsuario,
    eliminarUsuario
}