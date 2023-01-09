import { Injectable } from "@nestjs/common";
import { Employee } from "@prisma/client";
import { AppError } from "src/app/errors/app-error";
import { CheckEmployeePermissionsHelper } from "src/app/helpers/Check-employee-permissions-helper";
import { InstitutionRepository } from "../../institution/institution-repository";
import { StudentEntity } from "../student-entity";
import { StudentRepository } from "../student-repository";

interface CreateStudentUseCaseRequest {
  name: string;
  institution_id: string;
  by_employee: Employee;
}

@Injectable()
export class CreateStudentUseCase {
  constructor(private studentRepository: StudentRepository,
              private institutionRepository: InstitutionRepository) {}

  async execute(request: CreateStudentUseCaseRequest): Promise<void> {
    const { name, institution_id, by_employee } = request;

    // verify if by_employee has permission

    const hasPermission = CheckEmployeePermissionsHelper.execute({
      permissions: by_employee.permissions,
      permissionsToCheck: ["create_student"],
      role: by_employee.role
    });

    if (!hasPermission) throw new AppError("not allowed to create student")

    // verify if the institution is wrong

    if (by_employee.institution_id !== institution_id) throw new AppError("wrong institution");

    // verify if institution exists

    const institution = await this.institutionRepository.findById({
      id: institution_id
    });

    if (!institution) throw new AppError("institution not found");

    // verify if name already exists

    const studentByName = await this.studentRepository.findByName({
      name
    })

    if (!!studentByName) throw new AppError("name already exists");

    const student = new StudentEntity({
      name,
      institution_id
    })

    await this.studentRepository.create({
      student
    })
  }
}
