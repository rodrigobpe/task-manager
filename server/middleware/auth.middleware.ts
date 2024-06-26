import jwt from "jsonwebtoken";
import { prisma } from '../config'
import { unauthorizedError } from "../error";

type JWToken = {
    id: string
}
export default defineEventHandler(async (event) => {
    const pathDontNeedMiddleware = ['/api/auth', '/api/auth/','/api/auth/verify']
    
    if (!event.path.includes('/api/') || (pathDontNeedMiddleware.includes(event.path) && event.method == 'POST')) return
    if(event.path.includes('/api/users') && event.method == 'POST') return

    const { authorization } = event.node.req.headers
    if (!authorization || authorization == undefined) throw unauthorizedError('Não autorizado, está faltando o JWT!')

    const config = useRuntimeConfig()
    const token = authorization?.split(' ')[1];
    
    return jwt.verify(token, config.apiSecret ?? '', async (error: any, result: any) => {
        if (error) return unauthorizedError(error.message)
        const { id } = result as JWToken
        const user = await prisma.user.findFirst({ where: { id } })
        if (!user) throw unauthorizedError("Usuário não autorizado.")
        event.id = id;
    })

})