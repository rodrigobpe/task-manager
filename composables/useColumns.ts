import type { Column } from "~/types/column"

export const useColumns = () => {
    const columns = ref<Column[]>([{id:'1',title:'Teste'},{id:'2',title:'teste 2'}])

    const deleteColumn = (id:string) => {
        const filteredColumns = columns.value.filter(column => {
            return column.id !== id
        })

        columns.value = filteredColumns
    }

    const addColumn = () => {
        const id = Math.floor(Math.random() * 1000)
        columns.value.push({id:`${id}`,title:`teste ${id}`})
    }

    return { columns,deleteColumn,addColumn }
} 