import { getConnection } from "../database/database";

const getProductos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, nombre, precio FROM productos");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, nombre, precio FROM productos WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addProducto = async (req, res) => {
    try {
        const { nombre, precio } = req.body;

        if (nombre === undefined || precio === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const producto = { nombre, precio };
        const connection = await getConnection();
        await connection.query("INSERT INTO productos SET ?", producto);
        res.json({ message: "Producto añadido " });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio } = req.body;

        if (id === undefined || nombre === undefined || precio === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const producto = { nombre, precio };
        const connection = await getConnection();
        const result = await connection.query("UPDATE productos SET ? WHERE id = ?", [producto, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM productos WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getProductos,
    getProducto,
    addProducto,
    updateProducto,
    deleteProducto
};
