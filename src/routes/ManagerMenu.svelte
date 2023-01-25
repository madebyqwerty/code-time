<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { userStore } from '$lib/pocketbase/userStore';
	import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui';
	import { tooltip } from '@svelte-plugins/tooltips';
	import Button from '$lib/components/Button.svelte';
	import { currentUser, pb } from '$lib/pocketbase';

	$: selectedSearchParam = $page.url.searchParams.get('user_id');
	$: selectedUserID = selectedSearchParam ? JSON.parse(selectedSearchParam) : 0;

	let menuButtonWidth = 0;

	async function handleUserChange(id: number) {
		const url = $page.url;
		url.searchParams.set('user_id', JSON.stringify(id));
		await goto(url.toString());
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
						<MenuItem as="div" let:active>
							<button
								class="menu-button menu-item"
								on:click={() => handleUserChange(i)}
								class:active>{user.name}</button
							>
						</MenuItem>
					{/each}
					<MenuItem as="div" let:active>
						<button class="menu-button menu-item add-button" on:click={openSidebar} class:active>
							<div class="divider" />
							<div class="content">
								<iconify-icon icon="pixelarticons:frame-add" inline={true} /> Přidat uživatele
							</div>
						</button>
					</MenuItem>
				</MenuItems>
			</div>
		</span>
	</Menu>
</section>
<Sidebar bind:open title="Přidat uživatele">
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
		type="text"
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
		&.active {
			background-color: $green-primary;
			color: $light-background;
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
		z-index: 10 !important;
	}

	.add-button {
		padding-top: 0.8rem;
		display: block;
		& > .divider {
			margin-left: 10%;
			margin-right: 10%;
			height: 1px;
			margin-bottom: 1.6rem;
			background-color: lighten($light-background, 10);
		}
		& > .content {
			display: flex;
			gap: 0.8rem;
		}
	}
</style>
