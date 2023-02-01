<script lang="ts">
	import Datepicker from './Datepicker.svelte';
	import Languages from './Languages.svelte';
	import Tags from './Tags.svelte';
	import Stars from './Stars.svelte';
	import UserMenu from './UserMenu.svelte';

	export let selectedTags;
</script>

<nav>
	<h2>CodeTime</h2>
	<UserMenu />
	<Stars />
	<Datepicker />
	<Tags bind:selectedTags/>
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

		& :global(*) {
			transition: none;
		}

		& :global(h3) {
			color: white;
		}
		& :global(section) {
			padding-top: 1.2rem;
			padding-bottom: 1.2rem;
			gap: 0.8rem;
			display: flex;
			flex-direction: column;
		}
	}

	h2 {
		background: $background;
		padding: 0.8rem;
		color: $green-primary;
		width: 100%;
		text-align: center;
	}
</style>
