<script>
	import Cart from '$lib/Registration/Cart.svelte';
	import { booking } from '$lib/store/booking';

	export let event = {};
	let success = false;

	const saveBooking = async () => {
		const res = await fetch(`/form/${event.id}/register`, {
			method: 'POST',
			body: JSON.stringify($booking)
		});
		if (res.status === 201) {
			success = true;
			$booking = { cart: [] };
		}
	};
</script>

<section>
	<div class="message" class:hidden={!success}>
		<h1>Vielen Dank für die Registrierung!</h1>
	</div>
	<form class="register" on:submit|preventDefault={saveBooking} class:hidden={success}>
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
	.hidden {
		display: none;
	}
	h1 {
		text-align: center;
	}
	section {
		display: flex;
		justify-content: center;
		align-items: center;
	}
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
