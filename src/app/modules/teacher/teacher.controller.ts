import { Controller, Body, Post, Request } from "@nestjs/common";
import { Request as ExpressRequest } from "express";
import { CreateTeacherBody } from "./dtos/create-teacher-body";
import { CreateTeacherUseCase } from "./use-cases/create-teacher-use-case";

@Controller("teacher")
export class TeacherController {
  constructor(private createTeacherUseCase: CreateTeacherUseCase) {}

  @Post("create")
  async create(
    @Body() body: CreateTeacherBody,
    @Request() req: ExpressRequest
  ): Promise<void> {
    const { employee_id } = body;

    await this.createTeacherUseCase.execute({
      employee_id,
      by_employee: req["employee"]
    });
  }
}
