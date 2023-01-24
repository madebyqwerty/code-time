<script lang="ts">
	import Checkbox from './Checkbox.svelte';
	import { tagStore } from '$lib/pocketbase/tagStore';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import SidebarLeft from "$lib/components/SidebarLeft.svelte"

	$: tagsSearchParam = $page.url.searchParams.get('tags');
	$: selectedTags = tagsSearchParam ? JSON.parse(tagsSearchParam) : [];
	let openTags = false;

	async function handleTagChange(id: string, checked: boolean) {
		if (checked) {
			$page.url.searchParams.set('tags', JSON.stringify([...selectedTags, id]));
		} else {
			$page.url.searchParams.set(
				'tags',
				JSON.stringify(selectedTags.filter((e: string) => e !== id))
			);
		}

		await goto($page.url);
		invalidate('home');
	}
</script>

<SidebarLeft bind:open={openTags} title="UPRAVIT ŠTÍTKY">
	{#each $tagStore as tag (tag.id)}
		<div class="tag">
			<Checkbox
				active={selectedTags.includes(tag.id)}
				--bg={tag.color}
				on:check={(e) => handleTagChange(tag.id, e.detail)}
			/>{tag.name}
		</div>
	{/each}
</SidebarLeft>

<section>
	<div class="headerlmao">
		<h3>Štítky</h3>
		<button
			on:click={() => {
				openTags = !openTags;
			}}
			class="icon"
		>
			<svg
				width="18px"
				height="18px"
				viewBox="0 0 18 18"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				><title>tune</title><desc>Created with Sketch.</desc><g
					id="Icons"
					stroke="none"
					stroke-width="1"
					fill="none"
					fill-rule="evenodd"
					><g id="Outlined" transform="translate(-375.000000, -2903.000000)">
						<g id="Image" transform="translate(100.000000, 2626.000000)">
							<g id="Outlined-/-Image-/-tune" transform="translate(272.000000, 274.000000)">
								<g>
									<polygon id="Path" points="0 0 24 0 24 24 0 24" />
									<path
										d="M3,17 L3,19 L9,19 L9,17 L3,17 Z M3,5 L3,7 L13,7 L13,5 L3,5 Z M13,21 L13,19 L21,19 L21,17 L13,17 L13,15 L11,15 L11,21 L13,21 Z M7,9 L7,11 L3,11 L3,13 L7,13 L7,15 L9,15 L9,9 L7,9 Z M21,13 L21,11 L11,11 L11,13 L21,13 Z M15,9 L17,9 L17,7 L21,7 L21,5 L17,5 L17,3 L15,3 L15,9 Z"
										id="🔹-Icon-Color"
										fill="#1D1D1D"
									/>
								</g>
							</g>
						</g>
					</g>
				</g>
			</svg>
		</button>
	</div>

	{#each $tagStore as tag (tag.id)}
		<div class="tag">
			<Checkbox
				active={selectedTags.includes(tag.id)}
				--bg={tag.color}
				on:check={(e) => handleTagChange(tag.id, e.detail)}
			/>{tag.name}
		</div>
	{/each}
</section>

<style lang="scss">
	h3 {
		color: white;
	}
	g {
		stroke-width: 1;
	}
	path {
		fill: white;
	}
	.headerlmao {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
	}
	.icon {
		height: 2.5rem;
		width: 2.5rem;
	}
	svg {
		height: 2.5rem;
		width: 2.5rem;
	}
	.tag {
		padding: 0.4rem;
		color: white;
		display: flex;
		gap: 0.8rem;
		align-items: center;
	}

	section {
		@include nav-section;
	}
</style>
