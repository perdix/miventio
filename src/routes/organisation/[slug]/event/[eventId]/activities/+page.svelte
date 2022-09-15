<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import {page} from '$app/stores';
</script>

<Header title={'Aktivitäten'}>
	<button>Neue Aktivität <span class="material-symbols-outlined">add_circle</span></button>
</Header>

<Content>

	<h3>Tag 1: 21.3.2023</h3>

	<table>
		<tr>
			<th>Title</th>
			<th>Beschreibung</th>
			<th>Start</th>
			<th>Ende</th>
			<th>Preis</th>
			<th>Besucher-Limit</th>
		</tr>

		{#each $page.data.event.activities as activity}
			<tr>
				<td>{activity.name}</td>
				<td>{activity.desc}</td>
				<td>{activity.start}</td>
				<td>{activity.end}</td>
				<td>{activity.price}</td>
				<td>{activity.limit}</td>
			</tr>
		{/each}
	</table>

</Content>

<style>
	h3 {
		margin-bottom: var(--unit);
	}
</style>
