<script>
    import Header from "$lib/blocks/Header.svelte";
    import Content from "$lib/blocks/Content.svelte";
</script>


    <Header title={"Anmeldungsformuluar"} />   

    <Content>
     <p>Hier erscheint das automatisch erstellte Registierungsformular und eine Anleitung wie es eingebunden wird.</p>
     <p>Zusatzfeature: Evtl. kann man hier auch das Formular konfigurieren.</p>
    </Content>    

    <section class="embed">
        <h2>Anmeldung für den Kongress 1</h2>
        <p>3 Screens sind geplant, tbd!! Detailimplementierung nach Diskussion</p>

        <h3>Screen 1</h3>
        <p>Vorname und Nachname, Status (Mitglied, Student..)</p>
        <p>Ticketauswahl</p>        
        <p>Button um weitere Personen hinzuzufügen</p>

        <h3>Screen 2</h3>
        <p>Auswahl der Aktivitäten und weitere Details</p>
       
        <h3>Screen 3</h3>
        <p>Addresse und Zahlungsdaten eingebunden</p>
        <p>Buchung</p>
        




    </section>

<style>
.embed {
    padding: var(--unit);
    background-color: rgb(243, 243, 243);
}
.embed h2 {
    font-weight: 300;
}

.embed h3 {
    font-weight: 300;
}

h3 {
    margin-top: 30px;
}
</style>