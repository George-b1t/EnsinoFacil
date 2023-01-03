import { InstitutionEntity } from "src/app/modules/institution/institution-entity";
import { Institution } from "@prisma/client";

export class PrismaInstitutionMapper {
  static toPrisma(institution: InstitutionEntity) {
    return {
      id: institution.id,
      name: institution.name
    }
  }
}
