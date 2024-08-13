import { toast } from "~/components/ui/toast"
import type { Color } from "~/types/board"
import type { List, CreateList } from "~/types/list.ts"

export const useLists = () => {
    const lists = useState<List[]>('currentList')
    
    const addListToBoard = async (body: CreateList) => {
        const token = useCookie('token')
        const headers = { 'content-type': 'application/json', 'authorization': `Bearer ${token.value}` }
        const { data, error, execute } = useFetch('/api/lists', { headers, immediate: false, watch: false, method: 'post', body })
        await execute()
        if (error.value) {
            if(error.value.statusCode == 401){
                return await navigateTo('/auth/login')
            }
            return toast({
                title: error.value.data.message,
                variant: 'destructive'
            })
        }
        await useBoards().getBoardById(body.board_id)
    }

    const deleteList = async ({ id, board_id }: { id: string, board_id: string }) => {
        const token = useCookie('token')
        const headers = { 'content-type': 'application/json', 'authorization': `Bearer ${token.value}` }
        const { data, error, execute } = useFetch('/api/lists/' + id, { immediate: false, headers, watch: false, method: 'delete' })
        await execute()
        if (error.value) {
            if(error.value.statusCode == 401){
                return await navigateTo('/auth/login')
            }
            return toast({
                title: error.value.data.message,
                variant: 'destructive'
            })
        }
        await useBoards().getBoardById(board_id)
    }

    const addTask = async ({ title, color, description, list_id }: { title: string, color: Color, description: string, list_id: string }) => {
        const token = useCookie('token')
        const headers = { 'content-type': 'application/json', 'authorization': `Bearer ${token.value}` }
        const { data, error, execute } = useFetch(`/api/lists/${list_id}/tasks`, { headers, method: 'POST', immediate: false, watch: false, body: { title, color, description } })
        await execute()
        if (error.value) {
            if(error.value.statusCode == 401){
                return await navigateTo('/auth/login')
            }
            return toast({
                title: error.value.data.message,
                variant: 'destructive'
            })
        }
        await useBoards().getBoardById(useBoards().currentBoard.value.id)
    }

    const updateTask = async ({ id, list_id }: { id: string, list_id: string }) => {
        const token = useCookie('token')
        const headers = { 'content-type': 'application/json', 'authorization': `Bearer ${token.value}` }
        const { data, error, execute } = useFetch(`/api/lists/${list_id}/tasks/${id}`, { headers, method: 'PATCH', immediate: false, watch: false })
        await execute()
        if (error.value) {
            if(error.value.statusCode == 401){
                return await navigateTo('/auth/login')
            }
            return toast({
                title: error.value.data.message,
                variant: 'destructive'
            })
        }
    }

    return { lists, addListToBoard, deleteList, addTask,updateTask }
} 