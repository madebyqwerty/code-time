<script lang="ts">
	import { goto } from '$app/navigation';
	import { login, pb } from '$lib/pocketbase';
	import Input from '$lib/components/forms/Input.svelte';
	import Wrapper from '../Wrapper.svelte';
	import Button from '$lib/components/Button.svelte';
	import { toast } from '@zerodevx/svelte-toast';

	let email = '',
		password = '',
		repeatPassword = '',
		name = '',
		error: {
			password: boolean;
			repeatPassword: boolean;
			correctEmail: boolean;
			correctName: boolean;
		} = {
			password: false,
			repeatPassword: false,
			correctEmail: false,
			correctName: false
		};

	$: error.repeatPassword = password !== repeatPassword;
	$: error.correctEmail = email !== '' ? !/\S+@\S+\.\S+/.test(email) : false;
	$: error.password = password !== '' ? password.length < 12 || password.length > 72 : false;
	$: error.correctName = name !== '' ? name.length < 3 : false;

	async function register(type: 'managers' | 'users') {
		if (!error.password && !error.repeatPassword && !error.correctEmail) {
			await pb
				.collection('users')
				.create({
					email,
					password,
					passwordConfirm: repeatPassword,
					name,
					is_manager: type === 'managers',
					$autoCancel: false
				})
				.then(async () => {
					await login(email, password);
					goto('/');
				})
				.catch((e: Error) => {
					toast.push('Něco se pokazilo, zkuste změnit e-mail');
				});
		}
	}
</script>

<Wrapper>
	<h1 class="width-max white">REGISTRACE</h1>
	<a class="text-base grey grey-hover" href="/auth/login">Přejít na přihlášení</a>
	<form class="wrapper" on:submit|preventDefault={() => {}}>
		<Input
			type="text"
			bind:value={name}
			placeholder="Martin Novák"
			label="Jméno"
			error={error.correctName ? 'Jméno musí mít minimálně 3 znaky' : ''}
			required />
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
			placeholder="************"
			name="password"
			label="Heslo"
			helperText="Heslo musí mít 12-72 znaků"
			showPasswordSwitch={true}
			error={error.password ? 'Heslo musí mít 12-72 znaků' : ''}
			required />
		<Input
			type="password"
			bind:value={repeatPassword}
			placeholder="************"
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
