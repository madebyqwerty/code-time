<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.error}
	<section>
		<h1>{$page.status}</h1>
		<p>Omlouváme se ale něco se pokazilo:</p>
		<pre>{$page.error.message}</pre>
	</section>
{/if}

<style lang="scss">
	section {
		width: 100vv;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
</style>
