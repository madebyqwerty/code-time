<script>
	import { tagStore } from '$lib/pocketbase/tagStore';

	let isManager = false;

	console.log($tagStore);
</script>

<nav>
	<h2>CodeTime</h2>

	{#if isManager}
		<section>
			<h3>UŽIVATEL</h3>
		</section>
	{/if}

	<section>
		<h3>Tags</h3>
		{#each $tagStore as tag}
			<div class="tag" style="background-color: {tag.color};">{tag.name}</div>
		{/each}
	</section>
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
	}

	h2 {
		background: lighten($background, 10);
		padding: 0.8rem;
		color: $green-primary;
		width: 100%;
		text-align: center;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		padding-top: 1.2rem;
		padding-bottom: 1.2rem;
		& > h3 {
			color: white;
		}
	}

	.tag {
		padding: 0.4rem;
		color: white;
	}
</style>
