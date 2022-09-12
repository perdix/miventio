<script>
	import Header from '$lib/blocks/Header.svelte';
	import Button from '$lib/blocks/Button.svelte';
	import Main from '$lib/blocks/Main.svelte';

	export let contacts = [
		{
			name: 'Max Mustermann',
			address: 'Musterstraße 34',
			email: 'mail@mail.de',
			status: 'Student'
		},
		{
			name: 'Max Mustermann',
			address: 'Musterstraße 34',
			email: 'mail@mail.de',
			status: 'Besucher'
		},
		{
			name: 'Max Mustermann',
			address: 'Musterstraße 34',
			email: 'mail@mail.de',
			status: 'Student'
		},
		{
			name: 'Max Mustermann',
			address: 'Musterstraße 34',
			email: 'mail@mail.de',
			status: 'Mitglied'
		},
		{
			name: 'Max Mustermann',
			address: 'Musterstraße 34',
			email: 'mail@mail.de',
			status: 'Student'
		},
		{
			name: 'Max Mustermann',
			address: 'Musterstraße 34',
			email: 'mail@mail.de',
			status: 'Student'
		},
		{
			name: 'Max Mustermann',
			address: 'Musterstraße 34',
			email: 'mail@mail.de',
			status: 'Mitglied'
		},
		{
			name: 'Max Mustermann',
			address: 'Musterstraße 34',
			email: 'mail@mail.de',
			status: 'Student'
		},
		{
			name: 'Max Mustermann',
			address: 'Musterstraße 34',
			email: 'mail@mail.de',
			status: 'Mitglied'
		},
		{
			name: 'Max Mustermann',
			address: 'Musterstraße 34',
			email: 'mail@mail.de',
			status: 'Besucher'
		},
		{
			name: 'Max Mustermann',
			address: 'Musterstraße 34',
			email: 'mail@mail.de',
			status: 'Student'
		},
		{
			name: 'Max Mustermann',
			address: 'Musterstraße 34',
			email: 'mail@mail.de',
			status: 'Besucher'
		}
	];
</script>

<Main>
	<Header title={'Kontakte'}>
		<Button>
			Neu <span class="material-symbols-outlined">add_circle</span>
		</Button>
	</Header>

	<table>
		<tr>
			<th>Name</th>
			<th>Adresse</th>
			<th>E-Mail</th>
			<th>Status</th>
		</tr>

		{#each contacts as contact}
			<tr>
				<td>{contact.name}</td>
				<td
					>{contact.address.street}
					{contact.address.suite} <br />
					{contact.address.zipcode}
					{contact.address.city}</td
				>
				<td>{contact.email}</td>
				<td
					><span
						class:member={contact.status.toLowerCase() == 'mitglied'}
						class:student={contact.status.toLowerCase() == 'student'}>{contact.status}</span
					></td
				>
			</tr>
		{/each}
	</table>
</Main>

<style>
	.member {
		background-color: lightgreen;
	}
	.student {
		background-color: lightcoral;
	}
</style>
