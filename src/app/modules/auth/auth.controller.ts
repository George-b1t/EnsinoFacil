import { Controller, Post, Body } from "@nestjs/common";
import { LoginEmployeeBody } from "./dtos/login-employee-body";
import { LoginEmployee } from "./use-cases/login-employee";

@Controller("auth")
export class AuthController {
  constructor(private loginEmployee: LoginEmployee) {}

  @Post("login")
  async login(@Body() body: LoginEmployeeBody) {
    const { name, password } = body;

    const { token } = await this.loginEmployee.execute({
      name,
      password
    });

    return {
      token
    }
  }
}