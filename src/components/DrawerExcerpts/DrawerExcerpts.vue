<script setup lang="ts">
import { DrawerContainer }     from "@/components";
import { FullscreenContainer } from "@/components/FullscreenContainer";
import { insertsList }         from "@/data/inserts";
import { eventBus }            from "@/eventBus/eventBus";
import { ref }                 from "vue";

const selectedInsert = ref<any>(null);
const _opened = ref(false);

function targetHandler(item: any) {
	eventBus.emit("target", item.latLng);
}

function detailHandler(item: any) {
	selectedInsert.value = item;
	_opened.value = true;
}
</script>

<template>
	<DrawerContainer
		class="bg-white"
		dir="right-to-left"
		size="500px"
	>
		<div class="h-full overflow-auto flex flex-col">
			<div class="px-2 py-3 pb-6 bg-brown-semi">
				<div class="form-field">
					<input type="text" class="px-3 py-2" placeholder="Hledej dle názvu ...">
				</div>
			</div>

			<ul class="flex-1 overflow-auto">
				<li
					v-for="item in insertsList" :key="item.id"
					class="border-b border-brown-inputBorder">
					<div class="flex flex-col">
						<div class="bg-brown-light py-2 px-4">
							<div class="flex items-center text-[1.4rem] font-bold">
								<div class="pr-6">
									{{ item.name }}
								</div>

								<div class="flex gap-4 ml-auto">
									<button class="btn btn--ico-only btn--secondary" @click="targetHandler(item)">
										<AppIcon name="map-pin" size="sm" />
									</button>

									<button class="btn btn--ico-only btn--secondary" @click="detailHandler(item)">
										<AppIcon name="document-text" size="sm" />
									</button>
								</div>
							</div>
						</div>
						<div class="py-4 px-4 flex flex-col gap-2 bg-white text-[1.2rem]">
							<div class="flex gap-2 items-center">
								<div class="font-semibold">Cestopis:</div>
								<div>{{ item.travelogue }}</div>
							</div>

							<div class="flex gap-2 items-center">
								<div class="font-semibold">Stav:</div>
								<div>{{ item.state }}</div>
							</div>

							<div class="flex gap-2">
								<div class="font-semibold">Témata:</div>
								<div class="flex gap-2 flex-wrap">
									<div
										v-for="tag in item.tags"
										:key="tag"
										class="bg-secondary text-nowrap whitespace-nowrap text-white text-[1rem] rounded-xl px-2 py-1.5 font-bold">
										{{ tag }}
									</div>
								</div>
							</div>

							<div class="flex gap-2 items-center">
								<div class="font-semibold">Poznámka:</div>
								<div>
									{{ item.note }}
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>

		</div>

		<teleport to="body">
			<FullscreenContainer v-if="_opened" opened @update:opened="_opened = false">
				<template #title>
					{{ selectedInsert.name }}
				</template>

				<div class="flex justify-center items-center h-full">
					<p>Detail úryvku ...</p>
				</div>
			</FullscreenContainer>
		</teleport>
	</DrawerContainer>
</template>
