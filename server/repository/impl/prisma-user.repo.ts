import { CreateUserDto, User } from "~/server/dto/user";
import { UserRepository } from "../user.repo";
import { v7 } from 'uuid'
import { prisma } from '../../config'

export class PrismaUserRepo implements UserRepository {
    async getByEmail({ email }: Omit<CreateUserDto, "name" | "password">): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { email }
        })
    }
    async create({ email, name, password }: CreateUserDto): Promise<User> {
        const id = v7()
        return await prisma.user.create({
            data: { id, email, name, password }
        })
    }

    async getById({ id }: Omit<User, "email" | "name" | "password">): Promise<User | null> {
        return await prisma.user.findFirst(
            { where: { id }, include: { boards: { select: { id: true, name: true, create_date: true, is_favorite: true, color: true } } } }
        )
    }

    async delete({ id }: Omit<User, "email" | "name" | "password">): Promise<void> {
        await prisma.user.delete({ where: { id }, include: { boards: { select: { owner: true } } } })
    }

}