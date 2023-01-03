import { randomUUID } from "crypto";

interface TeacherProps {
  employee_id: string;
}

export class TeacherEntity {
  private _id: string;
  private props: TeacherProps;

  constructor(props: TeacherProps) {
    this._id = randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public get employee_id(): string {
    return this.props.employee_id;
  }
}
