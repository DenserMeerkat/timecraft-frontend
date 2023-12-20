export enum SubjectType {
  CORE = "CORE",
  ELECTIVE = "ELECTIVE",
  SHARED = "SHARED",
}

export interface Course {
  code: string;
  name: string;
  hours: number;
  available: number[];
}

export interface Faculty {
  code: string;
  name: string;
  occupied: number[];
}

export interface Subject {
  code: string;
  name: string;
  type: SubjectType;
  faculties: Faculty[];
  courses: Course[];
  group: string;
}

export interface Schedule {
  id: string;
  periods: number[];
}
