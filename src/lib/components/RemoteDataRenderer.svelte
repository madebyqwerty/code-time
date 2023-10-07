<script lang="ts" generics="L, R">
	import * as RD from '@devexperts/remote-data-ts';
	import { Pulse } from 'svelte-loading-spinners';

	export let rd: RD.RemoteData<L, R>;
	export let customLoading = false;
</script>

{#if RD.isInitial(rd)}
	<slot name="initial" />
{/if}

{#if RD.isPending(rd)}
	{#if customLoading}
		<slot name="pending" />
	{:else}
		<Pulse color="#46bc46" />
	{/if}
{/if}

{#if RD.isFailure(rd)}
	<slot name="failure" error={rd.error} />
{/if}

{#if RD.isSuccess(rd)}
	<slot name="success" />
{/if}
