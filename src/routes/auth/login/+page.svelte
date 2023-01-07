<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/pocketbase';
	import Wrapper from '../Wrapper.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';

	let email: string, password: string;
</script>

<Wrapper>
	<form class="wrapper">
		<h1 class="width-max white">LOGIN</h1>
		<a class="text-base grey grey-hover" href="/auth/register"
			>Ještě nemáte účet? Zde si ho vytvořte</a
		>
		<Input type="text" bind:value={email} placeholder="E-mail" />
		<Input type="password" bind:value={password} placeholder="Heslo" />
		<Button>Přihlásit se</Button>
	</form>
</Wrapper>
