<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { userStore } from '$lib/pocketbase/userStore';
	import { tooltip } from '@svelte-plugins/tooltips';
	import CreateNewUserSidebar from './CreateNewUserSidebar.svelte';
	import Menu from '$lib/components/menu/Menu.svelte';
	import MenuItem from '$lib/components/menu/MenuItem.svelte';
	import MenuDivider from '$lib/components/menu/MenuDivider.svelte';
	import ManageUsersSidebar from './ManageUsersSidebar.svelte';
	import Button from '$lib/components/Button.svelte';

	export let selectedUserID: number = 0;
	export let labelType: 'green' | 'white' = 'green';
	$: selectedSearchParam = $page.url.searchParams.get('user_id');
	$: selectedUserID = selectedSearchParam ? JSON.parse(selectedSearchParam) : 0;

	async function handleUserChange(id: number) {
		const url = $page.url;
		url.searchParams.set('user_id', JSON.stringify(id));
		await goto(url.toString());
		await invalidate('home');
	}

	let createMenuOpen = false;
	let manageUserOpen = false;

	function openCreateMenu() {
		createMenuOpen = true;
	}

	function openManageUserMenu() {
		manageUserOpen = true;
	}
</script>

<section>
	<p class="label {labelType}">
		Výběr uživatele
		<span
			use:tooltip={{
				content:
					'Používáte manažerský účet, což znamená že nemůžete přidávat záznamy sám sobě, ale jen programátorům které jste přidal',
				position: 'bottom'
			}}>
			<iconify-icon icon="pixelarticons:open" />
		</span>
	</p>
	{#if $userStore.length > 0}
		<div class="menu-wrapper">
			<Menu>
				<div class="menu-button" slot="menu-button">
					<strong>Vybraný uživatel:</strong>
					{$userStore[selectedUserID].name}
				</div>
				<div slot="menu-items">
					{#each $userStore as user, i}
						<MenuItem on:click={() => handleUserChange(i)}>
							{user.name}
						</MenuItem>
					{/each}
					<MenuDivider />
					<MenuItem on:click={openManageUserMenu}>Spravovat uživatele</MenuItem>
					<MenuItem on:click={openCreateMenu}>Přidat nového uživatele</MenuItem>
				</div>
			</Menu>
		</div>
	{:else}
		<Button on:click={openCreateMenu}>Přidat uživatele</Button>
	{/if}
</section>

<CreateNewUserSidebar bind:open={createMenuOpen} />
<ManageUsersSidebar bind:open={manageUserOpen} />

<style lang="scss">
	$light-background: lighten($background, 10);

	.label {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		margin-bottom: 1.2rem;
		&.green {
			color: $green-lightest;
		}
		&.white {
			color: white;
			@include text-sm;
		}
	}

	.menu-wrapper {
		width: max-content;
	}
</style>
