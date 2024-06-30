export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('token')

    if (token) {
        const { data: isValidToken } = await useAuth().verifyToken(token)
        if (!isValidToken.value.data) {
            return await navigateTo('/auth/login')
        }

    } else {
        return await navigateTo('/boards')
    }
})