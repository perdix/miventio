<script>
	import { event } from '$lib/store/event';
</script>




	<div class="row">
		<div class="col-6 col">
			<div>
				<h3>Gesamtanmeldungen</h3>
				<div class="count">
					<p>{$event.visitors.length}</p>
				</div>
			</div>
		</div>

		{#if $event.visitors.length > -1}
		<div class="col-12 col">
			<div>
				<h3>Die letzten 15 Anmeldungen</h3>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>E-Mail</th>
						</tr>
					</thead>
					<tbody>
						{#each $event.visitors as visitor}
							<tr>
								<td>
									{visitor.firstName}
									{visitor.lastName}
								</td>
								<td>
									{visitor.email}
								</td>
						
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		{/if}
	</div>


<style>
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
