<script lang="ts">
	import { languages } from '$lib/utils/languages';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="home-page">
	<table class="table-default">
		<th class="white"><h4>Datum</h4></th>
		<th class="white"><h4>Délka</h4></th>
		<th class="white"><h4>Jazyky</h4></th>
		<th class="white"><h4>Obtížnost</h4></th>
		<th class="white"><h4>Popis</h4></th>
		<th class="white"><h4>Tag</h4></th>
		{#each data.records as record}
			<tr>
				<td class="text-sm white">{record.date}</td>
				<td class="text-sm number-sm white">{record.length}</td>
				<td class="text-sm white">
					{#each record.language as language}
						<span class="language" style="background: {languages[language]};">{language}</span>
					{/each}
				</td>
				<td class="text-sm number white">{'*'.repeat(record.rating)}</td>
				<td class="text-sm white">{record.description}</td>
				{#each record.expand?.tags as tag}
					<td class="text-sm white">{tag.name}</td>
				{:else}
					<td />
				{/each}
			</tr>
		{/each}
	</table>
</section>

<style lang="scss">
	.home-page {
		@include center;
		padding-top: 10rem;
	}

	.section-default {
		@include center;
		width: 100vw;
		height: 100vh;
	}
	.wrapper {
		padding: 3.2rem 1.6rem;
		border: 2px solid #46bc46;
		gap: 1.6rem;
		text-align: left;
		align-items: start;
	}

	tr > td {
		padding: 1.5rem;

		&:not(:first-child) {
			border-left: 1px solid lighten($background, 10);
		}
		&:not(:last-child) {
			border-right: 1px solid lighten($background, 10);
		}
	}

	tr:nth-of-type(odd) {
		background-color: darken($background, 10%);
	}

	th {
		padding: 2rem;
		border-bottom: 1px solid $green-primary;
	}

	.number {
		font-size: 2.5rem;
		font-family: 'Silkscreen';
		text-align: center;
		&-sm {
			font-size: 2rem;
			text-align: center;
		}
	}

	td[colspan='6'] {
		padding: 0;
	}

	.language {
		padding: 0.5rem;
		font-size: 1.7rem;
		margin-right: 1rem;
	}
</style>
