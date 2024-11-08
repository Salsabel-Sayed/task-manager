"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.login = exports.signup = void 0;
const AppErrors_1 = require("../../middleware/Errors/AppErrors");
const CatchErrors_1 = require("../../middleware/Errors/CatchErrors");
const auth_models_1 = require("./auth.models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// * signup
exports.signup = (0, CatchErrors_1.CatchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    const user = new auth_models_1.User({ userName, email, password });
    if (!user)
        return next(new AppErrors_1.AppErrors("your info not found!!!!", 400));
    yield user.save();
    res.status(201).json({ message: "signup done! welcome *-*", user });
}));
// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// * login
exports.login = (0, CatchErrors_1.CatchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const user = yield auth_models_1.User.findById(userId);
    if (!user)
        return next(new AppErrors_1.AppErrors("user not found!!!!", 400));
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        return next(new AppErrors_1.AppErrors("password not match!!!!", 400));
    const authorization = jsonwebtoken_1.default.sign({
        id: user._id,
        userName: user.userName,
        password: user.password,
        email: user.email
    }, "taskManager");
    res.status(200).json({ message: "login done! welcome *-*", user, authorization });
}));
// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// *get user
exports.getUser = (0, CatchErrors_1.CatchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const matchUserId = req.params.id;
    const userFound = yield auth_models_1.User.findById(userId).populate('tasks');
    console.log("get userid", userFound);
    if ((userFound === null || userFound === void 0 ? void 0 : userFound.id.toString()) !== matchUserId)
        return next(new AppErrors_1.AppErrors("id doesnt match", 400));
    if (!userFound)
        return next(new AppErrors_1.AppErrors("user not found!!!!", 400));
    res.status(200).json({ message: "user found!", userFound });
})); // ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// *update user
exports.updateUser = (0, CatchErrors_1.CatchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log("userId", userId);
    const matchUserId = req.params.id;
    console.log("matchUserId", matchUserId);
    const userFound = yield auth_models_1.User.findById(userId);
    console.log("userFound", userFound);
    if ((userFound === null || userFound === void 0 ? void 0 : userFound.id.toString()) !== matchUserId)
        return next(new AppErrors_1.AppErrors("id doesnt match", 400));
    const updatedUser = yield auth_models_1.User.findByIdAndUpdate(matchUserId, req.body, { new: true });
    res.json({ message: "updated", updatedUser });
}));
// ? //////////////////////////////////////////////////////////////////////////////////////////////////////
// *delete user
exports.deleteUser = (0, CatchErrors_1.CatchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const matchUserId = req.params.id;
    const userFound = yield auth_models_1.User.findById(userId);
    console.log("get userid", userFound);
    if ((userFound === null || userFound === void 0 ? void 0 : userFound.id.toString()) !== matchUserId)
        return next(new AppErrors_1.AppErrors("id doesnt match", 400));
    const updatedUser = yield auth_models_1.User.findByIdAndDelete(matchUserId);
    res.json({ message: "deleted", updatedUser });
}));
