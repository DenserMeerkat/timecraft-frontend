export interface Course {
  code: string;
  name: string;
  hours: number;
  fixedHours: number[];
}

export interface Faculty {
  code: string;
  name: string;
  workload: number;
  busy: number[];
}
