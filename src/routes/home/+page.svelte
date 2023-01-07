<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="home-page">
	<table class="table-default">
		<tr>
			<th class="white">Datum</th>
			<th class="white">Délka</th>
			<th class="white">Jazyky</th>
			<th class="white">Obtížnost</th>
			<th class="white">Popis</th>
			<th class="white">Tag</th>
		</tr>
		{#each data.records as record}
			<tr>
				<td class="text-sm white">{record.date}</td>
				<td class="text-sm number-sm white">{record.length}</td>
				<td class="text-sm white">
					{#each record.language as language}
						<span class="language" value={language}>{language}</span>,
					{/each}
				</td>
				<td class="text-sm number white">{record.rating}</td>
				<td class="text-sm white">{record.description}</td>
				{#each record.expand.tags as tag}
					<td class="text-sm white">{tag.name}</td>
				{/each}
			</tr>
		{/each}
	</table>
</section>
