<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import type { List } from '../../../types/list.ts'
import { Trash2Icon, Plus } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import draggable from 'vuedraggable'
import { z } from 'zod';
import type { Color } from '~/types/board.js';
import type { Task } from '~/types/task.js';

interface Props {
    list: List;
    tasks?: Task[]
}

const { list } = defineProps<Props>()
const emit = defineEmits(['delete:list'])

const { loading } = useBoards()
const { addTask, updateTask } = useLists()

const colors = ref<Color[]>(['amber', 'blue', 'cyan', 'emerald', 'fuchsia', 'gray', 'green', 'indigo', 'lime', 'neutral', 'orange', 'pink', 'purple', 'red', 'rose', 'sky', 'slate', 'stone', 'teal', 'violet', 'yellow', 'zinc'])

const { colorVariants } = useColorsVariants()

const formSchema = toTypedSchema(z.object({
    title: z.string({ required_error: "Insira um nome" }),
    color: z.any(),
    description: z.string({ required_error: "Digite alguma descrição" })
}))

const form = useForm({
    validationSchema: formSchema,
})


const disabledButton = computed(() => {
    return true ? !form.values.title || !form.values.color || !form.values.description : false
})

const onSubmit = form.handleSubmit(async (values) => {
    const { description, title, color } = values
    await addTask({ title, color, description, list_id: list.id })
})

onMounted(() => {
    console.log(list);

})

const change = async(e: any) => {
    if (e.added) {
        const { element: task } = e.added
        await updateTask({ id: task.id, list_id: list.id })
    }
}


</script>

<template>
    <div class="flex flex-col bg-background rounded-xl w-80 min-w-80 h-full justify-between">
        <div class="flex justify-between h-[60px] p-4 gap-2 text-md font-bold items-center">
            <div class="flex gap-2 items-baseline">
                <span class="flex bg-muted px-2 py-1 text-sm rounded-full">{{ !tasks?.length ? 0 : tasks.length
                    }}</span>
                <p class="truncate  max-w-44">{{ list.name }}</p>
            </div>
            <Trash2Icon @click="emit('delete:list')"
                class="text-foreground p-2 h-8 w-8 rounded-full hover:bg-destructive hover:text-white cursor-pointer" />
        </div>
        <draggable :list="tasks" item-key="id" group="list" drag-class="dragging-card" :scroll-sensitivity="500"
            :force-fallback="true" ghost-class="task-ghost" @change="change"
            class="flex pl-3 min-h-[calc(100vh-296px)] max-h-[calc(100vh-280px)] flex-col mt-2 gap-1 overflow-x-hidden overflow-y-scroll">
            <template #item="{ element: task }">
                <div>
                    <BoardTask :task="task" :key="task.id" />
                </div>
            </template>
        </draggable>
        <div class="flex justify-center items-end p-3 w-full">
            <Dialog class="max-h-[600px]">
                <DialogTrigger as-child>
                    <button
                        class="flex items-center w-full p-2 gap-1 h-[40px] rounded-md transition-all hover:bg-primary hover:text-white text-foreground ">
                        <Plus class="h-5 w-5" />
                        Adicionar nova tarefa
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle class="text-3xl">Adicionar nova Tarefa</DialogTitle>
                    </DialogHeader>
                    <form @submit.prevent="onSubmit">
                        <FormField v-slot="{ componentField }" name="title">
                            <FormLabel>Nome da tarefa</FormLabel>
                            <FormItem>
                                <FormControl>
                                    <Input class="h-12 mt-1" type="text" placeholder="Minhas finanças"
                                        v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="color">
                            <FormLabel>Selecione uma cor</FormLabel>
                            <FormItem class="mt-1">
                                <Select v-bind="componentField">
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem class="flex" v-for="color in colors" :value="color">
                                                <div class="flex gap-4 p-2 items-center">
                                                    <span class="flex h-3 w-3 rounded-full"
                                                        :class="colorVariants[color]"></span>
                                                    <p class="capitalize">{{ color }}</p>
                                                </div>
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="description">
                            <FormLabel>Descrição</FormLabel>
                            <FormItem class="mt-1">
                                <FormControl>
                                    <Textarea class="h-12 max-h-30" type="text" placeholder="bla bla bla..."
                                        v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <DialogClose as-child>
                            <Button type="submit" class="mt-2 w-full" :disabled="disabledButton"
                                :class="disabledButton ? 'disabled:cursor-not-allowed' : ''">
                                <Loader2 v-if="loading" class="animate-spin" />
                                {{ !loading ? 'Adicionar' : undefined }}
                            </Button>
                        </DialogClose>
                    </form>
                </DialogContent>
            </Dialog>
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