import { MasterUser } from "@prisma/client";
import { MasterUserEntity } from "src/app/modules/masteruser/master-user-entity";

export class PrismaMasterUserMapper {
  static toPrisma(master_user: MasterUserEntity): MasterUser {
    return {
      id: master_user.id,
      name: master_user.name,
      password: master_user.password
    }
  }

  static fromPrisma(master_user: MasterUser): MasterUserEntity {
    const raw = new MasterUserEntity({
      name: master_user.name,
      password: master_user.password
    }, master_user.id, master_user.password)

    return raw;
  }
}
