<script lang="ts">
	import { tooltip } from '@svelte-plugins/tooltips';
	export let description:string="";
</script>

{#if description}
<span class="table-tag" use:tooltip={{
	content: description,
	position: 'top'
}}>
	<slot />
</span>
{:else}
<span class="table-tag">
	<slot />
</span>
{/if}



<style>
	.table-tag {
		padding: 0.4rem;
		background: var(--backgroundColor, '#ffffff55');
		color: var(--textColor);
		margin: 0.4rem;
	}
</style>
