<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import Main from '$lib/blocks/Main.svelte';
	import { page } from '$app/stores';
	import { organisation } from '$lib/store/organisation';
	import { goto } from '$app/navigation';
	import Popup from '$lib/Popup.svelte';

	if ($organisation.role != 'ADMIN') {
		goto(`/organisation/${$organisation.id}`);
	}

	let editOrganisation = { ...$organisation };

	const saveOrganisation = async () => {
		const res = await fetch(`/organisations/${$organisation.id}`, {
			method: 'PUT',
			body: JSON.stringify(editOrganisation)
		});
		if (res.status === 200) {
			const updatedOrganisation = await res.json();
			// Merge updated organisation into old one, keeping the role attribute!
		    $organisation = { ...$organisation, ...updatedOrganisation};
			goto(`/organisation/${$organisation.id}`);
		}
	};

	let superuser = {};
	let showPopup = false;
	let popupTitle = 'Neuer Mitarbeiter';

	const togglePopup = () => {
		showPopup = !showPopup;
	};

	const newSuperuser = (event) => {
		popupTitle = 'Neuer Mitarbeiter';
		superuser = {};
		togglePopup();
	};

	const editSuperuser = (su) => {
		superuser = su;
		popupTitle = 'Mitarbeiter editieren';
		togglePopup();
	};
	const deleteSuperuser = async () => {
		const res = await fetch(
			`/organisations/${$page.data.organisation.id}/users/${superuser.id}`,
			{
				method: 'DELETE'
			}
		);
		if (res.status === 200) {
			const deletedSuperuser = await res.json();
			togglePopup();
		}
	};
	const saveSuperuser = async () => {
		if ('id' in superuser) {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/users/${superuser.id}`,
				{
					method: 'PUT',
					body: JSON.stringify(superuser)
				}
			);
			if (res.status === 200) {
				const updatedSuperuser = await res.json();
				togglePopup();
			}
		} else {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/users`,
				{
					method: 'POST',
					body: JSON.stringify(superuser)
				}
			);
			if (res.status === 201) {
				const newSuperuser = await res.json();
				togglePopup();
			}
		}
	};

</script>

<Popup title={popupTitle} show={showPopup} on:close={togglePopup} maxWidth={'900px'}>
	<form class="miventio row" on:submit|preventDefault={saveSuperuser}>
		<div class="md-6">
			<label for="email">E-Mail</label>
			<input id="email" type="email" bind:value={superuser.email} required/>
		</div>
		<div class="md-6">
			<label for="role">Rolle</label>
			<input id="role" type="text" bind:value={superuser.role} required />
		</div>
		<div class="md-6">
			<label for="password1">Passwort</label>
			<input id="password1" type="password" bind:value={superuser.password} required/>
		</div>
		<div class="md-6">
			<label for="password2">Wiederholung Passwort</label>
			<input id="password2" type="password" bind:value={superuser.passwordConfirmation} required/>
		</div>
		
		<div class="md-6 submit">
			<button type="submit">Speichern</button>
		</div>
		<div class="md-6 submit right">
			<button class="secondary" type="button" on:click={deleteSuperuser}>
				<span class="material-symbols-outlined">delete</span>
			</button>
		</div>
	</form>
</Popup>

<Main>
	<Header title={'Einstellungen'}>
		<!-- <a href="/organisation/{$organisation.id}" class="close"><span class="material-symbols-outlined">close</span></a>	 -->
	</Header>

	<Content>
		<div class="row">
			<div class="md-6 col">
				<h1>Allgemein</h1>
				<form class="miventio row" on:submit|preventDefault={saveOrganisation} data-sveltekit-prefetch="off">
					<div class="md-12">
						<label for="Name">Organisationsname</label>
						<input id="name" type="text" bind:value={editOrganisation.name} />
					</div>
					<div class="md-12">
						<label for="description">Beschreibung</label>
						<input id="description" type="text" bind:value={editOrganisation.description} />
					</div>
					<div class="md-12">
						<label for="color">Organisationsfarbe</label>
						<input id="color" type="color" bind:value={editOrganisation.color} />
					</div>
					<div class="md-12 submit">
						<button type="submit">Speichern</button>
					</div>
				</form>
			</div>
			<div class="md-6 col">
				<h1>Subscription</h1>
				<div class="abo">
					<p>Welches Abo wurde gegewählt?</p>
				</div>
			</div>

			<div class="md-12 col">
				
				

				<div class="users">
					<div class="flex">
						<h1>Mitarbeiter</h1>
						<button on:click={togglePopup}>
							<span>Mitarbeiter</span>
							<span class="material-symbols-outlined">add_circle</span>
						</button>
					</div>
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
									<td
										><span class:admin={superuser.role.toUpperCase() == 'ADMIN'}
											>{superuser.role}</span
										></td
									>
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
		padding: 30px;
	}
	.flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.flex button {
		margin-bottom: 20px;
	}
</style>
