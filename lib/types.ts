export enum SubjectType {
  CORE = "Core",
  ELECTIVE = "Elective",
  SHARED = "Shared",
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
  ratio?: number[];
  group: string;
}

export interface Schedule {
  id: string;
  periods: number[];
}
