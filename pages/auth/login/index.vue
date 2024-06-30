<script setup lang="ts">
import { ClipboardList, Loader2 } from 'lucide-vue-next';
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

definePageMeta({ layout: 'auth' })

const { authenticateUser } = useAuth()

const formSchema = toTypedSchema(z.object({
    email: z.string().email("Digite um e-mail válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres")
}))

const loading = ref(false)

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
    loading.value = true
    await authenticateUser(values)
    loading.value = false
})

const disabledButton = computed(() => {
    return true ? !form.values.email || loading.value || !form.values.password || form.values.password.length < 6 || !(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/.test(form.values.email)) : false
})



</script>
<template>
    <div class="flex flex-col md:flex-row justify-center items-center h-full w-full">
        <div class="w-full flex flex-col items-center justify-center h-full md:w-[55%]">
            <form @submit.prevent="onSubmit" class="w-[320px] h-[400px]">
                <h1 class="text-3xl mb-6">Login</h1>
                <FormField v-slot="{ componentField }" name="email">
                    <FormLabel>E-mail</FormLabel>
                    <FormItem>
                        <FormControl>
                            <Input class="h-12 mt-1" type="text" placeholder="rodrigo@teste.com"
                                v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="password">
                    <FormLabel>Senha</FormLabel>
                    <FormItem class="">
                        <FormControl>
                            <Input class="h-12 mt-1" type="password" placeholder="Insira sua senha..."
                                v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <Button type="submit" class="mt-2 w-full" :disabled="disabledButton"
                    :class="disabledButton ? 'disabled:cursor-not-allowed' : ''">
                    <Loader2 v-if="loading" class="animate-spin" />
                    {{ !loading ? 'Entrar' : undefined }}
                </Button>
            </form>
        </div>
        <div
            class="hidden justify-center items-center bg-primary h-full md:rounded-bl-[18rem] md:flex md:w-[45%] gap-4">
            <ClipboardList class="w-12 h-12 text-yellow-400" />
            <h1 class="text-5xl">Task Manager</h1>
        </div>
    </div>
</template>


<style></style>