<script>
	import { booking } from '$lib/store/booking';

	$: sum = $booking.cart
		.map((i) => i.ticket.price + i.activities.map((a) => a.price).reduce((a, b) => a + b, 0))
		.reduce((a, b) => a + b, 0);
</script>

{#if $booking.cart.length > 0}
<div class="cart">
		{#each $booking.cart as item}
			<div class="item">
				<div class="subitem">
					<div>
						<h3>{item.first_name || ''} {item.last_name || ''} | {item.ticket.name || ''}</h3>
					</div>
					<h3>{item.ticket.price} €</h3>
				</div>

				{#each item.activities as a}
					<div class="subitem">
						<p>{a.name}</p>
						{#if a.price > 0}
						<p>{a.price} €</p>
						{/if}
					</div>
				{/each}
			</div>
	
		{/each}

		<div class="sum">
			<div class="left">
				<h3>Gesamt</h3>
			</div>
			<div class="right">
				<h3>{sum} €</h3>
			</div>
		</div>
	
</div>
{/if}
<style>
	.cart {
		height: 100%;
		width: 100%;
		background-color: #e6e6e6;
		padding: 20px 20px;
	}

	.item {
		margin-bottom: 15px;
		
	}
	.item h3 {
		font-weight: 400;
	}
	.subitem {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
	}
	.subitem p {
		font-weight: 300;
	}
	.sum {
		padding: 15px 0;
		margin-top: 20px;
		border-top: 1px solid black;
		display: flex;
		justify-content: space-between;
		align-items: stretch;
	}
</style>
