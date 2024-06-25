<script setup lang="ts">
import { CirclePlus } from 'lucide-vue-next';

const { columns, addColumn, deleteColumn } = useColumns()
const { getBoardById } = useBoards()

const tasks = ref([
    { id: 1, title: 'Teste 1', description: 'Teste eu manjo' },
    { id: 2, title: 'Teste 2', description: 'Teste eu manjo' },
    { id: 3, title: 'Teste 3', description: 'Teste eu manjo' },
    { id: 4, title: 'Teste 4', description: 'Teste eu manjo' },
    { id: 5, title: 'Teste 5', description: 'Teste eu manjo dessa porra e é isso ai galerinha do iutubi, quero que vocês se inscrevam no canal e deixem o laiki' },
])



</script>
<template>
    <div class="flex-col hidden w-full md:flex">
        <div class="flex w-full h-[60px] bg-background items-center px-6 py-2">
            <!-- <h1>{{ getBoardById(useRoute().params.id.toString())[0].title }}</h1> -->
        </div>
        <div class="gap-4 md:flex md:items-start p-4">
            <BoardColumn v-for="column in columns" :column="column" :tasks="tasks" :key="column.id"
                @delete:column="deleteColumn(column.id)" />
            <button @click="addColumn()"
                class="h-[60px] text-foreground flex gap-4 w-80 cursor-pointer rounded-xl bg-background border-2 border-muted p-4 ring-primary hover:ring-2">
                <CirclePlus />
                Adicionar
            </button>

        </div>
    </div>

</template>
