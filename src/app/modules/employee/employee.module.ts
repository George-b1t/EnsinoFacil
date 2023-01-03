import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { PrismaEmployeeRepository } from "src/database/prisma/repositories/prisma-employee-repository";
import { PrismaInstitutionRepository } from "src/database/prisma/repositories/prisma-institution-repository";
import { InstitutionRepository } from "../institution/institution-repository";
import { EmployeeRepository } from "./employee-repository";
import { EmployeeController } from "./employee.controller";
import { CreateEmployeeUseCase } from "./use-cases/create-employee-use-case";
import { ListEmployeesByInstitutionIdUseCase } from "./use-cases/list-employees-by-institution-id-use-case";

@Module({
  controllers: [EmployeeController],
  providers: [PrismaService,
    CreateEmployeeUseCase,
    ListEmployeesByInstitutionIdUseCase,
    {
      provide: EmployeeRepository,
      useClass: PrismaEmployeeRepository,
    },
    {
      provide: InstitutionRepository,
      useClass: PrismaInstitutionRepository,
    }
  ],
  exports: [EmployeeRepository, InstitutionRepository]
})

export class EmployeeModule {}
