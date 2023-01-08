<script lang="ts">
	import { currentUser } from '$lib/pocketbase';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';

	console.log($currentUser);
</script>

<main>
	<span>
		<h1>Code Time</h1>
		<Button
			on:click={() => {
				goto('/auth/login');
			}}>Sign in</Button
		>
		<Button
			on:click={() => {
				goto('/auth/register');
			}}
			type="secondary">Register</Button
		>
	</span>
</main>

<style lang="scss">
	main {
		display: grid;
		place-items: center;
		min-height: 100vh;
	}

	h1 {
		margin-bottom: 4rem;
	}
</style>
