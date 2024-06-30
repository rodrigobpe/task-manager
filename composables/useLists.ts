import { toast } from "~/components/ui/toast"
import type { List, CreateList } from "~/types/list.ts"

export const useLists = () => {
    const token = useCookie('token')
    const headers = { 'content-type': 'application/json', 'authorization': `Bearer ${token.value}` }
    const lists = useState<List[]>('currentList')

    const addListToBoard = async (body: CreateList) => {
        const { data, error, execute } = useFetch('/api/lists', { headers, immediate: false, watch: false, method: 'post', body })
        await execute()
        if (error.value) {
            return toast({
                title: error.value.data.message,
                variant: 'destructive'
            })
        }
        await useBoards().getBoardById(body.board_id)
    }

    const deleteList = async ({ id, board_id }: { id: string, board_id: string }) => {
        const { data, error, execute } = useFetch('/api/lists/' + id, { immediate: false, headers, watch: false, method: 'delete' })
        await execute()
        if (error.value) {
            return toast({
                title: error.value.data.message,
                variant: 'destructive'
            })
        }
        await useBoards().getBoardById(board_id)
    }

    return { lists, addListToBoard, deleteList }
} 