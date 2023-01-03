import { Injectable } from "@nestjs/common";
import { Employee } from "@prisma/client";
import { EmployeeRepository } from "../employee-repository";

interface ListEmployeesByInstitutionIdUseCaseRequest {
  institution_id: string;
}

@Injectable()
export class ListEmployeesByInstitutionIdUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(request: ListEmployeesByInstitutionIdUseCaseRequest): Promise<Employee[]> {
    const { institution_id } = request;

    const employees = await this.employeeRepository.listByInstitutionId({ institution_id });

    return employees;
  }
}