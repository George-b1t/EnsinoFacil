import { randomUUID } from "crypto";

interface InstitutionProps {
  name: string;
}

export class InstitutionEntity {
  private _id: string;
  private props: InstitutionProps;

  constructor(props: InstitutionProps) {
    this._id = randomUUID();
    this.props = props;
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
}
