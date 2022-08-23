"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryRouter = (0, express_1.Router)();
categoryRouter.get('/', (_req, res) => {
    res.send('Fetching all Users...');
});
categoryRouter.post('/', (_req, res) => {
    res.send("Saving user!");
});
exports.default = categoryRouter;
//# sourceMappingURL=categoryRouter.js.map