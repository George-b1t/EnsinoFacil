import { Injectable } from "@nestjs/common";
import { Institution } from "@prisma/client";
import { CreateInstitutionProps, FindInstitutionByIdProps, FindInstitutionByNameProps, InstitutionRepository } from "src/app/modules/institution/institution-repository";
import { PrismaInstitutionMapper } from "../mappers/prisma-institution-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaInstitutionRepository implements InstitutionRepository {
  constructor(private prismaService: PrismaService) {}
  
  async create(props: CreateInstitutionProps): Promise<void> {
    const { institution } = props;

    const raw = PrismaInstitutionMapper.toPrisma(institution);

    await this.prismaService.institution.create({
      data: raw
    });
  }

  async findById(props: FindInstitutionByIdProps): Promise<Institution | null> {
    const { id } = props;

    const institution = await this.prismaService.institution.findUnique({
      where: {
        id
      }
    })

    if(!institution) return null;

    return institution;
  }

  async findByName(props: FindInstitutionByNameProps): Promise<Institution> {
    const { name } = props;

    const institution = await this.prismaService.institution.findUnique({
      where: {
        name
      }
    })

    if(!institution) return null;

    return institution;
  }
}
