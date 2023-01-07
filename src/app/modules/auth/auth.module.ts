import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { PrismaEmployeeRepository } from "src/database/prisma/repositories/prisma-employee-repository";
import { EmployeeRepository } from "../employee/employee-repository";
import { AuthController } from "./auth.controller";
import { LoginEmployeeUseCase } from "./use-cases/login-employee-use-case";
import { LoginEmployeeMiddleware } from "./middlewares/login-employee-middleware";
import { LoginMasterUserMiddleware } from "./middlewares/login-master-use-middleware";
import { MasterUserRepository } from "../masteruser/master-user-repository";
import { PrismaMasterUserRepository } from "src/database/prisma/repositories/prisma-master-user-repository";
import { LoginMasterUserUseCase } from "./use-cases/login-master-user-use-case";

@Module({
  controllers: [AuthController],
  providers: [PrismaService,
    LoginEmployeeUseCase,
    LoginMasterUserUseCase,
    {
      provide: EmployeeRepository,
      useClass: PrismaEmployeeRepository,
    },
    {
      provide: MasterUserRepository,
      useClass: PrismaMasterUserRepository,
    }
  ],
  exports: [EmployeeRepository, MasterUserRepository]
})

export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginEmployeeMiddleware)
      .exclude(
        { path: "auth/login", method: RequestMethod.POST },
        { path: "auth/login/master", method: RequestMethod.POST },
        { path: "institution/create", method: RequestMethod.POST },
        { path: "employee/create", method: RequestMethod.POST },
        { path: "masteruser/create", method: RequestMethod.POST },
      )
      .forRoutes("*")

    consumer
      .apply(LoginMasterUserMiddleware)
      .forRoutes(
        { path: "institution/create", method: RequestMethod.POST },
        { path: "employee/create", method: RequestMethod.POST }
      )
  }
}
