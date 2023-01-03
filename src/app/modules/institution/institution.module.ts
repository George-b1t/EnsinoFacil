import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { PrismaInstitutionRepository } from "src/database/prisma/repositories/prisma-institution-repository";
import { InstitutionRepository } from "./institution-repository";
import { InstitutionController } from "./institution.controller";
import { CreateInstitutionUseCase } from "./use-cases/create-institution-use-case";

@Module({
  controllers: [InstitutionController],
  providers: [PrismaService,
    CreateInstitutionUseCase,
    {
      provide: InstitutionRepository,
      useClass: PrismaInstitutionRepository
    }
  ],
  exports: [InstitutionRepository]
})

export class InstitutionModule {}
