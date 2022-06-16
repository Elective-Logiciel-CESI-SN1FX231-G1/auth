
export type Role = 'client'| 'restaurateur'| 'deliverer'| 'developer'| 'commercial'| 'technician'| 'admin'

export interface IUser {
  _id: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  phone: string,
  role: Role
}
