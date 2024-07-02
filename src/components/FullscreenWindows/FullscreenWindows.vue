<script setup lang="ts">
import ExcerptDetail from "@/components/FullscreenWindows/windows/ExcerptDetail/ExcerptDetail.vue";
import AIHelp        from "@/components/FullscreenWindows/windows/AIHelp.vue";
</script>

<template>
	<teleport to="body">
		<AIHelp />
		<ExcerptDetail  />
	</teleport>
</template>
