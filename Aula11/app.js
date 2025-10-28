import express from "express";
import "dotenv/config";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
const app = express ();
const port = process.env.PORT;

app.use(express.json()); 
app.use("/usuarios", usuarioRoutes);

app.get("/", (req, res) => {res.status(200).json({msg: "Rota Home"});
});

app.listen(port, ()=> {
    console.log(`http://localhost:${port}`);
});