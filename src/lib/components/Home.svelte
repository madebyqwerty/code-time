<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
</script>

<main>
	<span>
		<h1>Code Time</h1>
		<Button
			on:click={() => {
				goto('/auth/login');
			}}>Přihlásit se</Button
		>
		<Button
			on:click={() => {
				goto('/auth/register');
			}}
			type="secondary">Registrovat se</Button
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
