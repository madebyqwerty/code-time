<script lang="ts">
	import Checkbox from './Checkbox.svelte';
	import { tagStore } from '$lib/pocketbase/tagStore';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import SidebarLeft from '$lib/components/SidebarLeft.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	$: tagsSearchParam = $page.url.searchParams.get('tags');
	$: selectedTags = tagsSearchParam ? JSON.parse(tagsSearchParam) : [];
	let openTags = false;
	let editTag = false;
	let edited;
	let searchInput: string;

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

	async function handleAdd() {}
</script>

<SidebarLeft bind:open={openTags} title="DODAT ŠTÍTEK">
	<form on:submit|preventDefault={handleAdd}>
		<Input type="text" bind:value={searchInput} placeholder="Jméno štítku" label="Název štítku" />
		<Button>Přidat štítek</Button>
	</form>
	{#each $tagStore as tag (tag.id)}
		<div class="tag">
			<div class="tag-text">
				<Checkbox
					active={selectedTags.includes(tag.id)}
					--bg={tag.color}
					on:check={(e) => handleTagChange(tag.id, e.detail)}
				/>{tag.name}
			</div>
			<div class="tag-icons">
				<button
					on:click={() => {
						editTag = !editTag;
						edited = tag;
					}}
					class="tag-icon"
					>...
				</button>
			</div>
		</div>
	{/each}
</SidebarLeft>
<SidebarLeft bind:open={editTag} title="UPRAVIT ŠTÍTEK" />
<section>
	<div class="headerlmao">
		<h3>Štítky</h3>
		<button
			on:click={() => {
				openTags = !openTags;
			}}
			class="icon">+</button
		>
	</div>

	{#each $tagStore as tag (tag.id)}
		<div class="tag">
			<div class="tag-text">
				<Checkbox
					active={selectedTags.includes(tag.id)}
					--bg={tag.color}
					on:check={(e) => handleTagChange(tag.id, e.detail)}
				/>{tag.name}
			</div>
			<div class="tag-icons">
				<button
					on:click={() => {
						editTag = !editTag;
						edited = tag;
					}}
					class="tag-icon"
					>...
				</button>
			</div>
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
		font-size: 4rem;
		line-height: 2.5rem;
		color:white;
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
		justify-content: space-between;
		& svg,
		&-icon {
			height: 1.6rem;
			width: 1.6rem;
			opacity: 0;
		}
		&:hover svg,
		&:hover &-icon {
			opacity: 1;
		}
	}

	section {
		@include nav-section;
	}
</style>
