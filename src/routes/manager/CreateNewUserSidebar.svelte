<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { currentUser, pb } from '$lib/pocketbase';
	import { page } from '$app/stores';
	import { toast } from '@zerodevx/svelte-toast';

	export let open: boolean;
	let newUserName = '';
	let newUserPassword = '';
	let newUserEmail = '';
	let error: { password: boolean; correctName: boolean; correctEmail: boolean } = {
		password: false,
		correctName: false,
		correctEmail: false
	};

	$: error.correctEmail = newUserEmail !== '' ? !/\S+@\S+\.\S+/.test(newUserEmail) : false;
	$: error.password =
		newUserPassword !== '' ? newUserPassword.length < 12 || newUserPassword.length > 72 : false;
	$: error.correctName = newUserName !== '' ? newUserName.length < 4 : false;

	async function createNewUser() {
		if (!error.password && !error.correctEmail && !error.correctName) {
			await pb
				.collection('users')
				.create({
					email: newUserEmail,
					password: newUserPassword,
					passwordConfirm: newUserPassword,
					name: newUserName,
					is_manager: false,
					manager: $currentUser.id,
					emailVisibility: true
				})
				.catch(() => {
					toast.push('Něco se pokazilo, zkuste změnit email');
				});
			open = false;
			await invalidate('home');
			newUserEmail = '';
			newUserName = '';
			newUserPassword = '';
		}
	}
</script>

<Sidebar bind:open title="Nový uživatel">
	<Input
		bind:value={newUserName}
		type="text"
		label="Jméno nového uživatele"
		placeholder="Martin Novák"
		error={error.correctName ? 'Jméno musí mít minimálně 4 znaky' : ''} />

	<Input
		bind:value={newUserEmail}
		type="email"
		label="E-mail nového uživatele"
		placeholder="martin.novak@email.cz"
		error={error.correctEmail ? 'Neplatný E-mail' : ''} />
	<Input
		bind:value={newUserPassword}
		type="password"
		showPasswordSwitch={true}
		label="Heslo pro nového uživatele"
		placeholder="************"
		error={error.password ? 'Heslo musí mít 12-72 znaků' : ''} />
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
