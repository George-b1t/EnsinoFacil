import { Body, Controller, Post, Get, Request } from "@nestjs/common";
import { CreateEmployeeBody } from "./dtos/create-employee-body";
import { ListEmployeesByInstitutionIdBody } from "./dtos/list-employees-by-institution-id-body";
import { Employee } from "@prisma/client";
import { CreateEmployeeUseCase } from "./use-cases/create-employee-use-case";
import { ListEmployeesByInstitutionIdUseCase } from "./use-cases/list-employees-by-institution-id-use-case";
import { CreateAdministratorEmployeeUseCase } from "./use-cases/create-administrator-employee-use-case";
import { Request as ExpressRequest } from "express";
import { CreateAdministratorEmployeeBody } from "./dtos/create-administrator-employee-body";

interface ListByInstitutionIdResponse {
  employees: Omit<Employee, "password">[];
}

@Controller("employee")
export class EmployeeController {
  constructor(private createEmployeeUseCase: CreateEmployeeUseCase,
              private createAdministratorEmployeeUseCase: CreateAdministratorEmployeeUseCase,
              private listEmployeesByInstitutionIdUseCase: ListEmployeesByInstitutionIdUseCase) {}

  @Post("create")
  async create(@Body() body: CreateEmployeeBody, @Request() req: ExpressRequest): Promise<void> {
    const {
      name,
      password,
      role,
      salary,
      institution_id,
      permissions
    } = body;

    await this.createEmployeeUseCase.execute({
      name,
      password,
      role,
      salary,
      institution_id,
      permissions,
      by_employee: req["employee"]
    })
  }

  @Post("create/administrator")
  async createAdministrator(@Body() body: CreateAdministratorEmployeeBody): Promise<void> {
    const {
      name,
      password,
      salary,
      institution_id
    } = body;

    await this.createAdministratorEmployeeUseCase.execute({
      name,
      password,
      salary,
      institution_id
    })
  }

  @Get("listByInstitutionId")
  async listByInstitutionId(
    @Body() body: ListEmployeesByInstitutionIdBody,
    @Request() req: ExpressRequest
  ): Promise<ListByInstitutionIdResponse> {
    const { institution_id } = body;

    const employees = await this.listEmployeesByInstitutionIdUseCase.execute({
      institution_id,
      by_employee: req["employee"]
    });

    return {
      employees
    };
  }
}
