import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { PrismaInstitutionRepository } from "src/database/prisma/repositories/prisma-institution-repository";
import { PrismaStudentRepository } from "src/database/prisma/repositories/prisma-student-repository";
import { InstitutionRepository } from "../institution/institution-repository";
import { StudentRepository } from "./student-repository";
import { StudentController } from "./student.controller";
import { CreateStudentUseCase } from "./use-cases/create-student-use-case";

@Module({
  controllers: [StudentController],
  providers: [PrismaService,
    CreateStudentUseCase,
    {
      provide: StudentRepository,
      useClass: PrismaStudentRepository
    },
    {
      provide: InstitutionRepository,
      useClass: PrismaInstitutionRepository
    }
  ],
  exports: [StudentRepository]
})

export class StudentModule {}
