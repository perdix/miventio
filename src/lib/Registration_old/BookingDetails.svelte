<script>
	import Cart from '$lib/Registration/Cart.svelte';
	import { createEventDispatcher } from 'svelte';
	import { booking } from '$lib/store/booking';

	const dispatch = createEventDispatcher();

	const saveAndNext = () => {
		dispatch('next', {
			id: 3,
			slug: 'payment'
		});
	};
</script>

<section>
	<form class="register" on:submit|preventDefault={saveAndNext}>
		<div class="wrapper">
			<div class="infos">
				<div class="row">
					<div class="md-6">
						<label for="firstname">Vorname</label>
						<input
							id="firstname"
							type="text"
							placeholder="Vorname"
							required
							bind:value={$booking.first_name}
						/>
					</div>
					<div class="md-6">
						<label for="lastname">Nachname</label>
						<input
							id="lastname"
							type="text"
							placeholder="Nachname"
							required
							bind:value={$booking.last_name}
						/>
					</div>

					<div class="md-8">
						<label for="email">E-Mail</label>
						<input
							id="email"
							type="email"
							placeholder="E-Mail"
							required
							bind:value={$booking.email}
						/>
					</div>

					<div class="md-4">
						<label for="phone">Telefon</label>
						<input id="phone" type="text" placeholder="Telefon" bind:value={$booking.phone} />
					</div>

					<div class="md-12">
						<label for="street">Straße</label>
						<input
							id="street"
							type="text"
							placeholder="Straße"
							required
							bind:value={$booking.address}
						/>
					</div>

					<div class="md-4">
						<label for="postcode">Postleitzahl</label>
						<input
							id="postcode"
							type="text"
							placeholder="Postleitzahl"
							required
							bind:value={$booking.postcode}
						/>
					</div>
					<div class="md-8">
						<label for="city">Stadt</label>
						<input id="city" type="text" placeholder="Stadt" required bind:value={$booking.city} />
					</div>
				</div>
			</div>

			<div class="cart">
				<Cart />
			</div>
		</div>

		<div class="footer">
			<button> Weiter </button>
		</div>
	</form>
</section>

<style>
	section {
	}
	.wrapper {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
	}
	.infos {
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
