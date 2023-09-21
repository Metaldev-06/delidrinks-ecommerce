"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use((0, morgan_1.default)("dev"));
app.use(payment_routes_1.default);
app.get("/", (_req, res) => {
    res.send("Hello World!");
});
app.listen(config_1.PORT, () => {
    console.log(`Server running on port ${config_1.PORT}`);
});
