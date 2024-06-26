<script setup lang="ts">
import { CircleUser, Search } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Icon } from '@iconify/vue'

const { changeTheme, iconTheme } = useTheme()
const { currentBoard } = useBoards()

const titleRoute = computed(() => {
    const route = useRoute()
    if (route.fullPath?.toString().includes('/boards/') && route.params.id) return currentBoard.value?.name
    return route.name === 'index' ? 'Dashboard' : route.name
})


</script>

<template>
    <header
        class="flex fixed w-screen md:w-[calc(100vw-220px)] lg:w-[calc(100vw-260px)] h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
        <SidebarMobile />
        <div class="w-full flex items-center justify-center md:justify-between">
            <h1 class="text-lg hidden md:block capitalize text-foreground font-semibold md:text-2xl">
                {{ titleRoute }}
            </h1>
            <form class="w-full md:w-96">
                <div class="relative flex">
                    <Search class="mt-3 relative left-6 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search products..."
                        class="search bg-muted pl-8 shadow-none md:w-full" />
                </div>
            </form>
        </div>
        <Button @click="changeTheme()" variant="secondary" class="rounded-full h-[40px] w-[40px] p-2">
            <Icon :icon="iconTheme" class="h-[1.2rem] w-[1.2rem]"
                :class="[iconTheme === 'radix-icons:moon' ? 'rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' : 'rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100']" />
            <span class="sr-only">Toggle theme</span>
        </Button>
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="secondary" class="rounded-full h-[40px] w-[40px] p-2">
                    <CircleUser class="h-[1.2rem] w-[1.2rem]" />
                    <span class="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </header>
</template>
<style>
[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg class='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18 17.94 6M18 18 6.06 6'/%3E%3C/svg%3E%0A");
    background-color: hsl(var(--foreground));
    height: 20px;
    width: 20px;
    cursor: pointer;
    transition: background-color 0.35s ease;
}
</style>