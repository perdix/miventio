<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';

	export let bookings = [
		{
			person: 'Max Muster',
			desc: 'Komplette Konferenz - Worshop 1 & 3',
			price: '40€',
			status: 'Bezahlt'
		},
		{
			person: 'Max Muster',
			desc: 'Komplette Konferenz - Worshop 1 & 3',
			price: '40€',
			status: 'Bezahlt'
		},
		{
			person: 'Max Muster',
			desc: 'Komplette Konferenz - Worshop 1 & 3',
			price: '40€',
			status: 'Bezahlt'
		},
		{
			person: 'Max Muster',
			desc: 'Komplette Konferenz - Worshop 1 & 3',
			price: '40€',
			status: 'Bezahlt'
		},
		{
			person: 'Max Muster',
			desc: 'Komplette Konferenz - Worshop 1 & 3',
			price: '40€',
			status: 'Bezahlt'
		},
		{
			person: 'Max Muster',
			desc: 'Komplette Konferenz - Worshop 1 & 3',
			price: '40€',
			status: 'Bezahlt'
		},
		{
			person: 'Max Muster',
			desc: 'Komplette Konferenz - Worshop 1 & 3',
			price: '40€',
			status: 'Bezahlt'
		},
		{
			person: 'Max Muster',
			desc: 'Komplette Konferenz - Worshop 1 & 3',
			price: '40€',
			status: 'Bezahlt'
		},
		{
			person: 'Max Muster',
			desc: 'Komplette Konferenz - Worshop 1 & 3',
			price: '40€',
			status: 'Bezahlt'
		},
		{
			person: 'Max Muster',
			desc: 'Komplette Konferenz - Worshop 1 & 3',
			price: '40€',
			status: 'Bezahlt'
		},
		{
			person: 'Max Muster',
			desc: 'Komplette Konferenz - Worshop 1 & 3',
			price: '40€',
			status: 'Bezahlt'
		},
		{
			person: 'Max Muster',
			desc: 'Komplette Konferenz - Worshop 1 & 3',
			price: '40€',
			status: 'Bezahlt'
		},
		{
			person: 'Max Muster',
			desc: 'Komplette Konferenz - Worshop 1 & 3',
			price: '40€',
			status: 'Bezahlt'
		},
		{
			person: 'Max Muster',
			desc: 'Komplette Konferenz - Worshop 1 & 3',
			price: '40€',
			status: 'Bezahlt'
		}
	];
</script>

<Header title={'Buchungen'}>
	<button>Neu <span class="material-symbols-outlined">add_circle</span></button>
</Header>

<Content>
	<p>Hier sieht man alle Buchungen und kann diese verwalten (auch händisch neu hinzugeben).</p>
</Content>

<Content>
	<table>
		<tr>
			<th>Person</th>
			<th>Beschreibung</th>
			<th>Preis</th>
			<th>Status</th>
		</tr>

		{#each bookings as booking}
			<tr>
				<td>{booking.person}</td>
				<td>{booking.desc}</td>
				<td>{booking.price}</td>
				<td><span class:paid={booking.status.toUpperCase() == 'BEZAHLT'}>{booking.status}</span></td
				>
			</tr>
		{/each}
	</table>
</Content>

<style>
	.paid {
		border-radius: 15px;
		background-color: lightgreen;
		padding: 5px 10px;
	}
</style>
