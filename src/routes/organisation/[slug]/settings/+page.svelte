<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import Main from '$lib/blocks/Main.svelte';
	import { page } from '$app/stores';
	import { organisation } from '$lib/store/organisation'
	import { goto } from '$app/navigation';


	if ($organisation.role != 'ADMIN') {
		goto(`/organisation/${$organisation.id}`);
	}

	let editOrganisation = { ... $organisation}

	const saveOrganisation = async () => {
		const res = await fetch(`/organisations/${$organisation.id}`, {
				method: 'PUT',
				body: JSON.stringify(editOrganisation)
			});
			if (res.status === 200) {
				const updatedOrganisation = await res.json();
				$organisation = updatedOrganisation;
			}
	}
    
	const editSuperuser = () => {

	}

</script>

<Main>
	<Header title={'Settings'} >
		<!-- <a href="/organisation/{$organisation.id}" class="close"><span class="material-symbols-outlined">close</span></a>	 -->
	</Header>

	<Content>

	<div class="row">
		<div class="md-6 col">
			
				<h1>Allgemein</h1>
				<form action="" class="miventio row" on:submit|preventDefault={saveOrganisation}>
					<div class="md-12">
						<label for="Name">Organisationsname</label>
						<input id="name" type="text" bind:value="{editOrganisation.name}" />
					</div>
					<div class="md-12">
						<label for="description">Beschreibung</label>
						<input id="description" type="text" bind:value="{editOrganisation.description}" />
					</div>
					<div class="md-12">
						<label for="color">Organisationsfarbe</label>
						<input id="color" type="color" bind:value="{editOrganisation.color}" />
					</div>
					<div class="md-12 submit">
						<button type="submit">Speichern</button>
					</div>
				</form>
		
		</div>
		<div class="md-6 col">

			<h1>Subscription</h1>
			<div class="abo">
				<p>Welches Abo wurde gegewählt? </p>
			</div>
			
	
		</div>

		<div class="md-12 col">

			<h1>Mitarbeiter</h1>

			<div class="users">

				<table>
					<thead>
					<tr>
						<th>E-Mail</th>
						<th>Rolle</th>
					</tr>
				</thead>
				<tbody>

				{#each $organisation.superusers as superuser}
				<tr on:click={() => editSuperuser(superuser)}>
		
					<td>{superuser.email}</td>
					<td><span class:admin={superuser.role.toUpperCase() == 'ADMIN'}>{superuser.role}</span></td>
					
				</tr>
			{/each}

		</tbody>
	</table>

			</div>
	</div>


	</div>




	</Content>




</Main>

<style>
	.col {
		padding: 30px;
	}
	h1 {
		font-size: 1.5rem;
		font-weight: 300;
		margin-bottom: calc(var(--unit) / 2);
	}
	.box {
		margin-top: var(--unit);
	}
	.abo {
		background-color: white;
		min-height: 200px;
		padding: 30px;
		background-color: var(--grey);
	}
	.users {
		background-color: var(--grey);
		padding: 30px
	}
</style>
