import { Injectable } from "@nestjs/common";
import { Employee } from "@prisma/client";
import { AppError } from "src/app/errors/app-error";
import { CheckEmployeePermissionsHelper } from "src/app/helpers/Check-employee-permissions-helper";
import { EmployeeRepository } from "../../employee/employee-repository";
import { InstitutionRepository } from "../../institution/institution-repository";
import { TeacherRepository } from "../../teacher/teacher-repository";
import { ClassroomEntity } from "../classroom-entity";
import { ClassroomRepository } from "../classroom-repository";

interface CreateClassroomUseCaseRequest {
  subjects_name: string;
  grade_number: number;
  institution_id: string;
  teacher_id: string;
  by_employee: Employee;
}

@Injectable()
export class CreateClassroomUseCase {
  constructor(private classroomRepository: ClassroomRepository,
              private institutionRepository: InstitutionRepository,
              private teacherRepository: TeacherRepository,
              private employeeRepository: EmployeeRepository) {}

  async execute(request: CreateClassroomUseCaseRequest): Promise<void> {
    const {
      subjects_name,
      grade_number,
      institution_id,
      teacher_id,
      by_employee
    } = request;

    // verify if by_employee has permission

    const hasPermission = CheckEmployeePermissionsHelper.execute({
      permissions: by_employee.permissions,
      permissionsToCheck: ["create_classroom"],
      role: by_employee.role
    });

    if (!hasPermission) throw new AppError("not allowed to create classroom")

    // verify if the institution is wrong

    if (by_employee.institution_id !== institution_id) throw new AppError("wrong institution");

    // verify if institution exists

    const institution = await this.institutionRepository.findById({
      id: institution_id
    });

    if (!institution) throw new AppError("institution not found");

    // verify if teacher exists

    const teacher = await this.teacherRepository.findById({
      id: teacher_id
    });

    if (!teacher) throw new AppError("teacher not found");

    // verify if employee teacher instituion is wrong

    const teacherEmployee = await this.employeeRepository.findById({
      id: teacher.employee_id
    });

    if (teacherEmployee.institution_id !== institution_id) throw new AppError("wrong teacher")

    const classroom = new ClassroomEntity({
      subjects_name,
      grade_number,
      institution_id,
      teacher_id
    })

    await this.classroomRepository.create({
      classroom
    })
  }
}
