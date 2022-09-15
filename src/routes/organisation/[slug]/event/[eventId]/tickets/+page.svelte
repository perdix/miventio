<script>
	import Header from '$lib/blocks/Header.svelte';
	import Ticket from '$lib/Ticket.svelte';
	import { page } from '$app/stores'
</script>

<Header title={'Tickets'}>
	<button>Neues Ticket<span class="material-symbols-outlined">add_circle</span></button>
</Header>

<div>

	{#each $page.data.event.tickets as ticket}
		<Ticket {ticket}/>
	{/each}
	
	
</div>


<style>
	h3 {
		margin: 20px 0;
	}
</style>
