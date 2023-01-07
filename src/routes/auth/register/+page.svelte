<script lang="ts">
	import { goto } from '$app/navigation';
	import { login, pb } from '$lib/pocketbase';
	import Input from '$lib/components/forms/Input.svelte';
	import Wrapper from '../Wrapper.svelte';

	let email: string, password: string, repeatPassword: string, name: string;

	async function register() {
		const createdUser = await pb.collection('users').create({
			email,
			password,
			passwordConfirm: repeatPassword,
			name
		});

		await login(email, password);
		goto('/');
	}
</script>

<Wrapper>
	<form class="wrapper">
		<h1 class="width-max white">REGISTRACE</h1>
		<a class="text-base grey grey-hover" href="/auth/login">Přejít na přihlášení</a>
		<Input type="text" bind:value={email} placeholder="E-mail" />
		<Input type="password" bind:value={password} placeholder="Heslo" />
		<Input type="password" bind:value={repeatPassword} placeholder="Zopakovat Heslo" />
		<Button>Vytvořit účet</Button>
	</form>
</Wrapper>
