import { MasterUserEntity } from "./master-user-entity";

export interface CreateMasterUserProps {
  master_user: MasterUserEntity;
}

export abstract class MasterUserRepository {
  abstract create(props: CreateMasterUserProps): Promise<void>;
}
