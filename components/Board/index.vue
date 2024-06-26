<script setup lang="ts">
import { StarIcon } from 'lucide-vue-next';
import { Icon } from '@iconify/vue'
import type { Board } from '~/types/board';

interface Props {
    board: Board
}

const { board } = defineProps<Props>()
const { colorVariants } = useColorsVariants()


</script>
<template>
    <RouterLink :to="'/boards/'+board.id"
        class="flex flex-col cursor-pointer justify-between p-4 rounded-xl border-2 text-popover border-background h-48 w-full md:w-[254px] xl:w-[311px]"
        :class="board.color ? colorVariants[board.color] : ''">

        <h1 class="break-words text-xl font-bold">{{ board.name }}</h1>

        <div class="flex justify-end">
            <Icon
                :icon="board.is_favorite ? 'radix-icons:star-filled' : 'radix-icons:star'"
                class="h-6 w-6"
                :class="[board.color === 'yellow' && board.is_favorite ? 'text-yellow-600' : '', board.color !== 'yellow' && board.is_favorite ? 'text-yellow-400' : '']" />
        </div>
    </RouterLink>
</template>


<style lang="scss"></style>