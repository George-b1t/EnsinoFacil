import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { PrismaMasterUserRepository } from "src/database/prisma/repositories/prisma-master-user-repository";
import { MasterUserRepository } from "./master-user-repository";
import { MasterUserController } from "./master-user.controller";
import { CreateMasterUserUseCase } from "./use-cases/create-master-user-use-case";

@Module({
  controllers: [MasterUserController],
  providers: [PrismaService,
    CreateMasterUserUseCase,
    {
      provide: MasterUserRepository,
      useClass: PrismaMasterUserRepository
    }
  ],
  exports: [MasterUserRepository]
})

export class MasterUserModule {}
