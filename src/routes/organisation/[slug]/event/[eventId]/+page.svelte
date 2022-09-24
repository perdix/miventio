<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import { event } from '$lib/store/event';
</script>

<Header title={'Gesamtübersicht'} />

<Content>
	<div class="row">
		<div class="md-6 col">
			<div>
				<h3>Anzahl der Besucher</h3>
				<div class="count">
					<p>{$event.visits.length}</p>
				</div>
			</div>
		</div>

		<div class="md-6 col">
			<div>
				<h3>Anzahl der Buchungen</h3>
				<div class="count">
					<p>{$event.bookings.length}</p>
				</div>
			</div>
		</div>

		<div class="md-12 col">
			<div>
				<h3>Die letzten 15 Besucher</h3>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>E-Mail</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{#each $event.visits as visit}
							<tr>
								<td>
									{visit.user.first_name}
									{visit.user.last_name}
								</td>
								<td>
									{visit.user.email}
								</td>
								<td>{visit.status} </td>
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

	.row > div div {
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
