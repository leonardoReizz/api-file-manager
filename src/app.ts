import express from "express";
import { routes } from "./routes";
import cors from "cors";
import bodyParser from "body-parser";

class App {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(bodyParser.json());
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
