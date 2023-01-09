import { Injectable } from "@nestjs/common";
import { Employee } from "@prisma/client";
import { AppError } from "src/app/errors/app-error";
import { CheckEmployeePermissionsHelper } from "src/app/helpers/Check-employee-permissions-helper";
import { ClassroomRepository } from "../../classroom/classroom-repository";
import { StudentRepository } from "../../student/student-repository";
import { StudentClassEntity } from "../student-class-entity";
import { StudentClassRepository } from "../student-class-reposity";

interface CreateStudentClassUseCaseRequest {
  student_id: string;
  classroom_id: string;
  by_employee: Employee;
}

@Injectable()
export class CreateStudentClassUseCase {
  constructor(private studentClassRepository: StudentClassRepository,
              private studentRepository: StudentRepository,
              private classroomRepository: ClassroomRepository) {}

  async execute(request: CreateStudentClassUseCaseRequest): Promise<void> {
    const { classroom_id, student_id, by_employee } = request;

    // verify if by_employee has permission

    const hasPermission = CheckEmployeePermissionsHelper.execute({
      permissions: by_employee.permissions,
      permissionsToCheck: ["create_student_class"],
      role: by_employee.role
    });

    if (!hasPermission) throw new AppError("not allowed to create student_class")

    // verify if classroom exists

    const classroom = await this.classroomRepository.findById({
      id: classroom_id
    });

    if (!classroom) throw new AppError("classroom not found");

    // verify if the classroom institution is wrong

    if (by_employee.institution_id !== classroom.institution_id) throw new AppError("wrong classroom institution");

    // verify if student exists

    const student = await this.studentRepository.findById({
      id: student_id
    });

    if (!student) throw new AppError("student not found");

    // verify if the classroom institution is wrong

    if (by_employee.institution_id !== student.institution_id) throw new AppError("wrong student institution");

    const student_class = new StudentClassEntity({
      classroom_id,
      student_id
    })

    await this.studentClassRepository.create({
      student_class
    })
  }
}
