<script setup lang="ts">
import { WCloseableContainer, WMultiselect } from "@/components";
import { ref, watchEffect }                  from "vue";

const value = ref("a");
const closed = ref(false);

</script>

<template>
	<div class="h-screen bg-brown-semi ">

		<button @click="closed = !closed">Toggle</button>

		<WCloseableContainer :closed>
			<p class="p-4">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut autem consequatur corporis cum cumque esse
				exercitationem explicabo inventore ipsa, laborum libero magnam magni nostrum, officia, provident quaerat qui quo
				recusandae. Consequuntur deserunt eius eligendi eveniet exercitationem id impedit magni maxime nisi optio quae
				quibusdam quod, rem repellat, reprehenderit sint, voluptatem?
			</p>
		</WCloseableContainer>
		<!--		<WMultiselect-->
		<!--			v-model="value"-->
		<!--			:config="{-->
		<!--				searchable:true,-->
		<!--				canClear: true,-->
		<!--				options: ['a', 'b', 'c', 'd']-->
		<!--			}"-->
		<!--			class="w-[400px]"-->
		<!--		>-->

		<!--		</WMultiselect>-->

		<!--		<div class="relative w-3/4 h-3/4 bg-yellow">-->
		<!--			<WDrawerContainer disable-resizer-line class="bg-primary z-20 absolute left-0 top-0" dir="top-to-bottom">-->
		<!--				<div class="h-full"></div>-->
		<!--			</WDrawerContainer>-->

		<!--			<WDrawerContainer-->
		<!--				disable-resizer-line-->
		<!--				class="bg-tertiary text-white z-10 absolute left-0 top-0 bottom-0"-->
		<!--				dir="left-to-right">-->
		<!--				<div class="h-full">-->
		<!--					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dolor minima necessitatibus nisi quos-->
		<!--					repellendus.-->
		<!--				</div>-->
		<!--			</WDrawerContainer>-->

		<!--			<WDrawerContainer-->
		<!--				disable-resizer-line-->
		<!--				class="bg-secondary z-10 absolute right-0 top-0 bottom-0"-->
		<!--				dir="right-to-left">-->
		<!--				<div class="h-full"></div>-->
		<!--			</WDrawerContainer>-->
		<!--		</div>-->
	</div>
</template>
