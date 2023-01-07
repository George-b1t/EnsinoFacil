import { Injectable } from "@nestjs/common";
import { CreateMasterUserProps, MasterUserRepository } from "src/app/modules/masteruser/master-user-repository";
import { PrismaMasterUserMapper } from "../mappers/prisma-master-user-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaMasterUserRepository implements MasterUserRepository {
  constructor(private prismaService: PrismaService) {}
  
  async create(props: CreateMasterUserProps): Promise<void> {
    const { master_user } = props;

    const raw = PrismaMasterUserMapper.toPrisma(master_user)

    await this.prismaService.masterUser.create({
      data: raw
    })
  }
}
