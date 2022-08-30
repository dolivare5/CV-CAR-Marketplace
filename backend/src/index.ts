import express from 'express';
import usuarioRouter from "./routes/usuarioRouter";

const app =express();

app.use(express.json()); // Middleware que transforma el req.body a un json.

const PORT= 3000;

app.get("/api", (_req,res) => {
    console.log("Someone ping here!!" + new Date().toLocaleDateString());
    res.send('pong');
});

app.use('/api/usuarios',usuarioRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})