import express, { Request, Response } from "express";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors({
    origin: ["http://localhost:8002", "http://localhost:8001"],
    credentials: true,
}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Product Service is running on port " + PORT);
});

app.listen(PORT, () => {
  console.log(`Product Service is running on port ${PORT}`);
});
