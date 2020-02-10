export interface Employee {
  id: number,
  first_name: string,
  last_name: string,
  department: string,
  position: string,
  full_name: string,
  salaries: number,
  sex: string,
  education: string,
  start_date: number,
  contract_period: number,
  contract_end: number,
  CV: any,
  termination: number,
  experience_all: number,
  experience_here: number,
  key: string,
  birthday: any,
  nationality: string,
  pesel: number,
  email: string,
  phone: string,
  age: number,
  absences: number;
  schedule: [{
    month: number,
    year: number,
    day: number,
    what: string
  }]
}
