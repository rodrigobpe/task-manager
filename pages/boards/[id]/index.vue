<script setup lang="ts">
import { CirclePlus } from 'lucide-vue-next';

const { columns, addColumn, deleteColumn } = useColumns()

onMounted(()=> (console.log(useRoute().params.id)))

definePageMeta({ layout: 'board' })

const tasks = ref([
    { id: 1, title: 'Teste 1', description: 'Teste eu manjo' },
    { id: 2, title: 'Teste 2', description: 'Teste eu manjo' },
    { id: 3, title: 'Teste 3', description: 'Teste eu manjo' },
    { id: 4, title: 'Teste 4', description: 'Teste eu manjo' },
    { id: 5, title: 'Teste 5', description: 'Teste eu manjo dessa porra e é isso ai galerinha do iutubi, quero que vocês se inscrevam no canal e deixem o laiki' },
])

</script>
<template>
    <div class="gap-4 hidden md:flex md:items-start">
        <BoardColumn v-for="column in columns" :column="column" :tasks="tasks" :key="column.id"
            @delete:column="deleteColumn(column.id)" />
        <button @click="addColumn()"
            class="h-[60px] text-foreground flex gap-4 w-80 cursor-pointer rounded-xl bg-background border-2 border-muted p-4 ring-primary hover:ring-2">
            <CirclePlus />
            Adicionar
        </button>

    </div>

</template>
