<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { userStore } from '$lib/pocketbase/userStore';
	import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui';
	import { tooltip } from '@svelte-plugins/tooltips';

	$: selectedSearchParam = $page.url.searchParams.get('user_id');
	$: selectedUserID = selectedSearchParam ? JSON.parse(selectedSearchParam) : 0;

	let menuButtonWidth = 0;

	async function handleUserChange(id: number) {
		const url = $page.url;
		url.searchParams.set('user_id', JSON.stringify(id));
		await goto(url.toString());
		await invalidate('home');
	}
</script>

<section>
	<p class="label">
		Výběr uživatele
		<span
			use:tooltip={{
				content:
					'Používáte manažerský účet, což znamená že nemůžete přidávat záznamy sám sobě, ale jen programátorům které jste přidal',
				position: 'bottom'
			}}
		>
			<iconify-icon icon="pixelarticons:open" />
		</span>
	</p>
	<Menu let:open>
		<MenuButton>
			<div class="menu-button" bind:clientWidth={menuButtonWidth}>
				<strong>Vybraný uživatel:</strong>
				{$userStore[selectedUserID].name}
				<iconify-icon icon={'pixelarticons:chevron-down'} class:open class:closed={!open} />
			</div>
		</MenuButton>
		<span style="display:relative;">
			<div class="menu-items" style="width: {menuButtonWidth}px; overflow:hidden;">
				<MenuItems>
					{#each $userStore as user, i}
						<button class="menu-button menu-item" on:click={() => handleUserChange(i)}
							>{user.name}</button
						>
					{/each}
				</MenuItems>
			</div>
		</span>
	</Menu>
</section>

<style lang="scss">
	$light-background: lighten($background, 10);

	.label {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		margin-bottom: 1.2rem;
	}
	.menu-button {
		padding: 0.8rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		width: 100%;
		background-color: $light-background;
		& > span {
			display: flex;
			align-items: center;
			gap: 10px;
		}
	}

	iconify-icon {
		transition: all 300ms;
	}

	.open {
		transform: rotate(180deg);
	}

	.menu-item {
		justify-content: start;
		background-color: lighten($background, 5);
	}

	.menu-items {
		position: absolute;
		width: 100%;
	}
</style>
