<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import {page} from '$app/stores';
	console.log($page.data.event.bookings);

</script>

<Header title={'Anmeldungen'}>
	<button>Neue Anmeldung <span class="material-symbols-outlined">add_circle</span></button>
</Header>

<Content>
	<table>
		<tr>
			<th>Buchung</th>
			<th>Beschreibung</th>
			<th>Preis</th>
			<th>Status</th>
		</tr>

		{#each $page.data.event.bookings as booking}
			<tr>
				<td>
					{#if booking.cart}
						{#each booking.cart as item} 
							{item.person}
						{/each}
					{/if}
				</td>
				<td>{booking.desc}</td>
				<td>{booking.total}</td>
				<td><span class:paid={booking.status.toUpperCase() == 'BEZAHLT'}>{booking.status}</span></td>
				
			</tr>
		{/each}
	</table>
</Content>

<style>
	.paid {
		border-radius: 15px;
		background-color: lightgreen;
		padding: 5px 10px;
	}
</style>
