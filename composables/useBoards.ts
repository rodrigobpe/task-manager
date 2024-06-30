import type { Board, Color } from "~/types/board"

export const useBoards = () => {
    const boards = useState<Board[]>('boards')
    const loading = ref(false)
    const currentBoard = useState<Board>('currentBoard')
    const token = useCookie('token')
    const headers = { 'content-type': 'application/json', 'authorization': `Bearer ${token.value}` }

    const getAllByOwner = async () => {
        loading.value = true
        const { data, error, refresh, execute } = useFetch('/api/me', { headers, immediate: false, watch: false })
        await execute()
        boards.value = data.value.data.boards
        console.log(boards.value);
        
        loading.value = false
    }

    const favoritesBoards = computed(() => { return boards.value?.length > 0 ? boards.value.filter((board) => { return board.is_favorite }) : [] })

    const getBoardById = async (id: string) => {
        loading.value = true
        const { data, error, execute } = useFetch(`/api/boards/${id}`, { headers, immediate: false, watch: false })
        await execute()
        currentBoard.value = data.value.data
        useLists().lists.value = data.value.data.lists
        loading.value = false

    }

    const updateBoard = async ({ id, name, is_favorite, color }: { id: string, name?: string, is_favorite?: boolean, color?: string }) => {
        loading.value = true
        const { data, error, execute } = useFetch(`/api/boards/${id}`, { headers, immediate: false, watch: false, method: 'PATCH', body: { id, name, is_favorite, color } })
        await execute()
        currentBoard.value = data.value.data
        loading.value = false
    }

    return { boards, getAllByOwner, getBoardById, updateBoard, favoritesBoards, currentBoard, loading }
}