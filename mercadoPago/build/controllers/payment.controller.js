"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = exports.createOrder = void 0;
const mercadopago_1 = __importDefault(require("mercadopago"));
const config_1 = require("../config");
const axios_1 = __importDefault(require("axios"));
mercadopago_1.default.configure({
    access_token: `${config_1.MP_ACCESS_TOKEN}`,
});
global.orderId = "";
global.jwt = "";
global.userId = "";
const createOrder = async (req, res) => {
    const items = req.body.items;
    const order = req.body.order;
    const shipping_price = req.body.shipping_price;
    global.userId = req.body.userId;
    global.jwt = req.body.jwt;
    global.orderId = req.body.orderId;
    const result = await mercadopago_1.default.preferences.create({
        items: items,
        shipments: {
            cost: shipping_price,
            mode: "not_specified",
        },
        back_urls: {
            success: `https://delidrinks-ecommerce.vercel.app/resume/${order}`,
            failure: `https://delidrinks-ecommerce.vercel.app/resume/${order}`,
            //   pending: "https://7qrrtvzm-4200.brs.devtunnels.ms/",
        },
        auto_return: "approved",
        notification_url: "https://7qrrtvzm-3000.brs.devtunnels.ms/webhook",
    });
    res.send(result);
};
exports.createOrder = createOrder;
const webhook = async (req, res) => {
    const payment = req.body;
    console.log(payment);
    try {
        if (payment.type === "payment") {
            const orderId = global.orderId;
            const userId = global.userId;
            const jwt = global.jwt;
            const requestBody = {
                data: {
                    completed: true,
                    users_permissions_users: userId,
                },
            };
            const axiosInstance = axios_1.default.create({
                baseURL: "https://delidrinks-ecommerce-production.up.railway.app/api",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            const response = await axiosInstance.put(`/orders/${orderId}`, requestBody);
            console.log({ "Respuesta de axios": response });
            console.log("Salio todo bien pa");
            return res.sendStatus(200);
        }
        return res.status(404);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};
exports.webhook = webhook;
