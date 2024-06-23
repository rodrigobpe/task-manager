<script setup lang="ts">
import { StarIcon } from 'lucide-vue-next';
import type { Board } from '~/types/board';

interface Props {
    board: Board
}

const isFavorite = ref(false)
const { board } = defineProps<Props>()

const { colorVariants } = useColorsVariants()


</script>
<template>
    <RouterLink :to="'/boards/'+board.id"
        class="flex flex-col cursor-pointer justify-between p-4 rounded-xl border-2 text-popover border-background h-48 w-full md:w-[254px] xl:w-[311px]"
        :class="board.color ? colorVariants[board.color] : ''">

        <h1 class="break-words text-xl font-bold">#{{ board.id }} - {{ board.title }}</h1>

        <div class="flex justify-end">
            <StarIcon
                :class="[board.color === 'yellow' && isFavorite ? 'text-yellow-600' : '', board.color !== 'yellow' && isFavorite ? 'text-yellow-400' : '']" />
        </div>
    </RouterLink>
</template>


<style lang="scss"></style>