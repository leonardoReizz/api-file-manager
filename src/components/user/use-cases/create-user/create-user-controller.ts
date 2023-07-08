import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "./create-user-use-case";
import { z } from "zod";
import { EmailAlreadyExists } from "../../../errors/EmailAlreadyExists";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const createUserSchema = z.object({
        fullName: z.string().max(52).min(5),
        email: z.string().max(52),
        password: z.string().max(32).min(8),
      });

      const data = createUserSchema.parse(request.body);

      await this.createUserUseCase.execute(data);
      return response.status(201).json({ message: "User created" });
    } catch (error) {
      if (error instanceof EmailAlreadyExists) {
        return response.status(400).json({ message: error.message });
      }
      next(error);
    }
  }
}
