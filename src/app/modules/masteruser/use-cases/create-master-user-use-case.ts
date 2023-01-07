import { Injectable } from "@nestjs/common";
import { MasterUserEntity } from "../master-user-entity";
import { MasterUserRepository } from "../master-user-repository";

interface CreateMasterUserUseCaseRequest {
  name: string;
  password: string;
}

@Injectable()
export class CreateMasterUserUseCase {
  constructor(private masterUserRepository: MasterUserRepository) {}

  async execute(props: CreateMasterUserUseCaseRequest): Promise<void> {
    const { name, password } = props;

    const master_user = new MasterUserEntity({
      name,
      password
    })

    await this.masterUserRepository.create({
      master_user
    })
  }
}
