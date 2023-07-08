import app from "./app";
import dotenv from "dotenv";
import { env } from "./env";
import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(env.DATABASE_URL).then(() => {
  app.listen(env.PORT, () => {
    console.log("express up");
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: DataDog/NewRelic/Sentry
  }

  return res.status(500).json({ message: "Internal server error." });
});

export { app };
