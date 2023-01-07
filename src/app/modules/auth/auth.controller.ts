import { Controller, Post, Body } from "@nestjs/common";
import { LoginBody } from "./dtos/login-body";
import { LoginEmployeeUseCase } from "./use-cases/login-employee-use-case";
import { LoginMasterUserUseCase } from "./use-cases/login-master-user-use-case";

@Controller("auth")
export class AuthController {
  constructor(private loginEmployeeUseCase: LoginEmployeeUseCase,
              private loginMasterUserUseCase: LoginMasterUserUseCase) {}

  @Post("login")
  async login(@Body() body: LoginBody) {
    const { name, password } = body;

    const { token } = await this.loginEmployeeUseCase.execute({
      name,
      password
    });

    return {
      token
    }
  }

  @Post("login/master")
  async loginMaster(@Body() body: LoginBody) {
    const { name, password } = body;

    const { token } = await this.loginMasterUserUseCase.execute({
      name,
      password
    });

    return {
      token
    }
  }
}