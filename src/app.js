import express from "express";
import morgan from "morgan";
// Routes
import languageRoutes from "./routes/language.routes";
import productoRoutes from "./routes/productos.routes";
import usuariosRoutes from "./routes/usuarios.routes";

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/languages", languageRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", usuariosRoutes);

export default app;
