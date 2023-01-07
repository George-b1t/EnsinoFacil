import { Body, Controller, Post } from "@nestjs/common";
import { CreateEmployeeBody } from "./dtos/create-master-user-body";
import { CreateMasterUserUseCase } from "./use-cases/create-master-user-use-case";

@Controller("masteruser")
export class MasterUserController {
  constructor(private createMasterUserUseCase: CreateMasterUserUseCase) {}

  @Post("create")
  async create(@Body() body: CreateEmployeeBody): Promise<void> {
    const { name, password } = body;

    await this.createMasterUserUseCase.execute({
      name,
      password
    })
  }
}
