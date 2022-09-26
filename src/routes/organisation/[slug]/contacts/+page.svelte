<script>
	import Contacts from '$lib/Contacts.svelte';
	import { page } from '$app/stores';
	import Header from '$lib/blocks/Header.svelte';
	import Main from '$lib/blocks/Main.svelte';
	import Popup from '$lib/Popup.svelte';

	let contact = {};
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
				togglePopup();
			}
		} else {
			const res = await fetch(`/organisations/${$page.data.organisation.id}/contacts`, {
				method: 'POST',
				body: JSON.stringify(contact)
			});
			if (res.status === 201) {
				togglePopup();
			}
		}
	};

	const openContact = (event) => {
		contact = event.detail.contact;
		popupTitle = 'Kontakt editieren';
		togglePopup();
	};

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
</script>

<div class="page">
	<Popup title={popupTitle} show={showPopup} on:close={togglePopup} maxWidth={'900px'}>
		<form class="miventio row" on:submit|preventDefault={saveContact}>
			<div class="md-2">
				<label for="title">Titel</label>
				<input id="title" type="text" bind:value={contact.title} />
			</div>
			<div class="md-5">
				<label for="firstname">Vorname</label>
				<input id="firstname" type="text" bind:value={contact.first_name} required />
			</div>
			<div class="md-5">
				<label for="lastname">Nachname</label>
				<input id="lastname" type="text" bind:value={contact.last_name} required />
			</div>
			<div class="md-6">
				<label for="email">E-Mail</label>
				<input id="email" type="email" bind:value={contact.email} required/>
			</div>
			<div class="md-6">
				<label for="phone">Telefon</label>
				<input id="phone" type="text" bind:value={contact.phone} />
			</div>
			<div class="md-12">
				<label for="address">Adresse</label>
				<input id="address" type="text" bind:value={contact.address} />
			</div>
			<div class="md-6">
				<label for="postcode">Postleitzahl</label>
				<input id="postcode" type="text" bind:value={contact.postcode} />
			</div>
			<div class="md-6">
				<label for="city">Stadt</label>
				<input id="city" type="text" bind:value={contact.city} />
			</div>
			<div class="md-12">
				<label for="category">Kategorie</label>
				<input id="category" type="text" bind:value={contact.category} />
			</div>

			<div class="md-6 submit">
				<button type="submit">Speichern</button>
			</div>
			<div class="md-6 submit right">
				<button class="secondary" type="button" on:click={deleteContact}>
					<span class="material-symbols-outlined">delete</span>
				</button>
			</div>
		</form>
	</Popup>

	<Main>
		<Header title={'Kontakte'}>
			<button on:click={togglePopup}>
				<span>Neuer Kontakt</span>
				<span class="material-symbols-outlined">add_circle</span>
			</button>
		</Header>

		<Contacts contacts={$page.data.contacts} on:edit={openContact} />
	</Main>
</div>
