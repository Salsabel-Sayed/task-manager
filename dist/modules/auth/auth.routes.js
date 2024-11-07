"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const EmailExist_1 = require("../../middleware/checkEmail/EmailExist");
const verifyToken_1 = require("../../middleware/token/verifyToken");
const validate_1 = require("../../middleware/validations/validate");
const auth_validation_1 = require("./auth.validation");
const userRouter = (0, express_1.Router)();
userRouter.post('/signup/', (0, validate_1.validate)(auth_validation_1.userVal), EmailExist_1.checkEmail, auth_controller_1.signup);
userRouter.post('/login/', verifyToken_1.protectedRoute, auth_controller_1.login);
userRouter.put('/updateUser/:id', (0, validate_1.validate)(auth_validation_1.userVal), verifyToken_1.protectedRoute, auth_controller_1.updateUser);
userRouter.delete('/deleteUser/:id', verifyToken_1.protectedRoute, auth_controller_1.deleteUser);
userRouter.get('/getUser/:id', verifyToken_1.protectedRoute, auth_controller_1.getUser);
exports.default = userRouter;