import { Request, Response } from "express";
import mercadopago from "mercadopago";
import { MP_ACCESS_TOKEN } from "../config";
import axios from "axios";

mercadopago.configure({
  access_token: `${MP_ACCESS_TOKEN}`,
});

// Generated by https://quicktype.io

interface Example {
  action: string;
  api_version: string;
  application_id: string;
  date_created: string;
  id: string;
  live_mode: string;
  type: string;
  user_id: number;
  data: Data;
}

export interface Data {
  id: string;
}

// let orderId: any = undefined;
// let jwt: any = undefined;
// let userId: any = undefined;
global.orderId = "";
global.jwt = "";
global.userId = "";

export const createOrder = async (req: Request, res: Response) => {
  //   console.log(req.body);

  const items = req.body.items;
  const order = req.body.order;
  const shipping_price = req.body.shipping_price;
  global.userId = req.body.userId;
  global.jwt = req.body.jwt;
  global.orderId = req.body.orderId;

  // console.log(items);
  // console.log(order);
  // console.log(shipping_price);
  // console.log(userId);
  // console.log(jwt);
  // console.log(orderId);

  const result = await mercadopago.preferences.create({
    items: items,

    shipments: {
      cost: shipping_price,
      mode: "not_specified",
    },

    back_urls: {
      success: `http://localhost:4200/resume/${order}`,
      failure: `http://localhost:4200/payment/${order}`,
      //   pending: "https://7qrrtvzm-4200.brs.devtunnels.ms/",
    },
    auto_return: "approved",

    notification_url: "https://7qrrtvzm-3000.brs.devtunnels.ms/webhook",
  });

  // console.log();
  res.send(result);
};

export const webhook = async (req: Request, res: Response) => {
  const payment: Example = req.body;

  console.log(payment);

  try {
    if (payment.type === "payment") {
      // const data = await mercadopago.payment.findById(Number(payment.id));

      const orderId = global.orderId;
      const userId = global.userId;
      const jwt = global.jwt;

      // console.log(userId);
      // console.log(jwt);
      // console.log(orderId);

      const requestBody = {
        data: {
          completed: true,
          users_permissions_users: userId,
        },
      };

      const axiosInstance = axios.create({
        baseURL: "http://192.168.1.16:1337/api",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const response = await axiosInstance.put(
        `/orders/${orderId}`,
        requestBody
      );
      console.log({ "Respuesta de axios": response });
      console.log("Salio todo bien pa");
      return res.sendStatus(200);
    }

    return res.status(404);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};