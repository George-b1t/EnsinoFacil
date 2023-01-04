import { Body, Controller, Post } from "@nestjs/common";
import { CreateStudentClassBody } from "./dtos/create-student-class-body";
import { CreateStudentClassUseCase } from "./use-cases/create-student-class-use-case";

@Controller("studentclass")
export class StudentClassController {
  constructor(private createStudentClassUseCase: CreateStudentClassUseCase) {}

  @Post("create")
  async create(@Body() body: CreateStudentClassBody): Promise<void> {
    const { classroom_id, student_id } = body;

    await this.createStudentClassUseCase.execute({
      classroom_id,
      student_id
    })
  }
}
