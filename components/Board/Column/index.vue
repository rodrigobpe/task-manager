<script setup lang="ts">
import type { Column } from '../../../types/column.ts'
import { Trash2Icon, Plus } from 'lucide-vue-next';
import draggable from 'vuedraggable'

interface Props {
    column: Column;
    tasks: { id: number, title: string, description: string }[]
}

const { column } = defineProps<Props>()
const emit = defineEmits(['delete:column'])

const change = (e: any) => {
    console.log(e);

}

</script>

<template>
    <div class="flex flex-col bg-background rounded-xl w-80 min-w-80">
        <div class="flex justify-between h-[60px] p-4 gap-2 text-md font-bold items-center">
            <div class="flex gap-2 items-baseline">
                <span class="flex bg-muted px-2 py-1 text-sm rounded-full">{{ tasks.length }}</span>
                <p class="truncate  max-w-44">{{ column.title }}</p>
            </div>
            <Trash2Icon @click="emit('delete:column')"
                class="text-foreground p-2 h-8 w-8 rounded-full hover:bg-destructive hover:text-white cursor-pointer" />
        </div>
        <draggable :list="tasks" item-key="id" group="list" drag-class="dragging-card" v-if="tasks"
            :scroll-sensitivity="500" :force-fallback="true" ghost-class="task-ghost" @change="change"
            class="flex pl-3 min-h-[calc(100vh-280px)] max-h-[calc(100vh-280px)] flex-col mt-2 gap-1 overflow-x-hidden overflow-y-scroll">
            <template #item="{ element: task }">
                <div>
                    <BoardTask :task="task" />
                </div>
            </template>
        </draggable>
        <div class="flex justify-center items-end p-3 w-full">
            <button
                class="flex items-center w-full p-2 gap-1 h-[40px] rounded-md transition-all hover:bg-primary hover:text-white text-foreground ">
                <Plus class="h-5 w-5" />
                Adicionar nova tarefa
            </button>
        </div>
    </div>
</template>


<style>
.task-ghost {
    @apply !bg-muted rounded-lg
}

.task-ghost>div {
    @apply invisible;
}

.dragging-card {
    @apply transform rotate-2 shadow-xl !cursor-grabbing;
}
</style>