"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    passwordChangedAt: Date,
    tasks: [{ type: mongoose_1.Types.ObjectId, ref: "Task" }]
});
userSchema.pre('save', function () {
    this.password = bcrypt_1.default.hashSync(this.password, 3);
});
// userSchema.pre('findOneAndUpdate',function(){
//     if(this._update.password )this._update.password =bcrypt.hashSync(this._update.password, 3)
// })
exports.User = (0, mongoose_1.model)('User', userSchema);
