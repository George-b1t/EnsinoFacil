import { randomUUID } from "crypto";

interface StudentProps {
  name: string;
  institution_id: string;
}

export class StudentEntity {
  private _id: string;
  private props: StudentProps;

  constructor(props: StudentProps) {
    this._id = randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public get institution_id(): string {
    return this.props.institution_id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }
}
