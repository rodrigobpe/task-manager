import { toast } from "~/components/ui/toast"
import type { Board, Color, AddBoard } from "~/types/board"

export const useBoards = () => {
    const boards = useState<Board[]>('boards')
    const loading = ref(false)
    const currentBoard = useState<Board>('currentBoard')

    const getAllByOwner = async () => {
        loading.value = true
        const token = useCookie('token')
        const headers = { 'content-type': 'application/json', 'authorization': `Bearer ${token.value}` }
        const { data, error, refresh, execute } = useFetch('/api/me', { headers, immediate: false, watch: false })
        await execute()
        if (error.value) {
            if (error.value.statusCode == 401) {
                return await navigateTo('/auth/login')
            }
            return toast({
                title: error.value.data.message,
                variant: 'destructive'
            })
        }

        boards.value = data.value.data.boards
        loading.value = false
    }

    const favoritesBoards = computed(() => { return boards.value?.length > 0 ? boards.value.filter((board) => { return board.is_favorite }) : [] })

    const getBoardById = async (id: string) => {
        loading.value = true
        const token = useCookie('token')
        const headers = { 'content-type': 'application/json', 'authorization': `Bearer ${token.value}` }
        const { data, error, execute } = useFetch(`/api/boards/${id}`, { headers, immediate: false, watch: false })
        await execute()
        if (error.value) {
            if (error.value.statusCode == 401) {
                return await navigateTo('/auth/login')
            }
            return toast({
                title: error.value.data.message,
                variant: 'destructive'
            })
        }
        currentBoard.value = data.value.data
        useLists().lists.value = data.value.data.lists
        loading.value = false

    }

    const updateBoard = async ({ id, name, is_favorite, color }: { id: string, name?: string, is_favorite?: boolean, color?: string }) => {
        const token = useCookie('token')
        const headers = { 'content-type': 'application/json', 'authorization': `Bearer ${token.value}` }
        const { data, error, execute } = useFetch(`/api/boards/${id}`, { headers, immediate: false, watch: false, method: 'PATCH', body: { id, name, is_favorite, color } })
        await execute()
        if (error.value) {
            if (error.value.statusCode == 401) {
                return await navigateTo('/auth/login')
            }
            return toast({
                title: error.value.data.message,
                variant: 'destructive'
            })
        }
        currentBoard.value = data.value.data
    }

    const addNewBoard = async ({ name, color }: AddBoard) => {
        loading.value = true
        const token = useCookie('token')
        const headers = { 'content-type': 'application/json', 'authorization': `Bearer ${token.value}` }
        const { data, error, execute } = useFetch(`/api/boards`, { headers, immediate: false, watch: false, method: 'POST', body: { name, color } })
        await execute()
        if (error.value) {
            if (error.value.statusCode == 401) {
                return await navigateTo('/auth/login')
            }
            return toast({
                title: error.value.data.message,
                variant: 'destructive'
            })
        }
        await getAllByOwner()
        loading.value = false
    }

    return { boards, getAllByOwner, getBoardById, updateBoard, addNewBoard, favoritesBoards, currentBoard, loading }
}