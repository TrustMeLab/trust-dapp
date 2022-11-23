export enum UserType {
  Owner,
  Tenant
}

export interface CreateUserBody {
  type: UserType
  name: string
  address: string
}
