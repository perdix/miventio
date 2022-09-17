<script>
	export let contacts = [];
</script>
	<table>
		<thead>
		<tr>
			<th>Name</th>
			<th>Adresse</th>
			<th>E-Mail</th>
			<th>Telefon</th>
			<th>Status</th>
		</tr>
	</thead>
		<tbody>	
		{#each contacts as contact}
			<tr>
				<td>{contact.first_name} {contact.last_name}</td>
				<td
					>{contact.address || ''} <br />
					{contact.postcode || ''}
					{contact.city || ''}</td
				>
				<td>{contact.email || ''}</td>
				<td>{contact.phone || ''}</td>
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

<style>
	.member {
		background-color: lightgreen;
	}
	.student {
		background-color: lightcoral;
	}
</style>
