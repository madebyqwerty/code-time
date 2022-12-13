<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { posts } = data;
</script>

{#each posts as post}
	<h1 class="text-8xl text-zinc-900 font-serif">{post.title}</h1>
	<p>{post.body}</p>
	<figure>{post.author.name}</figure>
{/each}
