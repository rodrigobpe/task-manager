<script setup lang="ts">

</script>

<template>
  <div class="grid min-h-screen overflow-x-hidden w-full md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
    <span class="hidden md:block">
      <Sidebar />
    </span>
    <div class="flex flex-col bg-muted md:w-[calc(100vw-220px)] lg:w-[calc(100vw-260px)] w-screen">
      <span class="flex h-14">
        <NavHeader />
      </span>
      <main class="flex min-h-[calc(100vh-60px)] bg-muted overflow-x-auto p-3 lg:p-4">
        <slot/>
      </main>
    </div>
  </div>
</template>
<style></style>