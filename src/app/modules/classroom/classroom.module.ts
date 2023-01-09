import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { PrismaClassroomRepository } from "src/database/prisma/repositories/prisma-classroom-repository";
import { PrismaEmployeeRepository } from "src/database/prisma/repositories/prisma-employee-repository";
import { PrismaInstitutionRepository } from "src/database/prisma/repositories/prisma-institution-repository";
import { PrismaTeacherRepository } from "src/database/prisma/repositories/prisma-teacher-repository";
import { EmployeeRepository } from "../employee/employee-repository";
import { InstitutionRepository } from "../institution/institution-repository";
import { TeacherRepository } from "../teacher/teacher-repository";
import { ClassroomRepository } from "./classroom-repository";
import { ClassroomController } from "./classroom.controller";
import { CreateClassroomUseCase } from "./use-cases/create-classroom-use-case";

@Module({
  controllers: [ClassroomController],
  providers: [PrismaService,
    CreateClassroomUseCase,
    {
      provide: ClassroomRepository,
      useClass: PrismaClassroomRepository
    },
    {
      provide: InstitutionRepository,
      useClass: PrismaInstitutionRepository
    },
    {
      provide: TeacherRepository,
      useClass: PrismaTeacherRepository
    },
    {
      provide: EmployeeRepository,
      useClass: PrismaEmployeeRepository
    }
  ],
  exports: [ClassroomRepository]
})

export class ClassroomModule {}
