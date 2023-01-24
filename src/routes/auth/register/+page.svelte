<script lang="ts">
	import { goto } from '$app/navigation';
	import { login, pb } from '$lib/pocketbase';
	import Input from '$lib/components/forms/Input.svelte';
	import Wrapper from '../Wrapper.svelte';
	import Button from '$lib/components/Button.svelte';

	let email: string,
		password: string,
		repeatPassword: string,
		name: string,
		error: { password: boolean; repeatPassword: boolean } = {
			password: false,
			repeatPassword: false
		};

	async function register() {
		error.repeatPassword = password !== repeatPassword;
		error.password = password.length < 12;

		if (!error.password && !error.repeatPassword) {
			await pb.collection('users').create({
				email,
				password,
				passwordConfirm: repeatPassword,
				name
			});
			await login(email, password);
			goto('/');
		}
	}
</script>

<Wrapper>
	<h1 class="width-max white">REGISTRACE</h1>
	<a class="text-base grey grey-hover" href="/auth/login">Přejít na přihlášení</a>
	<form class="wrapper" on:submit|preventDefault={register}>
		<Input type="text" bind:value={email} placeholder="jmeno@priklad.cz" label="E-mail" required />
		<Input
			type="text"
			bind:value={password}
			placeholder="****"
			name="password"
			label="Heslo"
			helperText="Heslo musí mít minimálně 12 znaků"
			showPasswordSwitch={true}
			error={error.password ? 'Heslo má méně jak 12 znaků' : ''}
			required
		/>
		<Input
			type="text"
			bind:value={repeatPassword}
			placeholder="****"
			label="Zopakovat heslo"
			name="repeatPassword"
			showPasswordSwitch={true}
			error={error.repeatPassword ? 'Hesla se neshodují' : ''}
			required
		/>
		<Button>Vytvořit účet</Button>
	</form>
</Wrapper>

<style lang="scss">
	form {
		width: 100%;
	}
</style>
