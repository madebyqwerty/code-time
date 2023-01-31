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
		error: { password: boolean; repeatPassword: boolean; correctEmail: boolean } = {
			password: false,
			repeatPassword: false,
			correctEmail: false
		};

	async function register(type: 'managers' | 'users') {
		error.repeatPassword = password !== repeatPassword;

		error.correctEmail = !/\S+@\S+\.\S+/.test(email);

		error.password = password.length < 12 || password.length > 72;

		if (!error.password && !error.repeatPassword && !error.correctEmail) {
			await pb.collection('users').create({
				email,
				password,
				passwordConfirm: repeatPassword,
				name,
				is_manager: type === 'managers',
				$autoCancel: false
			});
			await login(email, password);
			goto('/');
		}
	}
</script>

<Wrapper>
	<h1 class="width-max white">REGISTRACE</h1>
	<a class="text-base grey grey-hover" href="/auth/login">Přejít na přihlášení</a>
	<form class="wrapper" on:submit|preventDefault={() => {}}>
		<Input type="text" bind:value={name} placeholder="Martin Novák" label="Jméno" required />
		<Input
			type="text"
			bind:value={email}
			placeholder="jmeno@priklad.cz"
			label="E-mail"
			error={error.correctEmail ? 'Neplatný E-mail' : ''}
			required />
		<Input
			type="password"
			bind:value={password}
			placeholder="****"
			name="password"
			label="Heslo"
			helperText="Heslo musí mít minimálně 12 znaků"
			showPasswordSwitch={true}
			error={error.password ? 'Heslo musí mít 12-72 znaků' : ''}
			required />
		<Input
			type="password"
			bind:value={repeatPassword}
			placeholder="****"
			label="Zopakovat heslo"
			name="repeatPassword"
			showPasswordSwitch={true}
			error={error.repeatPassword ? 'Hesla se neshodují' : ''}
			required />
		<div class="buttons">
			<Button
				on:click={() => {
					register('users');
				}}>Vytvořit účet</Button>
			<Button
				type="secondary"
				on:click={() => {
					register('managers');
				}}>Vytvořit manažerský účet</Button>
		</div>
	</form>
</Wrapper>

<style lang="scss">
	form {
		width: 100%;
	}
</style>
