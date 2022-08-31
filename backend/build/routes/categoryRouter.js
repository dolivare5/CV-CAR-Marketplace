"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const categoryRouter = (0, express_1.Router)();
// http
categoryRouter.get('/', categoryController_1.getCategories);
categoryRouter.get('/:Cat_Id', categoryController_1.getCategory);
categoryRouter.post('/createCategory', categoryController_1.postCategory);
categoryRouter.put('/updateCategory/:Cat_Id', categoryController_1.putCategory);
exports.default = categoryRouter;
//# sourceMappingURL=categoryRouter.js.map