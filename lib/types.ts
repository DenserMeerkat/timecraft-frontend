export interface Course {
  code: string;
  name: string;
  hours: number;
  available: number[];
}

export interface Faculty {
  code: string;
  name: string;
  workload: number;
  occupied: number[];
}
