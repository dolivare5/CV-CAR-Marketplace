import { Router } from "express";
import {getCategories, getCategory, postCategory, putCategory} from "../controllers/categoryController";

const categoryRouter = Router();

// http
categoryRouter.get('/', getCategories);

categoryRouter.get('/:Cat_Id', getCategory);

categoryRouter.post('/createCategory', postCategory);

categoryRouter.put('/updateCategory/:Cat_Id', putCategory);

export default categoryRouter;