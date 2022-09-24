<script>
	import Stepper from '$lib/Registration/Stepper.svelte';
	import TicketSelection from '$lib/Registration/TicketSelection.svelte';
	import BookingDetails from '$lib/Registration/BookingDetails.svelte';
	import PaymentDetails from '$lib/Registration/PaymentDetails.svelte';
	import { onMount } from 'svelte';
	import { booking } from '$lib/store/booking';

	export let event = {};

	const items = [
		{ id: 1, name: 'Ticketauswahl', slug: 'selection', component: TicketSelection },
		{ id: 2, name: 'Buchungsdetails', slug: 'booking', component: BookingDetails },
		{ id: 3, name: 'Zahlungsvorgang', slug: 'payment', component: PaymentDetails }
	];
	export let activeTabValue = 1;
	let registration;

	onMount(() => {
		let found = items.find((i) => i.slug == window.location.hash.substring(1));
		activeTabValue = found ? found.id : 1;
		registration.style.display = 'block';
		registration.style.opacity = 1;
	});

	const handleStep = (e) => {
		activeTabValue = e.detail.id;
		window.location.hash = e.detail.slug;
	};
</script>

<div class="registration" bind:this={registration}>
	<Stepper steps={items} on:step={handleStep} />

	<div class="sections">
		{#each items as item}
			{#if activeTabValue == item.id}
				<div>
					<svelte:component this={item.component} {event} on:next={handleStep} />
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.registration {
		background-color: transparent;
		max-width: 800px;
		margin: 0 auto;
		opacity: 0;
		display: none;
		transition: opacity 1s;
		color: #262626;
	}
</style>
