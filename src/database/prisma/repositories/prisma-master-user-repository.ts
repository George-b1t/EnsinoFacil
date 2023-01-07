import { Injectable } from "@nestjs/common";
import { MasterUser } from "@prisma/client";
import { CreateMasterUserProps, FindMasterUserByIdProps, FindMasterUserByNameProps, MasterUserRepository } from "src/app/modules/masteruser/master-user-repository";
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

  async findById(props: FindMasterUserByIdProps): Promise<MasterUser | null> {
    const { id } = props;

    const master_user = await this.prismaService.masterUser.findUnique({
      where: {
        id
      }
    })

    if(!master_user) return null;

    return master_user;
  }

  async findByName(props: FindMasterUserByNameProps): Promise<MasterUser | null> {
    const { name } = props;

    const master_user = await this.prismaService.masterUser.findUnique({
      where: {
        name
      }
    })

    if(!master_user) return null;

    return master_user;
  }
}
