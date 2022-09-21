<script>
	import {booking} from '$lib/store/booking';

	$: sum = $booking.cart.map((i) => (i.ticket.price + i.activities.map(a => a.price).reduce((a, b) => a + b, 0))).reduce((a, b) => a + b, 0);
</script>

<div class="cart">
	{#if $booking.cart.length > 0}

	{#each $booking.cart as item}
		<div class="item">

		
		<div class="subitem">
			<div>
			<h3>{item.firstname} {item.lastname} | {item.ticket.name}</h3>
		    </div>
			<h3>{item.ticket.price} €</h3>
		</div>

		{#each item.activities as a}
			<div class="subitem">
				<p>{a.name}</p>
				<p>{a.price} €</p>
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
	{/if}
</div>

<style>
	.cart {
		width: 100%;
		margin-top: 30px;
		border-top: 1px solid black;
	}

	.item {
		margin-top:15px;
	}
	.subitem {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
	}
	.sum {
		padding: 15px 0;
		margin-top: 30px;
		border-top: 1px solid black;
		display: flex;
		justify-content: space-between;
		align-items: stretch;
	}
</style>
