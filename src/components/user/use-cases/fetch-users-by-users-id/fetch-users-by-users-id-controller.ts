import { NextFunction, Request, Response } from "express";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { z } from "zod";
import { FetchUsersByUsersIdUseCase } from "./fetch-users-by-users-id-use-case";

export class FetchUsersByUsersIdController {
  constructor(private getUserUseCase: FetchUsersByUsersIdUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const fetchUsersSchema = z.object({
        usersId: z.string().array(),
        page: z.number().optional().default(1),
        limit: z.number().optional().default(10),
        search: z.string().optional().default(""),
        filter: z
          .object({
            order: z.string(),
            name: z.string(),
          })
          .optional()
          .default({
            order: "asc",
            name: "fullName",
          }),
      });

      const data = fetchUsersSchema.parse(request.body);

      const { users } = await this.getUserUseCase.execute(data);

      return response.status(200).json({ message: users });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return response.status(400).json({ message: error.message });
      }
      next(error);
    }
  }
}
