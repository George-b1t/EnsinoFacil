import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { PrismaEmployeeRepository } from "src/database/prisma/repositories/prisma-employee-repository";
import { PrismaTeacherRepository } from "src/database/prisma/repositories/prisma-teacher-repository";
import { EmployeeRepository } from "../employee/employee-repository";
import { TeacherRepository } from "./teacher-repository";
import { TeacherController } from "./teacher.controller";
import { CreateTeacherUseCase } from "./use-cases/create-teacher-use-case";

@Module({
  controllers: [TeacherController],
  providers: [PrismaService,
    CreateTeacherUseCase,
    {
      provide: TeacherRepository,
      useClass: PrismaTeacherRepository
    },
    {
      provide: EmployeeRepository,
      useClass: PrismaEmployeeRepository
    }
  ],
  exports: [TeacherRepository]
})

export class TeacherModule {}
