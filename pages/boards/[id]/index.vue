<script setup lang="ts">
import { CirclePlus, ListFilter, Loader2, UserPlus } from 'lucide-vue-next';
import { Icon } from '@iconify/vue'
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';

definePageMeta({ middleware: ['guards'] })

const { lists, addListToBoard, deleteList } = useLists()
const { getBoardById, currentBoard, updateBoard, loading } = useBoards()

onBeforeMount(async () => await getBoardById(String(useRoute().params?.id)))

const formSchema = toTypedSchema(z.object({
    name: z.string(),
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
    await addListToBoard({ board_id: String(useRoute().params?.id), name: values.name, position: lists.value.length + 1 })
    form.values.name = undefined;

})

const disabledButton = computed(() => {
    return true ? !form.values.name : false
})
</script>
<template>
    <div class="flex-col hidden w-full max-w-full md:flex">
        <div class="flex w-full h-[60px] bg-background items-center justify-between px-4 py-2">
            <div>
                <Dialog>
                    <DialogTrigger as-child>
                        <button v-if="!loading" class="text-white flex gap-2 cursor-pointer rounded-xl bg-primary p-2">
                            <CirclePlus />
                            Adicionar lista
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle class="text-3xl">Crie uma nova coluna</DialogTitle>
                        </DialogHeader>
                        <form @submit.prevent="onSubmit">
                            <FormField v-slot="{ componentField }" name="name">
                                <FormLabel>Nome da coluna</FormLabel>
                                <FormItem>
                                    <FormControl>
                                        <Input class="h-12 mt-1" type="text" placeholder="Respondeu..."
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
            <div class="flex gap-4">
                <UserPlus/>
                <BoardSwitchColor :board="currentBoard" />
                <Icon class="h-6 w-6 transition-all cursor-pointer hover:scale-110 hover:text-yellow-300"
                    @click="updateBoard({ id: currentBoard?.id, is_favorite: !currentBoard?.is_favorite })"
                    :class="currentBoard?.is_favorite ? 'text-yellow-300' : ''"
                    :icon="currentBoard?.is_favorite ? 'radix-icons:star-filled' : 'radix-icons:star'" />
                <ListFilter class="transition-all cursor-pointer hover:scale-110 hover:text-blue-400" />
            </div>
        </div>
        <div v-if="loading" class="flex h-full w-full justify-center items-center">
            <Loader2 class="animate-spin" />
        </div>
        <div v-if="!loading"
            class="gap-4 md:flex md:max-w-[calc(100vw-260px)] overflow-x-auto overflow-y-hidden md:items-start md:self-start p-4">
            <BoardList v-for="list in lists" :list="list" :key="list.id" :tasks="list.tasks" @delete:list="deleteList({id:list.id,board_id:String(useRoute().params?.id)})" />
        </div>
    </div>

</template>
