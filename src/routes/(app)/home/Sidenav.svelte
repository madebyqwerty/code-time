<script lang="ts">
	import Datepicker from './Datepicker.svelte';
	import Tags from './Tags.svelte';

	let isManager = false;
</script>

<nav>
	<h2>CodeTime</h2>

	{#if isManager}
		<section>
			<h3>UŽIVATEL</h3>
		</section>
	{/if}

	<Datepicker />
	<Tags />
</nav>

<style lang="scss">
	nav {
		height: 100vh;
		width: 100%;
		border-right: 2px solid $green-primary;
		display: flex;
		flex-direction: column;
		padding: 1.6rem;
		gap: 0.8rem;
		position: sticky;
		top: 0px;
	}

	h2 {
		background: lighten($background, 10);
		padding: 0.8rem;
		color: $green-primary;
		width: 100%;
		text-align: center;
	}
</style>
