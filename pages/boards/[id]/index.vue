<script setup lang="ts">
import { CirclePlus, ListFilter } from 'lucide-vue-next';
import { Icon } from '@iconify/vue'

definePageMeta({ middleware: ['guards'] })

const { columns, addColumn, deleteColumn } = useColumns()
const { getBoardById, currentBoard, updateBoard } = useBoards()

onBeforeMount(async () => await getBoardById(String(useRoute().params?.id)))

</script>
<template>
    <div class="flex-col hidden w-full md:flex">
        <div class="flex w-full h-[60px] bg-background items-center justify-end gap-4 px-6 py-2">
            <BoardSwitchColor :board="currentBoard"/>
            <Icon class="h-6 w-6 transition-all cursor-pointer hover:scale-110 hover:text-yellow-300"
                @click="updateBoard({ id: currentBoard?.id, is_favorite: !currentBoard?.is_favorite })"
                :class="currentBoard?.is_favorite ? 'text-yellow-300' : ''"
                :icon="currentBoard?.is_favorite ? 'radix-icons:star-filled' : 'radix-icons:star'" />
            <ListFilter class="transition-all cursor-pointer hover:scale-110 hover:text-blue-400" />
        </div>
        <div class=" gap-4 md:flex md:items-start p-4">
                <!-- <BoardColumn v-for="column in columns" :column="column" :tasks="tasks" :key="column.id"
                @delete:column="deleteColumn(column.id)" /> -->
                <button @click="addColumn()"
                    class="h-[60px] text-foreground flex gap-4 w-80 cursor-pointer rounded-xl bg-background border-2 border-muted p-4 ring-primary hover:ring-2">
                    <CirclePlus />
                    Adicionar
                </button>

        </div>
    </div>

</template>
