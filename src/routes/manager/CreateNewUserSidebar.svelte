<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { currentUser, pb } from '$lib/pocketbase';

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
			manager: $currentUser.id
		});
		newUserEmail = '';
		newUserName = '';
		newUserPassword = '';
		await invalidate('home');
		open = false;
	}
</script>

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
		type="password"
		showPasswordSwitch={true}
		label="Heslo pro nového uživatele"
		placeholder="******"
	/>
	Vytvořením uživatele, vytvoříte běžný účet, jehož přihlašovací údaje potom můžete dát svému programátorovi,
	aby si mohl sám přidávat záznamy.
	<Button on:click={createNewUser}>Vytvořit uživatele</Button>
</Sidebar>
