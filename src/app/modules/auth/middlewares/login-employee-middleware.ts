import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "src/app/errors/AppError";
import { EmployeeRepository } from "../../employee/employee-repository";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

@Injectable()
export class LoginEmployeeMiddleware implements NestMiddleware {
  constructor(private employeeRepository: EmployeeRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if(!authorization) throw new AppError("empty authorization")

    try {
      const token = authorization.replace("Bearer ", "").trim();

      const payload = verify(token, process.env.SECRET_EMPLOYEE_TOKEN) ?? {};

      const { id } = payload as TokenPayload;

      const employee = await this.employeeRepository.findById({ id });

      if(!employee) throw new Error();

      next();
    } catch {
      throw new AppError("invalid token");
    }
  }
}
