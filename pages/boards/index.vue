<script setup lang="ts">
import { CirclePlus } from 'lucide-vue-next';
import { Loader2 } from 'lucide-vue-next';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import type { Color } from '~/types/board';

definePageMeta({ middleware: ['guards'] })
const { boards, getAllByOwner,addNewBoard, favoritesBoards, loading } = useBoards()

const colors = ref<Color[]>(['amber', 'blue', 'cyan', 'emerald', 'fuchsia', 'gray', 'green', 'indigo', 'lime', 'neutral', 'orange', 'pink', 'purple', 'red', 'rose', 'sky', 'slate', 'stone', 'teal', 'violet', 'yellow', 'zinc'])

const { colorVariants } = useColorsVariants()

onMounted(() => getAllByOwner())

const formSchema = toTypedSchema(z.object({
    name: z.string({ required_error: "Insira um nome" }),
    color:z.any()
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {    
    await addNewBoard({ color:values.color, name:values.name })
    form.values.name = undefined;
})

const disabledButton = computed(() => {
    return true ? !form.values.name : false
})

</script>
<template>
    <div v-if="!loading" class="h-full w-full flex-col p-4 gap-8 hidden md:flex md:justify-start">
        <Dialog>
            <DialogTrigger as-child>
                <button
                    class="h-[60px] text-foreground flex gap-4 min-w-80 w-80 cursor-pointer rounded-2xl bg-background border-2 border-muted p-4 ring-primary hover:ring-2">
                    <CirclePlus />
                    Adicionar board
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle class="text-3xl">Adicionar novo Board</DialogTitle>
                </DialogHeader>
                <form @submit.prevent="onSubmit">
                    <FormField v-slot="{ componentField }" name="name">
                        <FormLabel>Nome do board</FormLabel>
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
                        <FormItem>
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
                                                <span class="flex h-3 w-3 rounded-full" :class="colorVariants[color]"></span>
                                                <p class="capitalize">{{ color }}</p>
                                            </div>
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
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
        <h1 v-if="favoritesBoards.length > 0" class="text-2xl ml-2">Boards favoritos</h1>
        <div v-if="favoritesBoards.length > 0" class="flex flex-wrap gap-4">
            <Board v-for="board in favoritesBoards" :key="board.id" :board="board" />
        </div>
        <h1 class="text-2xl ml-2">Todos seus boards</h1>
        <div class="flex flex-wrap gap-4">
            <Board v-for="board in boards" :key="board.id" :board="board" />
        </div>
    </div>
    <div class="h-full w-full flex justify-center items-center" v-if="loading">
        <Loader2 class="animate-spin" />
    </div>
</template>
