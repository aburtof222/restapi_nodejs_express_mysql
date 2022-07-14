import { getConnection } from "../database/database";

const getUsuarios = async (req, res) => {
    try {
        console.log("0");
        const connection = await getConnection();
        const result = await connection.query("SELECT id, usuario, contraseña FROM usuarios");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, usuario, contraseña FROM usuarios WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addUsuario = async (req, res) => {
    try {
        const { usuario, contraseña } = req.body;

        if (usuario === undefined || contraseña === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const nombre = { usuario, contraseña };
        const connection = await getConnection();
        await connection.query("INSERT INTO usuarios SET ?", nombre);
        res.json({ message: "Usuario añadido " });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario, contraseña } = req.body;

        if (id === undefined || usuario === undefined || contraseña === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const nombre = { usuario, contraseña };
        const connection = await getConnection();
        const result = await connection.query("UPDATE usuarios SET ? WHERE id = ?", [nombre, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM usuarios WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getUsuarios,
    getUsuario,
    addUsuario,
    updateUsuario,
    deleteUsuario
};
