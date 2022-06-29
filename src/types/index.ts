
export type Role = 'client'| 'restaurateur'| 'deliverer'| 'developer'| 'commercial'| 'technician'| 'admin'

export interface User {
  _id: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  phone: string,
  role: Role,
  ban: boolean
}
