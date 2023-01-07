import { compare, hashSync } from "bcryptjs";
import { randomUUID } from "crypto";
import { sign } from "jsonwebtoken";

interface MasterUserProps {
  name: string;
  password: string;
}

export class MasterUserEntity {
  private _id: string;
  private props: MasterUserProps;

  constructor(props: MasterUserProps, masterUserId?: string, password?: string) {
    this._id = masterUserId ?? randomUUID();
    this.props = {
      ...props,
      password: password ?? hashSync(props.password, 8)
    };
  }

  public async checkPassword(password: string): Promise<boolean> {
    return await compare(password, this.props.password);
  }

  public generateToken(): string {
    return sign({ id: this._id }, process.env.SECRET_MASTER_USER_TOKEN, { expiresIn: "1h"});
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get password(): string {
    return this.props.password;
  }
}