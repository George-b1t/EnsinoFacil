import { Body, Controller, Post, Get } from "@nestjs/common";
import { CreateEmployeeBody } from "./dtos/create-employee-body";
import { ListEmployeesByInstitutionIdBody } from "./dtos/list-employees-by-institution-id-body";
import { Employee as PrismaEmployee } from "@prisma/client";
import { CreateEmployeeUseCase } from "./use-cases/create-employee-use-case";
import { ListEmployeesByInstitutionIdUseCase } from "./use-cases/list-employees-by-institution-id-use-case";

interface ListByInstitutionIdResponse {
  employees: PrismaEmployee[];
}

@Controller("employee")
export class EmployeeController {
  constructor(private createEmployeeUseCase: CreateEmployeeUseCase,
              private listEmployeesByInstitutionIdUseCase: ListEmployeesByInstitutionIdUseCase) {}

  @Post("create")
  async create(@Body() body: CreateEmployeeBody): Promise<void> {
    const { name, salary, institution_id } = body;

    await this.createEmployeeUseCase.execute({
      name,
      salary,
      institution_id
    })
  }

  @Get("listByInstitutionId")
  async listByInstitutionId(@Body() body: ListEmployeesByInstitutionIdBody): Promise<ListByInstitutionIdResponse> {
    const { institution_id } = body;

    const employees = await this.listEmployeesByInstitutionIdUseCase.execute({
      institution_id
    });

    return {
      employees
    };
  }
}