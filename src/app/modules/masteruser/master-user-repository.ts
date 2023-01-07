import { MasterUser } from "@prisma/client";
import { MasterUserEntity } from "./master-user-entity";

export interface CreateMasterUserProps {
  master_user: MasterUserEntity;
}

export interface FindMasterUserByIdProps {
  id: string;
}

export interface FindMasterUserByNameProps {
  name: string;
}

export abstract class MasterUserRepository {
  abstract create(props: CreateMasterUserProps): Promise<void>;
  abstract findById(props: FindMasterUserByIdProps): Promise<MasterUser | null>;
  abstract findByName(props: FindMasterUserByNameProps): Promise<MasterUser | null>;
}
