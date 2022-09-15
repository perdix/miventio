<script>
	import Header from '$lib/blocks/Header.svelte';
	import Main from '$lib/blocks/Main.svelte';

	export let contacts = [];
</script>

<Main>
	<Header title={'Kontakte'}>
		<button>
			Neuer Kontakt<span class="material-symbols-outlined">add_circle</span>
		</button>
	</Header>

	<table>
		<thead>
		<tr>
			<th>Name</th>
			<th>Adresse</th>
			<th>E-Mail</th>
			<th>Status</th>
		</tr>
	</thead>
		<tbody>	
		{#each contacts as contact}
			<tr>
				<td>{contact.first_name} {contact.last_name}</td>
				<td
					>{contact.address} <br />
					{contact.address.postcode}
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
		</tbody>		
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
