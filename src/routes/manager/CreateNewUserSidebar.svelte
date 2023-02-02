<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { currentUser, pb } from '$lib/pocketbase';
	import { page } from '$app/stores';

	export let open: boolean;
	let newUserName = '';
	let newUserPassword = '';
	let newUserEmail = '';

	async function createNewUser() {
		await pb.collection('users').create({
			email: newUserEmail,
			password: newUserPassword,
			passwordConfirm: newUserPassword,
			name: newUserName,
			is_manager: false,
			manager: $currentUser.id,
			emailVisibility: true
		});
		open = false;
		await invalidate('home');
		newUserEmail = '';
		newUserName = '';
		newUserPassword = '';
	}
</script>

<Sidebar bind:open title="Nový uživatel">
	<Input
		bind:value={newUserName}
		type="text"
		label="Jméno nového uživatele"
		placeholder="Martin Novák" />
	<Input
		bind:value={newUserEmail}
		type="email"
		label="E-mail nového uživatele"
		placeholder="martin.novak@email.cz" />
	<Input
		bind:value={newUserPassword}
		type="password"
		showPasswordSwitch={true}
		label="Heslo pro nového uživatele"
		placeholder="************" />
	<p>
		Vytvořením uživatele, vytvoříte běžný účet, jehož přihlašovací údaje potom můžete dát svému
		programátorovi, aby si mohl sám přidávat záznamy.
	</p>
	<Button on:click={createNewUser}>Vytvořit uživatele</Button>
</Sidebar>

<style lang="scss">
	p {
		margin-top: 2.4rem;
	}
</style>
