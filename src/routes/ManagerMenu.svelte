<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { userStore } from '$lib/pocketbase/userStore';
	import Menu from '$lib/components/menu/Menu.svelte';
	import MenuItem from '$lib/components/menu/MenuItem.svelte';
	import { tooltip } from '@svelte-plugins/tooltips';
	import Button from '$lib/components/Button.svelte';
	import { currentUser, pb } from '$lib/pocketbase';
	import MenuDivider from '$lib/components/menu/MenuDivider.svelte';

	$: selectedSearchParam = $page.url.searchParams.get('user_id');
	$: selectedUserID = selectedSearchParam ? JSON.parse(selectedSearchParam) : 0;

	async function handleUserChange(id: number) {
		const url = $page.url;
		url.searchParams.set('user_id', JSON.stringify(id));
		await goto(url.toString());
		console.log('userMenu1');
		await invalidate('home');
	}

	let open = false;
	let newUserName = '';
	let newUserPassword = '';
	let newUserEmail = '';

	function openSidebar() {
		open = true;
	}

	async function createNewUser() {
		await pb.collection('users').create({
			email: newUserEmail,
			password: newUserPassword,
			passwordConfirm: newUserPassword,
			name: newUserName,
			is_manager: false,
			manager: $currentUser.id
		});
		newUserEmail = '';
		newUserName = '';
		newUserPassword = '';
		console.log('usermenu2');
		await invalidate('home');
		open = false;
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
	<div class="menu">
		{#if $userStore.length > 0}
			<Menu>
				<div slot="menu-button">
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
					<MenuItem on:click={openSidebar}>Přidat nového uživatele</MenuItem>
				</div>
			</Menu>
		{:else}
			<Button on:click={openSidebar}>Vytvořit nového uživatele</Button>
		{/if}
	</div>
</section>

<Sidebar bind:open title="Nový uživatel">
	<Input
		bind:value={newUserName}
		type="text"
		label="Jméno nového uživatele"
		placeholder="Martin Novák"
	/>
	<Input
		bind:value={newUserEmail}
		type="email"
		label="E-mail nového uživatele"
		placeholder="martin.novak@email.cz"
	/>
	<Input
		bind:value={newUserPassword}
		type="password"
		showPasswordSwitch={true}
		label="Heslo pro nového uživatele"
		placeholder="******"
	/>
	Vytvořením uživatele, vytvoříte běžný účet, jehož přihlašovací údaje potom můžete dát svému programátorovi,
	aby si mohl sám přidávat záznamy.
	<Button on:click={createNewUser}>Vytvořit uživatele</Button>
</Sidebar>

<style lang="scss">
	$light-background: lighten($background, 10);

	.label {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		margin-bottom: 1.2rem;
	}

	.menu {
		width: max-content;
	}
</style>
