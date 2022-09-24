<script>
	import Time from 'svelte-time';
	export let ticket = {};	
</script>

<article class="ticket" class:selected="{ticket.selected}">
	<div style="display:flex;">
		<h1>{ticket.name || ''}</h1>
		|
		<p>{ticket.category || ''}</p>

		{#if ticket.date}
			<p>| Gültig am: <Time timestamp={ticket.date} format="DD.MM.YYYY" /></p>
		{:else}
			<p />
		{/if}
	</div>

	<p><b>{ticket.price || ''} €</b></p>
</article>

<style>
	.ticket {
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: 7px;
		text-align: left;
		border: 1px solid #262626;
		border-radius: 3px;
		margin-bottom: 2px;
		cursor: pointer;
	}
	.ticket:hover,
	.ticket.selected {
		background-color: #e9e9e9;
	}

	h1 {
		font-size: 14px;
		font-weight: 600;
		font-family: 'Roboto';
		margin-right: 5px;
	}
	p {
		font-size: 14px;
		margin-left: 5px;
	}
</style>
