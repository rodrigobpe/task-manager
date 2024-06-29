import type { CookieRef } from "#app"
import { useToast } from "~/components/ui/toast"

export const useAuth = () => {
    const { toast } = useToast()
    const authenticateUser = async (body: { email: string, password: string }) => {
        const { data, execute, error } = useFetch("/api/auth", { immediate: false, watch: false, body, method: 'post' })
        await execute()
        if (error.value) {
            return toast({
                title: error.value.data.message,
                variant: 'destructive'
            })
        }

        return navigateTo('/boards')
    }
    
    const verifyToken = async (token?: CookieRef<string | null | undefined>) => {
        const endpoint = '/api/auth/verify'
        const { data, error, execute } = useFetch(endpoint, { method: 'POST', immediate: false, watch: false, body: { token } })

        await execute()
        return { data, error }
    }

    return { authenticateUser,verifyToken }
}