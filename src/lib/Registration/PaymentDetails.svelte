<script>
	import Cart from '$lib/Registration/Cart.svelte';
	import { booking } from '$lib/store/booking';

	export let event = {}

	const saveBooking = async () => {

		const res = await fetch(`/organisations/${event.organisation_id}/events/${event.id}/bookings`, {
				method: 'POST',
				body: JSON.stringify($booking)
			});
			if (res.status === 201) {
				alert("fasdf")
			}
	}


</script>

<section>
	<form class="register" on:submit|preventDefault="{saveBooking}">

	<div class="box">
		<div class="payment">
			<h3>zB. Stripe</h3>
		</div>
		<div class="cart">
			<Cart />
		</div>
	</div>

	<div class="footer">
		<button> Bestellen </button>
	</div>

	</form>
</section>

<style>
	.box {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
	}
	.payment {
		width: 60%;
	}
	.cart {
		width: 35%;
	}

	.footer {
		display: flex;
		width: 100%;
		justify-content: flex-end;
		align-items: center;
		padding-top: 30px;
	}

	
</style>
