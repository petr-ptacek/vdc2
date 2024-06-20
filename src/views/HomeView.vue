<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <div class="h-screen w-full flex flex-col">
    <AppHeader class="bg-green-500 basis-[60px]" />
    <div class="flex-1 bg-yellow-500">
      <main class="container mx-auto">
        <button class="text-yellow">faf</button>
      </main>
    </div>
    <AppFooter class="bg-red-500" />
  </div>
</template>
