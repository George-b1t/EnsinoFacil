import { Institution } from "@prisma/client";
import { InstitutionEntity } from "./institution-entity";

export interface CreateInstitutionProps {
  institution: InstitutionEntity;
}

export interface FindInstitutionByIdProps {
  id: string;
}

export interface FindInstitutionByNameProps {
  name: string;
}

export abstract class InstitutionRepository {
  abstract create(props: CreateInstitutionProps): Promise<void>;
  abstract findById(props: FindInstitutionByIdProps): Promise<Institution | null>;
  abstract findByName(props: FindInstitutionByNameProps): Promise<Institution | null>;
}