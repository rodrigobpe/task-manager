<script setup lang="ts">
import { Paintbrush } from 'lucide-vue-next'
import type { Board, Color } from '~/types/board';

const colors = ref<Color[]>(['amber', 'blue', 'cyan', 'emerald', 'fuchsia', 'gray', 'green', 'indigo', 'lime', 'neutral', 'orange', 'pink', 'purple', 'red', 'rose', 'sky', 'slate', 'stone', 'teal', 'violet', 'yellow', 'zinc'])
const { colorVariants,colorVariantsTextHover } = useColorsVariants()
const { updateBoard } = useBoards()

interface Props {
    board: Board
}

const { board } = defineProps<Props>()

</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Paintbrush class="transition-all cursor-pointer hover:scale-110" :class="colorVariantsTextHover[board?.color]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="max-h-52 overflow-y-auto">
            <DropdownMenuItem @click="updateBoard({id: board.id,color})" v-for="color in colors" class="gap-2">
                <span class="flex h-3 w-3 rounded-full" :class="colorVariants[color]"></span>
                <p class="capitalize">{{ color }}</p>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<style></style>