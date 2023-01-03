import { Controller, Post, Body } from "@nestjs/common";
import { CreateInstitutionBody } from "./dtos/create-institution-body";
import { CreateInstitutionUseCase } from "./use-cases/create-institution-use-case";

@Controller("institution")
export class InstitutionController {
  constructor(private createInstitutionUseCase: CreateInstitutionUseCase) {}

  @Post("create")
  async create(@Body() body: CreateInstitutionBody): Promise<void> {
    const { name } = body;

    await this.createInstitutionUseCase.execute({
      name
    })
  }
}
