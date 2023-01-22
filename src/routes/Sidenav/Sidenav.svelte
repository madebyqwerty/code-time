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
		display: flex;
		flex-direction: column;
		padding: 1.6rem;
		gap: 0.8rem;
		position: sticky;
		top: 0px;
		overflow-y: scroll;
		background-color: lighten($background, 5);
		@include scrollbars(0.5rem, $green-darkest, lighten($background, 5));
	}

	h2 {
		background: $background;
		padding: 0.8rem;
		color: $green-primary;
		width: 100%;
		text-align: center;
	}
</style>
