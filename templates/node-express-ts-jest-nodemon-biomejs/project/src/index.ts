import { add } from "@/utils";
import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";

import config from "@/config";

dotenv.config();

const app: Express = express();
const port = config.port;

app.get("/", (_req: Request, res: Response) => {
	const result = add(1, 2);
	console.log(result);
	res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
