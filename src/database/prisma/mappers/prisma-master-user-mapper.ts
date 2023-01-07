import { MasterUserEntity } from "src/app/modules/masteruser/master-user-entity";

export class PrismaMasterUserMapper {
  static toPrisma(master_user: MasterUserEntity) {
    return {
      id: master_user.id,
      name: master_user.name,
      password: master_user.password
    }
  }
}
