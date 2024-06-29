export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('token')

    if (token) {
        const { data: isValidToken } = await useAuth().verifyToken(token)
        if (!isValidToken.value.data) {
            return navigateTo('/auth/login')
        }

    } else {
        return navigateTo('/boards')
    }
})