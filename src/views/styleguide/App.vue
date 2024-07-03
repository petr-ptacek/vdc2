<script setup lang="ts">
import VSheet         from "./VSheet.vue";
import VueMultiselect from "@vueform/multiselect";
</script>

<template>
	<div class="h-screen bg-white">
		<div class="container mx-auto">
			<div class="py-20 grid grid-cols-2 gap-4">
				<VSheet>
					<div class="flex flex-col gap-4">
						<div class="text-xl">Accordion</div>

						<AppAccordion header-clickable>
							<template #title>
								Click at me
							</template>

							<div>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam earum id perspiciatis possimus quasi
								quia quo vero? Atque dolores, omnis.
							</div>
						</AppAccordion>
					</div>
				</VSheet>

				<VSheet>
					<div class="flex flex-col gap-4">
						<div class="text-xl">Buttons</div>

						<div class="flex flex-col gap-4">
							<button class="btn btn--primary">.btn .btn--primary</button>
							<button class="btn btn--secondary">.btn .btn--secondary</button>
							<button class="btn btn--tertiary">.btn .btn--tertiary</button>
							<button class="btn" disabled>.btn disabled</button>
						</div>
					</div>
				</VSheet>

				<VSheet>
					<div class="flex flex-col gap-4">
						<div class="text-xl">Input</div>

						<div class="flex flex-col gap-4">
							<div class="form-field">
								<input type="text" placeholder="Write something ...">
							</div>

							<div class="form-field is-correct">
								<input type="text" placeholder="Write something ...">
							</div>

							<div class="form-field is-wrong">
								<input type="text" placeholder="Write something ...">
							</div>

							<div class="form-field">
								<input disabled type="text" placeholder="Write something ...">
							</div>
						</div>
					</div>

				</VSheet>

				<VSheet>
					<div class="flex gap-4 flex-col">
						<div class="text-xl">Textarea</div>

						<div class="flex flex-col gap-4">
							<div class="form-field">
								<textarea type="text" placeholder="Write something ..." />
							</div>

							<div class="form-field is-correct">
								<textarea type="text" placeholder="Write something ..." />
							</div>

							<div class="form-field">
								<textarea disabled type="text" placeholder="Write something ..." />
							</div>
						</div>
					</div>
				</VSheet>

				<VSheet>
					<div class="flex gap-4 flex-col">
						<div class="text-xl">Selectbox</div>

						<div class="flex flex-col gap-4">
							<div class="form-field form-field--select">
								<select>
									<option value="Veroninka">Veronika</option>
									<option value="Lucie">Lucie</option>
								</select>
							</div>
						</div>
					</div>
				</VSheet>

				<VSheet>
					<div class="flex gap-4 flex-col">
						<div class="text-xl">Checkbox</div>

						<div class="flex flex-col gap-4">
							<label class="form-field">
								<input type="checkbox" />
								<span class="label-checkbox">Yes</span>
							</label>
						</div>
					</div>
				</VSheet>


				<VSheet>
					<div class="flex gap-4 flex-col">
						<div class="text-xl">Radiobutton</div>

						<div class="flex flex-col gap-4">
							<label class="form-field">
								<input type="radio" name="_aaa" />
								<span class="label-checkbox">Yes</span>
							</label>

							<label class="form-field">
								<input type="radio" name="_aaa" />
								<span class="label-checkbox">No</span>
							</label>
						</div>
					</div>
				</VSheet>

				<VSheet>
					<div class="flex gap-4 flex-col">
						<div class="text-xl">Toggle</div>

						<div class="flex flex-col gap-4">
							<label class="form-field form-field--toggle">
								<input id="_1" type="checkbox">
								<label for="_1" class="label-checkbox"></label>
							</label>
						</div>
					</div>
				</VSheet>

				<VSheet>
					<div class="flex gap-4 flex-col">
						<div class="text-xl">Tooltip</div>

						<div class="flex flex-col gap-10">
							<p class="p-2 tooltip ">
								<span class="tooltip-content">This is tooltip ...</span>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor laborum, modi perferendis quidem unde
								voluptas.
							</p>

							<p class="p-2 tooltip tooltip-is-active tooltip--bottom">
								<span class="tooltip-content">This is tooltip ...</span>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque aut autem beatae doloribus earum enim
								exercitationem hic illo inventore ipsa itaque iure labore laborum laudantium magni maxime minima natus
								nemo nihil non nostrum officia perferendis quaerat quas quos recusandae, saepe sit ullam vitae. Aliquam
								aliquid aut dolorem est hic illo modi, odio odit officia possimus quaerat sed! A ab ad autem deserunt
								distinctio, doloribus est ipsa maxime modi quas tenetur velit veniam, voluptates. Culpa ea, excepturi
								explicabo id iste laboriosam laborum nostrum quia rerum sunt tempore vel veritatis vero voluptatibus,
								voluptatum. Consequuntur eius pariatur perspiciatis quaerat tenetur ullam voluptates.
							</p>
						</div>
					</div>
				</VSheet>

				<VSheet>
					<div class="flex gap-4 flex-col">
						<div class="text-xl">Multiselect</div>

						<div class="flex flex-col gap-10">
							<VueMultiselect
								class="multiselect"
								:options="['aneta', 'mariana']"
								searchable
								placeholder="Write something ..." />
						</div>
					</div>
				</VSheet>
			</div>

		</div>
	</div>
</template>
