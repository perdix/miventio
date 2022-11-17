<script>
	import Contacts from '$lib/Contacts.svelte';
	import Subnavigation from '$lib/Subnavigation.svelte';
	import { page } from '$app/stores';
	import Header from '$lib/blocks/Header.svelte';
	import Main from '$lib/blocks/Main.svelte';
	import Popup from '$lib/Popup.svelte';

	let contact = {};
	let contacts = $page.data.contacts;
	let showPopup = false;
	let popupTitle = 'Neuer Kontakt';

	const togglePopup = () => {
		showPopup = !showPopup;
	};
	const saveContact = async () => {
		if ('id' in contact) {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/contacts/${contact.id}`,
				{
					method: 'PUT',
					body: JSON.stringify(contact)
				}
			);
			if (res.status === 200) {
				const updatedContact = await res.json();
				contacts = contacts.map((c) => (c.id == contact.id ? updatedContact : c));
				togglePopup();
			}
		} else {
			const res = await fetch(`/organisations/${$page.data.organisation.id}/contacts`, {
				method: 'POST',
				body: JSON.stringify(contact)
			});
			if (res.status === 201) {
				togglePopup();
				location.reload();
			}
		}
	};

	const openContact = (event) => {
		contact = event.detail.contact;
		popupTitle = 'Kontakt editieren';
		togglePopup();
	};

	const newContact = () => {
		contact = {};
		togglePopup();
	}

	const deleteContact = async () => {
		const res = await fetch(`/organisations/${$page.data.organisation.id}/contacts/${contact.id}`, {
			method: 'DELETE',
			body: JSON.stringify(contact)
		});
		if (res.status === 200) {
			togglePopup();
			location.reload();
		}
	};


	const subNavItems = [
		{
			name: "Mitglieder & Kontakte",
			slug: "contacts",
			status: 'active'
		},
		{
			name: "Mitgliedskategorien",
			slug: "memberships"
		}
	]
</script>

<div class="page">



	<Subnavigation items={subNavItems}></Subnavigation>



	<Popup title={popupTitle} show={showPopup} on:close={togglePopup} maxWidth={'900px'}>
		<form class="miventio row" on:submit|preventDefault={saveContact}>
			<div class="col-6">
				<label for="prefix">ID</label>
				<input id="prefix" type="text" bind:value={contact.identifier} />
			</div>
			<div class="col-6">
				<label for="gender">Geschlecht</label>
				<select name="gender" id="gender">
					<option value=""></option>
					<option value="female">weiblich</option>
					<option value="male">männlich</option>
					<option value="diverse">divers</option>
				</select>
			</div>
			<div class="col-2">
				<label for="prefix">Titel</label>
				<input id="prefix" type="text" bind:value={contact.prefix} />
			</div>
			<div class="col-4">
				<label for="firstname">Vorname</label>
				<input id="firstname" type="text" bind:value={contact.firstName} required />
			</div>
			<div class="col-4">
				<label for="lastname">Nachname</label>
				<input id="lastname" type="text" bind:value={contact.lastName} required />
			</div>
			<div class="col-2">
				<label for="postfix">Titel (nachgest.)</label>
				<input id="postfix" type="text" bind:value={contact.postfix} />
			</div>

			<div class="col-5">
				<label for="email">E-Mail</label>
				<input id="email" type="email" bind:value={contact.email} required/>
			</div>
			<div class="col-5">
				<label for="phone">Telefon</label>
				<input id="phone" type="text" bind:value={contact.phone} />
			</div>

			<div class="col-1">
				<label for="gdpr-confirmation">DSGVO</label>
				<input id="gdpr-confirmation" type="checkbox" bind:checked={contact.gdprConfirmation} />
			</div>

			<div class="col-1">
				<label for="gdpr-confirmation">Newsletter</label>
				<input id="gdpr-confirmation" type="checkbox" bind:checked={contact.newsletterConfirmation} />
			</div>


			<hr class="col-12">
			<div class="col-6">
				<label for="category">Kategorie</label>
				<select name="category" id="category" bind:value={contact.membershipId}>
					<option value=""></option>
					{#each $page.data.memberships as membership}
						<option value="{membership.id}">{membership.name}</option>
					{/each}

				</select>
			</div>

			<div class="col-6">
				<label for="status">Mitgliedsstatus</label>
				<select name="status" id="status" bind:value={contact.status}>
					<option value=""></option>
					<option value="AKTIV">AKTIV</option>
					<option value="INAKTIV">INAKTIV</option>
				</select>
			</div>
	
			<hr class="col-12">
			<div class="col-6">
				<label for="company">Praxis/Firmenname</label>
				<input id="company" type="text" bind:value={contact.company} />
			</div>

			<div class="col-6">
				<label for="website">Website</label>
				<input id="website" type="url" bind:value={contact.website} />
			</div>


			<div class="col-12">
				<label for="address">Straße</label>
				<input id="address" type="text" bind:value={contact.address} />
			</div>
			<div class="col-3">
				<label for="postcode">Postleitzahl</label>
				<input id="postcode" type="text" bind:value={contact.postcode} />
			</div>
			<div class="col-4">
				<label for="city">Stadt</label>
				<input id="city" type="text" bind:value={contact.city} />
			</div>
			<div class="col-5">
				<label for="country">Land</label>
				<input id="country" type="text" bind:value={contact.country} />
			</div>

			<hr class="col-12">

			<div class="col-12">
				<label for="notes">Notizen</label>
				<textarea id="notes" rows="5" bind:value={contact.notes}></textarea>
			</div>
			
	
			<div class="col-6 submit">
				<button type="submit">Speichern</button>
			</div>
			<div class="col-6 submit right">
				<button type="button" on:click={deleteContact}>
					<span class="material-symbols-outlined">delete</span>
				</button>
			</div>
		</form>
	</Popup>


	<div class="main">

	<Main>
		<Header title={'Mitglieder & Kontakte'}>
			<button on:click={newContact}>
				<span>Neuer Kontakt</span>
				<span class="material-symbols-outlined">add_circle</span>
			</button>
		</Header>

		<Contacts contacts={contacts} on:edit={openContact} />
	</Main>
</div>
</div>


<style>

	
</style>