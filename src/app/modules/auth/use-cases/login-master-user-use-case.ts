import { Injectable } from "@nestjs/common";
import { AppError } from "src/app/errors/app-error";
import { PrismaMasterUserMapper } from "src/database/prisma/mappers/prisma-master-user-mapper";
import { MasterUserRepository } from "../../masteruser/master-user-repository";

interface LoginRequest {
  name: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable()
export class LoginMasterUserUseCase {
  constructor(private masterUserRepository: MasterUserRepository) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    const { name, password } = request;
  
    const master_user = await this.masterUserRepository.findByName({ name });

    if (!master_user) throw new AppError("master_user not found");

    const masterUserEntity = PrismaMasterUserMapper.fromPrisma(master_user);

    if (!masterUserEntity.checkPassword(password))
    
    throw new AppError("invalid password");

    return {
      token: masterUserEntity.generateToken()
    }
  }
}
