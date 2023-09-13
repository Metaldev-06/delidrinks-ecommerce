import express, { Response } from "express";
import morgan from "morgan";
import cors from "cors";

import paymentRoutes from "./routes/payment.routes";
import { PORT } from "./config";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(paymentRoutes);

app.get("/", (_req, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
