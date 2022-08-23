import { Router } from "express";

const categoryRouter = Router();

categoryRouter.get('/', (_req, res) => {
    res.send('Fetching all Users...');
});

categoryRouter.post('/', (_req, res) => {
    res.send("Saving user!");
});

export default categoryRouter;