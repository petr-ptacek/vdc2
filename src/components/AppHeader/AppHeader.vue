<script setup lang="ts">
import HeaderBase              from "@/components/AppHeader/HeaderBase.vue";
import HeaderHome              from "@/components/AppHeader/HeaderHome.vue";
import type { AppHeaderProps } from "@/components/AppHeader/types";
import { computed }            from "vue";

const props = withDefaults(
	defineProps<AppHeaderProps>(),
	{
		type: "default"
	}
);

const _component = computed(() => {
	switch ( props.type ) {
		case "default":
			return HeaderBase;
		case "home":
			return HeaderHome;
	}
});
</script>

<template>
	<component :is="_component" />
</template>
