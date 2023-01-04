import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { PrismaClassroomRepository } from "src/database/prisma/repositories/prisma-classroom-repository";
import { PrismaStudentClassRepository } from "src/database/prisma/repositories/prisma-student-class-repository";
import { PrismaStudentRepository } from "src/database/prisma/repositories/prisma-student-repository";
import { ClassroomRepository } from "../classroom/classroom-repository";
import { StudentRepository } from "../student/student-repository";
import { StudentClassRepository } from "./student-class-reposity";
import { StudentClassController } from "./student-class.controller";
import { CreateStudentClassUseCase } from "./use-cases/create-student-class-use-case";

@Module({
  controllers: [StudentClassController],
  providers: [PrismaService,
    CreateStudentClassUseCase,
    {
      provide: StudentClassRepository,
      useClass: PrismaStudentClassRepository
    },
    {
      provide: StudentRepository,
      useClass: PrismaStudentRepository
    },
    {
      provide: ClassroomRepository,
      useClass: PrismaClassroomRepository
    }
  ],
  exports: [StudentClassRepository]
})

export class StudentClassModule {}
