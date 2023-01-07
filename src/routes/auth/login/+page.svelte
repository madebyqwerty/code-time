<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/pocketbase';
	import Wrapper from '../Wrapper.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';

	let email: string, password: string;
</script>

<Wrapper>
	<div class="mb-8">
		<h1>Login</h1>
		<a href="/auth/register" class="text-ctgray-200">Ještě nemáte účet? Zde si ho vytvořte</a>
	</div>
	<form
		action=""
		class="flex flex-col gap-4"
		on:submit={() => {
			() => {
				login(email, password);
				goto('/');
			};
		}}
	>
		<Input placeholder="E-mail" bind:value={email} />
		<Input placeholder="Password" bind:value={password} />
		<Button
			on:click={() => {
				login(email, password);
				console.log('Loggin in');
				goto('/domov');
			}}>Login</Button
		>
	</form>
</Wrapper>
