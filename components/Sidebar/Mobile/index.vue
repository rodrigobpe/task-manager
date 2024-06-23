<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const route = useRoute()
const { sidebarMenuItems } = useSidebar()
const routeActive = computed(() => {
    return route.name?.toString().includes('boards') ? '/boards' : route.fullPath
})

</script>
<template>
    <Sheet>
        <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="shrink-0 md:hidden">
                <Menu class="h-5 w-5" />
                <span class="sr-only">Toggle navigation menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" class="flex flex-col">
            <div class="flex h-14 items-center px-4 lg:h-[60px] lg:p-6">
                <RouterLink to="/" class="flex items-center text-foreground font-semibold">
                    <span class="text-2xl text-primary dark:text-primary">Task Manager</span>
                </RouterLink>
            </div>
            <nav class="grid items-start px-2 text-md text-foreground font-medium lg:px-4">
                <RouterLink v-for="item of sidebarMenuItems" :to="item.path"
                    class="flex items-center gap-3 rounded-lg p-3 mb-2 transition-all text-muted-foreground hover:text-foreground"
                    :class="[routeActive === item.path ? 'bg-primary text-popover dark:text-popover-foreground dark:bg-muted hover:text-popover dark:hover:text-foreground' : '']">
                    <component :is="item.icon" />
                    {{ item.name }}
                </RouterLink>
                <div>

                </div>
            </nav>
                <div class="mt-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upgrade to Pro</CardTitle>
                            <CardDescription>
                                Unlock all features and get unlimited access to our
                                support team.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button size="sm" class="w-full">
                                Upgrade
                            </Button>
                        </CardContent>
                    </Card>
                </div>
        </SheetContent>
    </Sheet>
</template>

<style></style>