import { Body, Controller, Post, Request } from "@nestjs/common";
import { Request as ExpressRequest } from "express";
import { CreateStudentBody } from "./dtos/create-student-body";
import { CreateStudentUseCase } from "./use-cases/create-student-use-case";

@Controller("student")
export class StudentController {
  constructor(private createStudentUseCase: CreateStudentUseCase) {}

  @Post("create")
  async create(
    @Body() body: CreateStudentBody,
    @Request() req: ExpressRequest
  ): Promise<void> {
    const { name, institution_id } = body;

    await this.createStudentUseCase.execute({
      name,
      institution_id,
      by_employee: req["employee"]
    });
  }
}
