import { Injectable } from "@nestjs/common";
import { AppError } from "src/app/errors/app-error";
import { InstitutionRepository } from "../../institution/institution-repository";
import { TeacherRepository } from "../../teacher/teacher-repository";
import { ClassroomEntity } from "../classroom-entity";
import { ClassroomRepository } from "../classroom-repository";

interface CreateClassroomUseCaseRequest {
  subjects_name: string;
  grade_number: number;
  institution_id: string;
  teacher_id: string;
}

@Injectable()
export class CreateClassroomUseCase {
  constructor(private classroomRepository: ClassroomRepository,
              private institutionRepository: InstitutionRepository,
              private teacherRepository: TeacherRepository) {}

  async execute(request: CreateClassroomUseCaseRequest): Promise<void> {
    const {
      subjects_name,
      grade_number,
      institution_id,
      teacher_id
    } = request;

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
