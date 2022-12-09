import { Role } from "src/api/roles/role.entity"

export class UserPayload {
    username: string
    roles: Role[]
}