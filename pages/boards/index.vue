<script setup lang="ts">
import { CirclePlus } from 'lucide-vue-next';

const { columns, addColumn, deleteColumn } = useColumns()
const { boards,addNewBoard } = useBoards()

const hasBoardsFavorits = ref(false)

</script>
<template>
    <div class="h-full w-full flex-col gap-8 hidden md:flex md:justify-start">
        <button
            @click="addNewBoard()"
            class="h-[60px] text-foreground flex gap-4 min-w-80 w-80 cursor-pointer rounded-2xl bg-background border-2 border-muted p-4 ring-primary hover:ring-2">
            <CirclePlus />
            Adicionar Board
        </button>
        <h1 v-if="hasBoardsFavorits" class="text-2xl ml-[2px]">Boards favoritos</h1>
        <div v-if="hasBoardsFavorits" class="flex flex-wrap gap-4">

        </div>
        <h1 class="text-2xl ml-[2px]">Todos seus boards</h1>
        <div class="flex flex-wrap gap-4">
            <Board v-for="board in boards" :key="board.id" :board="board" />
        </div>
    </div>
</template>
