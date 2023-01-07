import { InstitutionEntity } from "src/app/modules/institution/institution-entity";

export class PrismaInstitutionMapper {
  static toPrisma(institution: InstitutionEntity) {
    return {
      id: institution.id,
      name: institution.name
    }
  }
}
