const Categoria = require("../models/categoria");
const Publicacion = require("../models/publicacion");

const verCategorias = async (req, res) => {
    const categorias = await Categoria.find();
    res.json(categorias);
};

const verCategoria = async (req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id);
    res.json(categoria);
};

const crearCategorias = async (req, res) => {
    const { nombre } = req.body;
    const categoria = new Categoria({ nombre });
    await categoria.save();
    res.json({
        msg: "Categoría creada",
        categoria
    })
};

const editarCategorias = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const categoria = await Categoria.findByIdAndUpdate(id, { nombre });
    res.json({
        msg: "Categoría actualizada",
        categoria
    })
};

const eliminarCategorias = async (req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndDelete(id);
    const publicaciones = await Publicacion.findManyAndUpdate({ categorias: id }, { $pull: { categorias: id } });
    res.json({
        msg: "Categoría eliminada",
        categoria
    })
};

module.exports = {
    verCategoria,
    verCategorias,
    crearCategorias,
    editarCategorias,
    eliminarCategorias
}