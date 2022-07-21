import express from "express";
import morgan from "morgan";
// Routes
import productoRoutes from "./routes/productos.routes";
import categoriaRoutes from "./routes/categorias.routes";
import usuariosRoutes from "./routes/usuarios.routes";

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/productos", productoRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/usuarios", usuariosRoutes);

export default app;
