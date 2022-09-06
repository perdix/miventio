<script>
    import Header from "$lib/blocks/header.svelte";
    export let contacts = [
    { name: 'Max Mustermann', address: "Musterstraße 34", email: "mail@mail.de", status: "Student" },
    { name: 'Max Mustermann', address: "Musterstraße 34", email: "mail@mail.de", status: "Besucher" },
    { name: 'Max Mustermann', address: "Musterstraße 34", email: "mail@mail.de", status: "Student" },
    { name: 'Max Mustermann', address: "Musterstraße 34", email: "mail@mail.de", status: "Mitglied" },
    { name: 'Max Mustermann', address: "Musterstraße 34", email: "mail@mail.de", status: "Student" },
    { name: 'Max Mustermann', address: "Musterstraße 34", email: "mail@mail.de", status: "Student" },
    { name: 'Max Mustermann', address: "Musterstraße 34", email: "mail@mail.de", status: "Mitglied" },
    { name: 'Max Mustermann', address: "Musterstraße 34", email: "mail@mail.de", status: "Student" },
    { name: 'Max Mustermann', address: "Musterstraße 34", email: "mail@mail.de", status: "Mitglied" },
    { name: 'Max Mustermann', address: "Musterstraße 34", email: "mail@mail.de", status: "Besucher" },
    { name: 'Max Mustermann', address: "Musterstraße 34", email: "mail@mail.de", status: "Student" },
    { name: 'Max Mustermann', address: "Musterstraße 34", email: "mail@mail.de", status: "Besucher" }
  
]
</script>

<main>

    <Header title={"Kontakte"}>
        <button>Neu <span class="material-symbols-outlined">add_circle</span></button>
    </Header>
    
    <section>
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
                    <td>{contact.address}</td>
                    <td>{contact.email}</td>
                    <td><span class:member={contact.status.toLowerCase() == "mitglied"} class:student={contact.status.toLowerCase() == "student"}>{contact.status}</span></td>
                </tr>
            {/each}

            
        </table>
 


    </section>
    
</main>




<style>
    main {
        margin: calc( var(--unit) * 1);
        padding: calc( var(--unit) * 1);
        background:var(--white);
        border-radius: var(--corner);
    }
    
    table {
        width: 100%;
        text-align: left;
    }
    table th {
        font-weight: bold;
    }
    table td, table th {
        padding: 10px;
        
    }
    table tr:nth-child(even) {
        background-color: var(--color-1-light);
    }
    table span {
        border-radius: 10px;
        padding: 3px 10px;
    }
    .member {
        background-color: lightgreen;
    }
    .student {
        background-color: lightcoral;
    }





</style>