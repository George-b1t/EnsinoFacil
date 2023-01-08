import { Injectable } from "@nestjs/common";
import { Employee } from "@prisma/client";
import { AppError } from "src/app/errors/app-error";
import { CheckEmployeePermissionsHelper } from "src/app/helpers/Check-employee-permissions-helper";
import { InstitutionRepository } from "../../institution/institution-repository";
import { EmployeeEntity } from "../employee-entity";
import { EmployeeRepository } from "../employee-repository";

interface CreateEmployeeUseCaseRequest {
  name: string;
  password: string;
  role: string;
  salary: number;
  institution_id: string;
  permissions: string[];
  by_employee: Employee;
}

@Injectable()
export class CreateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository,
              private institutionRepository: InstitutionRepository) {}

  async execute(request: CreateEmployeeUseCaseRequest): Promise<void> {
    const {
      name,
      password,
      role,
      salary,
      institution_id,
      permissions,
      by_employee
    } = request;

    // verify if by_employee has permission

    const hasPermission = CheckEmployeePermissionsHelper.execute({
      permissions: by_employee.permissions,
      permissionsToCheck: ["create_employee"],
      role: by_employee.role
    });

    if (!hasPermission) throw new AppError("not allowed to create employee")

    // verify if the institution is wrong

    if (by_employee.institution_id !== institution_id) throw new AppError("wrong institution");

    // verify if institution exists

    const institution = await this.institutionRepository.findById({
      id: institution_id
    });

    if (!institution) throw new AppError("institution not found");

    // verify if name already exists

    const employeeByName = await this.employeeRepository.findByName({
      name
    })

    if (!!employeeByName) throw new AppError("name already exists");

    const verifiedPermissions = role === "administrator" ? [] : permissions;

    const employee = new EmployeeEntity({
      name,
      password,
      role,
      salary,
      institution_id,
      permissions: verifiedPermissions
    });

    await this.employeeRepository.create({
      employee
    });
  }
}
