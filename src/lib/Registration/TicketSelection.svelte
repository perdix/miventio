<script>
	import { booking } from '$lib/store/booking';
	import Cart from '$lib/Registration/Cart.svelte';
	import SingleSelection from '$lib/Registration/SingleSelection.svelte';
	export let event = { tickets: [], activities: []};

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	const switchTo = (id, slug) => {
		dispatch('next', {
			id: id,
			slug: slug
		});
	};

	const freshItem = () => {
		let item = {tickets: JSON.parse(JSON.stringify(event.tickets)), activities: JSON.parse(JSON.stringify(event.activities)), ticket: {}}
		return item;
	}
	let item = freshItem();	

	const addItem = (e) => {
		$booking.cart.push(e.detail.item)
		// Reset item
		item = freshItem();
		$booking = $booking;
		if (e.detail.next == true) {
			switchTo(2,"#booking")
		}
	}
	
</script>

<section>
	<div>
		<SingleSelection item={item}  on:addItem={addItem} />
	</div>

	<div class="cart">
		<Cart />
	</div>

</section>

<style>
	.cart {
		margin-top:20px;
	}
</style>
