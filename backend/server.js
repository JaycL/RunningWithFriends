import express from 'express';
import cors from "cors";
import { errorMiddleware } from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

import router from './routes/index.routes.js';

const app = express();
const PORT = 3000

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});