<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import { event } from '$lib/store/event'
</script>

<Header title={'Gesamtübersicht'} />

<Content>
	<div class="row">

		<div class="md-6 col">

			<div>
				<h3>Anzahl der Anmeldungen</h3>
				<div class="count">
					<p>{$event.bookings.length}</p>
				</div>
			</div>
			
		</div>
	
		<div class="md-6 col">
			<div>
				<h3>Diagramm/Grafik</h3>
				<div class="count">

				</div>
			</div>
		
		</div>
	
		<div class="md-12 col">
			<div>
				<h3>Die letzten 15 Anmeldungen</h3>
				<table>
					<thead>
					<tr>
						<th>Anmeldung für</th>
						<th>Rechnungsdaten</th>
						<th>Preis</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
			
					{#each $event.bookings as booking}
						<tr>
							<td>
								{#if booking.cart}
									{#each booking.cart as item} 
										{item.name}
									{/each}
								{/if}
							</td>
							<td>
								{booking.billing_name} <br>	
								{booking.billing_address} {booking.billing_city}<br>
								{booking.billing_email}
							</td>
							<td>{booking.total} €</td>
							<td><span class:paid={booking.status.toUpperCase() == 'BEZAHLT'}>{booking.status}</span></td>
							
						</tr>
					{/each}
				</tbody>
				</table>
			</div>
		</div>
	
	</div>

</Content>







<style>
	.row {

	}
	.row > div {
		padding: 15px;
	}

	.row > div div{
		/* background-color: white; */
		padding: 30px;
		min-height: 200px;
	}

	h3 {
		font-size: 1.3rem;
		font-weight: 400;
		margin-bottom: 10px;
	}
	.count {
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 3rem;
		color: var(--color-1-dark);
	}
</style>
