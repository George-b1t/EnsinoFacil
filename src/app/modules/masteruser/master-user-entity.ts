import { hashSync } from "bcryptjs";
import { randomUUID } from "crypto";

interface MasterUserProps {
  name: string;
  password: string;
}

export class MasterUserEntity {
  private _id: string;
  private props: MasterUserProps;

  constructor(props: MasterUserProps) {
    this._id = randomUUID();
    this.props = {
      ...props,
      password: hashSync(props.password, 8)
    };
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