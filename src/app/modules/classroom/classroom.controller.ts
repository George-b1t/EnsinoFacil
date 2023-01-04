import { Body, Controller, Post } from "@nestjs/common";
import { CreateClassroomBody } from "./dtos/create-classroom-body";
import { CreateClassroomUseCase } from "./use-cases/create-classroom-use-case";

@Controller("classroom")
export class ClassroomController {
  constructor(private createClassroomUseCase: CreateClassroomUseCase) {}

  @Post("create")
  async create(@Body() body: CreateClassroomBody) {
    const {
      subjects_name,
      grade_number,
      institution_id,
      teacher_id
    } = body;

    await this.createClassroomUseCase.execute({
      subjects_name,
      grade_number,
      institution_id,
      teacher_id
    })
  }
}
