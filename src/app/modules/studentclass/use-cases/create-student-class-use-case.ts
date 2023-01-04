import { Injectable } from "@nestjs/common";
import { AppError } from "src/app/errors/AppError";
import { ClassroomRepository } from "../../classroom/classroom-repository";
import { StudentRepository } from "../../student/student-repository";
import { StudentClassEntity } from "../student-class-entity";
import { StudentClassRepository } from "../student-class-reposity";

interface CreateStudentClassUseCaseRequest {
  student_id: string;
  classroom_id: string;
}

@Injectable()
export class CreateStudentClassUseCase {
  constructor(private studentClassRepository: StudentClassRepository,
              private studentRepository: StudentRepository,
              private classroomRepository: ClassroomRepository) {}

  async execute(request: CreateStudentClassUseCaseRequest): Promise<void> {
    const { classroom_id, student_id } = request;

    // verify if classroom exists

    const classroom = await this.classroomRepository.findById({
      id: classroom_id
    });

    if (!classroom) throw new AppError("classroom not found");

    // verify if student exists

    const student = await this.studentRepository.findById({
      id: student_id
    });

    if (!student) throw new AppError("student not found");

    const student_class = new StudentClassEntity({
      classroom_id,
      student_id
    })

    await this.studentClassRepository.create({
      student_class
    })
  }
}
