import { CreateUserDto, User } from "../dto/user";

export abstract class UserRepository {
    abstract create({ email, name, password }: CreateUserDto): Promise<User>
    abstract getByEmail({ email }: Omit<CreateUserDto, 'name' | 'password'>): Promise<User | null>
    abstract getById({ id }: Omit<User, 'email' | 'name' | 'password'>): Promise<User | null>
    abstract delete({ id }: Omit<User, 'email' | 'name' | 'password'>): Promise<void>
}