import { Injectable } from "@nestjs/common";
import { Employee } from "@prisma/client";
import { AppError } from "src/app/errors/app-error";
import { CheckEmployeePermissionsHelper } from "src/app/helpers/Check-employee-permissions-helper";
import { EmployeeRepository } from "../../employee/employee-repository";
import { TeacherEntity } from "../teacher-entity";
import { TeacherRepository } from "../teacher-repository";

interface CreateTeacherUseCaseRequest {
  employee_id: string;
  by_employee: Employee;
}

@Injectable()
export class CreateTeacherUseCase {
  constructor(private teacherRepository: TeacherRepository,
              private employeeRepository: EmployeeRepository) {}

  async execute(request: CreateTeacherUseCaseRequest): Promise<void> {
    const { employee_id, by_employee } = request;

    // verify if by_employee has permission

    const hasPermission = CheckEmployeePermissionsHelper.execute({
      permissions: by_employee.permissions,
      permissionsToCheck: ["create_teacher"],
      role: by_employee.role
    });

    if (!hasPermission) throw new AppError("not allowed to create teacher")

    // verify if employee exists

    const employee = await this.employeeRepository.findById({
      id: employee_id
    });

    if (!employee) throw new AppError("employee not found");

    // verify if the institution is wrong

    if (by_employee.institution_id !== employee.institution_id) throw new AppError("wrong employee institution");

    // verify if employee id is already linked

    const teacherByEmployeeId = await this.teacherRepository.findByEmployeeId({
      employee_id
    });

    if (!!teacherByEmployeeId) throw new AppError("employee id already linked");

    const teacher = new TeacherEntity({
      employee_id
    })

    await this.teacherRepository.create({
      teacher
    })
  }
}
