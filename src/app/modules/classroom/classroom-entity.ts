import { randomUUID } from "crypto";

interface ClassroomProps {
  subjects_name: string;
  grade_number: number;
  institution_id: string;
  teacher_id: string;
}

export class ClassroomEntity {
  private _id: string;
  private props: ClassroomProps;

  constructor(props: ClassroomProps) {
    this._id = randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public get institution_id(): string {
    return this.props.institution_id;
  }

  public get teacher_id(): string {
    return this.props.teacher_id;
  }

  public get subjects_name(): string {
    return this.props.subjects_name;
  }

  public set subjects_name(subjects_name: string) {
    this.props.subjects_name = subjects_name;
  }

  public get grade_number(): number {
    return this.props.grade_number;
  }

  public set grade_number(grade_number: number) {
    this.props.grade_number = grade_number;
  }
}
