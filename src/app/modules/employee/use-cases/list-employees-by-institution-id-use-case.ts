import { Injectable } from "@nestjs/common";
import { Employee } from "@prisma/client";
import { AppError } from "src/app/errors/AppError";
import { EmployeeRepository } from "../employee-repository";
import { CheckEmployeePermissionsHelper } from "../../../helpers/Check-employee-permissions-helper";

interface ListEmployeesByInstitutionIdUseCaseRequest {
  institution_id: string;
  by_employee: Employee;
}

@Injectable()
export class ListEmployeesByInstitutionIdUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(request: ListEmployeesByInstitutionIdUseCaseRequest): Promise<Omit<Employee, "password">[]> {
    const { institution_id, by_employee } = request;

    // verify if by_employee has permission

    const hasPermission = CheckEmployeePermissionsHelper.execute({
      permissions: by_employee.permissions,
      permissionsToCheck: ["list_employee"],
      role: by_employee.role
    });

    if (!hasPermission) throw new AppError("not allowed to list employee")

    // verify if the institution is wrong

    if (by_employee.institution_id !== institution_id) throw new AppError("wrong institution");

    const employees = await this.employeeRepository.listByInstitutionId({ institution_id });

    employees.forEach(employee => delete employee.password);

    return employees;
  }
}