<script>
	import Header from '$lib/blocks/Header.svelte';
	import Ticket from '$lib/Ticket.svelte';
</script>

<Header title={'Tickets'}>
	<button>Neues Ticket<span class="material-symbols-outlined">add_circle</span></button>
</Header>

<div>

	<h3>Mitglied</h3>
	<Ticket />
	<Ticket />
	<h3>Student</h3>
	<Ticket />
	<Ticket />
	
	<h3>Sonstige Teilnahme</h3>
	<Ticket />
	<Ticket />
	



</div>


<style>
	h3 {
		margin: 20px 0;
	}
</style>
