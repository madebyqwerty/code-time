<script lang="ts">
	import { login } from '$lib/pocketbase';
	import Wrapper from '../Wrapper.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { goto } from '$app/navigation';

	let email: string,
		password: string = '',
		wrongPassword: boolean = false;

	async function handleLogin() {
		try {
			await login(email, password);
			await goto('/');
		} catch {
			wrongPassword = true;
		}
	}
</script>

<Wrapper>
	<h1 class="width-max white">LOGIN</h1>
	<a class="text-base grey grey-hover" href="/auth/register"
		>Ještě nemáte účet? Zde si ho vytvořte</a
	>
	<form on:submit|preventDefault={handleLogin}>
		<Input type="text" bind:value={email} placeholder="jmeno@priklad.cz" label="E-mail" />
		<Input
			type="password"
			bind:value={password}
			placeholder="*****"
			showPasswordSwitch={true}
			error={wrongPassword ? 'Špatný E-mail nebo Heslo' : ''}
			label="Heslo"
		/>
		<Button>Přihlásit se</Button>
	</form>
</Wrapper>

<style lang="scss">
	form {
		width: 100%;
	}
</style>
