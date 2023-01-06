import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { PrismaEmployeeRepository } from "src/database/prisma/repositories/prisma-employee-repository";
import { EmployeeRepository } from "../employee/employee-repository";
import { AuthController } from "./auth.controller";
import { LoginEmployee } from "./use-cases/login-employee";
import { LoginEmployeeMiddleware } from "./use-cases/login-employee-middleware";

@Module({
  controllers: [AuthController],
  providers: [PrismaService,
    LoginEmployee,
    {
      provide: EmployeeRepository,
      useClass: PrismaEmployeeRepository,
    },
  ],
  exports: [EmployeeRepository]
})

export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginEmployeeMiddleware)
      .exclude(
        { path: "auth/login", method: RequestMethod.POST },
        { path: "employee/create", method: RequestMethod.POST },
        { path: "institution/create", method: RequestMethod.POST },
      )
      .forRoutes("*")
  }
}
