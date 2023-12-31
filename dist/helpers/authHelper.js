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
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    signup: ({ username, password }) => __awaiter(void 0, void 0, void 0, function* () {
        let existingUser = yield User_1.default.findOne({ username }).exec();
        if (existingUser) {
            throw Error("Username is taken");
        }
        let hpass = yield bcrypt_1.default.hash(password, 10);
        const user = new User_1.default({ username, password: hpass });
        yield user.save();
        return jsonwebtoken_1.default.sign(user.toJSON(), process.env.JWT_SECRET);
    }),
    login: ({ username, password }) => __awaiter(void 0, void 0, void 0, function* () {
        let existingUser = yield User_1.default.findOne({ username }).exec();
        if (!existingUser) {
            throw Error('User does not exist');
        }
        let isPasswordMatching = yield bcrypt_1.default.compare(password, existingUser.password);
        if (isPasswordMatching) {
            return jsonwebtoken_1.default.sign(existingUser.toJSON(), process.env.JWT_SECRET);
        }
        else {
            throw Error('Password incorrect');
        }
    })
};
