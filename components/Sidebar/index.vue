<script setup lang="ts">

const { sidebarMenuItems } = useSidebar()
const route = useRoute()

const routeActive = computed(() => {
    return route.name?.toString().includes('boards') ? '/boards' : route.fullPath
})


</script>
<template>
    <div class="border-r fixed h-screen z-30 hidden bg-popover md:block">
        <div class="flex h-full lg:w-[260px] md:w-[220px] max-h-screen flex-col gap-2">
            <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:p-6">
                <RouterLink to="/" class="flex items-center text-foreground font-semibold">
                    <span class="text-2xl text-primary">Task Manager</span>
                </RouterLink>
            </div>
            <div class="flex-1">
                <nav class="grid items-start px-2 text-md font-medium lg:px-4">
                    <RouterLink v-for="item of sidebarMenuItems" :to="item.path"
                        class="flex items-center gap-3 rounded-lg p-3 mb-2 transition-all text-muted-foreground hover:text-foreground"
                        :class="[routeActive === item.path ? 'bg-primary text-popover dark:text-popover-foreground dark:bg-muted hover:text-popover dark:hover:text-foreground' : '']">
                        <component :is="item.icon" />
                        {{ item.name }}
                    </RouterLink>
                </nav>
            </div>
            <div class="mt-auto p-4">
                <Card>
                    <CardHeader class="p-2 pt-0 md:p-4">
                        <CardTitle>Upgrade to Pro</CardTitle>
                        <CardDescription>
                            Unlock all features and get unlimited access to our support
                            team.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    </div>
</template>

<style></style>