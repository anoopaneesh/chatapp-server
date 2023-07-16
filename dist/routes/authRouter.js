"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authHelper_1 = __importDefault(require("../helpers/authHelper"));
const router = express_1.default.Router();
router.post('/login', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    authHelper_1.default.login(user).then((token) => {
        res.json({ status: 'ok', token });
    }).catch(err => {
        console.log(err);
        res.status(400).json({ status: "error", message: err.message });
    });
});
router.post('/signup', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    authHelper_1.default.signup(user).then((token) => {
        res.json({ status: 'ok', token });
    }).catch(err => {
        res.status(400).json({ status: "error", message: err.message });
    });
});
exports.default = router;
