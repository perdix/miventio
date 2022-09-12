<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import Ticket from '$lib/Ticket.svelte';
	import Popup from '$lib/Popup.svelte';
</script>

<Header title={'Tickets'}>
	<button>Neu <span class="material-symbols-outlined">add_circle</span></button>
</Header>

<Content>
	<p>Hier erstellt man Tickets</p>
	<p>Tickets sind Eintrittsvarianten. Welchen Tag kann man buchen, welche Discount gibt es, etc.</p>
	<p>Beim Buchen/Registrieren wählt man dann das passende Ticket aus.</p>
</Content>

<Content>
	<h3>Mitglied</h3>
	<Ticket />
	<Ticket />
	<h3>Student</h3>
	<Ticket />
	<Ticket />
</Content>

<style>
</style>
