<script setup lang="ts">
import type { Task } from '~/types/task';
import { Text, FlagIcon, MessageSquareMore, Paperclip } from 'lucide-vue-next'

interface Props {
    task: Task;
}

const { task } = defineProps<Props>()

</script>

<template>
    <Dialog>
        <DialogTrigger asChild>
            <div
                class="flex flex-col mr-2 my-1 max-w-full rounded-xl p-3 bg-muted cursor-grab ring-primary hover:ring-2">
                <h1 class="mt-2 break-words font-bold">{{ task.title }}</h1>
                <div class="w-full mt-2 max-w-full text-xs flex flex-wrap gap-2">
                    <span class="flex rounded-md  text-red-500 py-1 px-2 bg-red-100">BI</span>
                    <span class="flex rounded-md text-blue-500 py-1 px-2 bg-blue-100">Mídia</span>
                    <span class="flex rounded-md  text-green-500 py-1 px-2 bg-green-100">CS</span>
                    <span class="flex rounded-md  text-yellow-500 py-1 px-2 bg-yellow-100">Operações</span>
                </div>
                <div class="mt-2 text-sm flex gap-2 flex-col items-start">
                    <Text />
                    {{ task.description }}
                </div>
                <div class="flex items-center justify-between gap-2 mt-2">
                    <div class="flex items-center gap-1">
                        <FlagIcon class="h-4 w-4 text-red-500" />
                        <p class="text-muted-foreground text-sm">21/10/2002</p>
                    </div>
                </div>
                <div class="flex mt-2">
                    <span class="flex h-7 w-7 bg-background rounded-full ring-1 ring-foreground"></span>
                    <span v-for="i in 2" :key="i"
                        class="flex h-7 w-7 bg-background rounded-full ring-1 ring-foreground relative"
                        :style="{ right: `${0.6 * i}rem` }"></span>
                </div>
                <div class="flex mt-3 items-center text-xs gap-2">
                    <div class="flex gap-1 items-center">
                        <MessageSquareMore class="w-4 h-4" />
                        12 comentários
                    </div>
                    <div class="flex gap-1 items-center">
                        <Paperclip class="w-4 h-4" />
                        12 arquivos
                    </div>
                </div>
            </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            {{ task.description }}
        </DialogContent>
    </Dialog>
</template>


<style></style>