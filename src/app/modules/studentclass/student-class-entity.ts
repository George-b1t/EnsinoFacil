import { randomUUID } from "crypto";

interface StudentClassProps {
  student_id: string;
  classroom_id: string;
}

export class StudentClassEntity {
  private _id: string;
  private props: StudentClassProps;

  constructor(props: StudentClassProps) {
    this._id = randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public get student_id(): string {
    return this.props.student_id;
  }

  public get classroom_id(): string {
    return this.props.classroom_id;
  }
}
