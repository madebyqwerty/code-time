<script lang="ts">
	export let value: string;
	export let placeholder: string;
</script>

<input
	type="text"
	bind:value
	{placeholder}
	class="bg-transparent border-2 border-ctgreen-500 p-3"
/>
