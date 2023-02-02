<script lang="ts">
	import Checkbox from './Checkbox.svelte';
	import CreateButton from '../CreateButton.svelte';
	import { tagStore } from '$lib/pocketbase/tagStore';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import CreateTag from './CreateTag.svelte';
	import EditTag from './EditTag.svelte';

	$: tagsSearchParam = $page.url.searchParams.get('tags');
	$: selectedTags = tagsSearchParam ? JSON.parse(tagsSearchParam) : [];
	$: $tagStore.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

	let openCreateTag = false;
	let openEditTag = false;

	let editedTag = {
		name: '',
		color: '00ff00',
		description: '',
		id: ''
	};

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
		await invalidate('home');
	}
</script>

<section>
	<div class="headerlmao">
		<h3>Štítky</h3>
		<CreateButton
			type={2}
			bind:open={openCreateTag}
			on:click={() => {
				openCreateTag = !openCreateTag;
			}} />
	</div>

	{#each $tagStore as tag}
		<div class="tag">
			<div class="tag-text">
				<Checkbox
					active={selectedTags.includes(tag.id)}
					--bg={tag.color}
					on:check={(e) => handleTagChange(tag.id, e.detail)}>{tag.name}</Checkbox>
			</div>
			<div class="tag-icons">
				<button
					on:click={() => {
						openEditTag = true;
						editedTag = {
							name: tag.name,
							color: tag.color,
							description: tag.description,
							id: tag.id
						};
					}}
					class="tag-icon"
					><div class="dot" />
					<div class="dot" />
					<div class="dot" />
				</button>
			</div>
		</div>
	{/each}
</section>

<CreateTag bind:openCreateTag />
<EditTag bind:openEditTag bind:editedTag />

<style lang="scss">
	h3 {
		color: white;
	}

	.headerlmao {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
	}

	.dot {
		height: 4px;
		width: 4px;
		background: white;
		border-radius: 5px;
	}
	.tag {
		padding: 0.4rem;
		color: white;
		display: flex;
		gap: 0.8rem;
		align-items: center;
		justify-content: space-between;
		transition: 100ms ease;

		&-text {
			gap: 0.8rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&-icon {
			height: 2rem;
			width: 2rem;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			opacity: 0;
			padding-right: 0.2rem;
			transition: 100ms ease;
		}

		&:hover &-icon {
			opacity: 1;
		}
		&:hover {
			background-color: #ffffff03;
		}
	}
</style>
