<script lang="ts">
	import Datepicker from './Datepicker.svelte';
	import Languages from './Languages.svelte';
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
	<Languages />
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
		overflow-y: scroll;
		@include scrollbars(0.5rem, darken($background, 10), $green-primary);
	}

	h2 {
		background: darken($background, 10);
		padding: 0.8rem;
		color: $green-primary;
		width: 100%;
		text-align: center;
	}
</style>
