<script>
	import Subnavigation from '$lib/Subnavigation.svelte';
	import { page } from '$app/stores';
	import Header from '$lib/blocks/Header.svelte';
	import Main from '$lib/blocks/Main.svelte';
	import Popup from '$lib/Popup.svelte';

	let membership = {};
	let memberships = $page.data.memberships;
	let showPopup = false;
	let popupTitle = 'Neue Mitgliedskategorie';

	console.log(memberships);

	const togglePopup = () => {
		showPopup = !showPopup;
	};
	const saveMembership = async () => {
		if ('id' in membership) {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/memberships/${membership.id}`,
				{
					method: 'PUT',
					body: JSON.stringify(membership)
				}
			);
			if (res.status === 200) {
				const updatedMembership = await res.json();
				memberships = memberships.map((m) => (m.id == membership.id ? updatedMembership : m));
				togglePopup();
			}
		} else {
			const res = await fetch(`/organisations/${$page.data.organisation.id}/memberships`, {
				method: 'POST',
				body: JSON.stringify(membership)
			});
			if (res.status === 201) {
				const addedMembership = await res.json();
				memberships.unshift(addedMembership);
				memberships = memberships;
				togglePopup();
			}
		}
	};

	const newMembership = () => {
		membership = {};
		togglePopup();
	};

	const openMembership = (m) => {
		membership = m;
		popupTitle = 'Mitgliedskategorie editieren';
		togglePopup();
	};

	const deleteMembership = async () => {
		const res = await fetch(
			`/organisations/${$page.data.organisation.id}/memberships/${membership.id}`,
			{
				method: 'DELETE',
				body: JSON.stringify(membership)
			}
		);
		if (res.status === 200) {
			togglePopup();
			location.reload();
		}
	};

	const subNavItems = [
		{
			name: 'Mitglieder & Kontakte',
			slug: 'contacts'
		},
		{
			name: 'Mitgliedskategorien',
			slug: 'memberships',
			status: 'active'
		}
	];
</script>

<div class="page">
	<Subnavigation items={subNavItems} />

	<Popup title={popupTitle} show={showPopup} on:close={togglePopup} maxWidth={'900px'}>
		<form class="miventio row" on:submit|preventDefault={saveMembership}>
			<div class="col-6">
				<label for="name">Name</label>
				<input id="name" type="text" bind:value={membership.name} required />
			</div>

			<div class="col-6">
				<label for="color">Farbe</label>
				<input id="color" type="color" bind:value={membership.color} />
			</div>

			<div class="col-6">
				<label for="description">Beschreibung</label>
				<input id="description" type="text" bind:value={membership.description} />
			</div>

			<div class="col-6">
				<label for="price">Jahresbeitrag (€)</label>
				<input id="price" type="number" bind:value={membership.price} />
			</div>

			<div class="col-6 submit">
				<button type="submit">Speichern</button>
			</div>
			<div class="col-6 submit right">
				<button class="secondary" type="button" on:click={deleteMembership}>
					<span class="material-symbols-outlined">delete</span>
				</button>
			</div>
		</form>
	</Popup>

	<div class="main">
		<Main>
			<Header title={'Mitgliedskategorien'}>
				<button on:click={newMembership}>
					<span>Neue Mitgliedskategorie</span>
					<span class="material-symbols-outlined">add_circle</span>
				</button>
			</Header>

			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Beschreibung</th>
						<th>Jahresbeitrag</th>
						<th>Mitgliederanzahl</th>
					</tr>
				</thead>
				<tbody>
					{#each memberships as membership}
						<tr on:click={() => openMembership(membership)}>
							<td>
								<span class="membership" style="background-color:{membership.color || ''}">
									{membership.name || ''}
								</span>
							</td>
							<td>{membership.description || ''} </td>
							<td
								>{#if membership.price}{membership.price} €{/if}</td
							>
							<td>{membership.numberOfContacts || ''} </td>
						</tr>
					{/each}
				</tbody>
			</table>
		</Main>
	</div>
</div>

<style>
	.membership {
		padding: 5px 10px;
		font-size: 16px;
		border: 1px solid black;
		font-weight: 300;
	}
</style>
