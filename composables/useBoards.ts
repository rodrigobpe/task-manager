import type { Board, Color } from "~/types/board"

export const useBoards = () => {
    const id = ref(2);
    const boards = ref<Board[]>([
        { id: '1', color: "rose", title: "Board teste 1" }
    ])

    const addNewBoard = () => {
        const listColor: Color[] = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
        const color: Color = listColor[Math.floor(Math.random() * 22)]

        boards.value.push({ id: `${id.value}`, color, title: `Board teste ${id.value}` })
        id.value++
    }


    return { boards, addNewBoard }
}