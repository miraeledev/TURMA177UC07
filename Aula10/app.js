import express from "express";
import "dotenv/config";
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res)=>{
    
})

app.listen(port, ()=>{
    console.log(`Aplicação rodando em http://localhost:${port}`);
})