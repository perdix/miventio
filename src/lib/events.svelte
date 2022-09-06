<script>
        import Header from "$lib/blocks/header.svelte";
        export let events = [
        { title: 'Kongress für Zahnmedizin', description: "Das ist eine Beschreibung des Events", date: "21.3.22 - 23.3.22", bookings: "328 Buchungen" },
        { title: 'Kongress für Zahnmedizin', description: "Das ist eine Beschreibung des Events", date: "21.3.22 - 23.3.22", bookings: "328 Buchungen" },
        { title: 'Kongress für Zahnmedizin', description: "Das ist eine Beschreibung des Events", date: "21.3.22 - 23.3.22", bookings: "328 Buchungen" },
        { title: 'Kongress für Zahnmedizin', description: "Das ist eine Beschreibung des Events", date: "21.3.22 - 23.3.22", bookings: "328 Buchungen" },
        { title: 'Kongress für Zahnmedizin', description: "Das ist eine Beschreibung des Events", date: "21.3.22 - 23.3.22", bookings: "328 Buchungen" },
        { title: 'Kongress für Zahnmedizin', description: "Das ist eine Beschreibung des Events", date: "21.3.22 - 23.3.22", bookings: "328 Buchungen" },
        { title: 'Kongress für Zahnmedizin', description: "Das ist eine Beschreibung des Events", date: "21.3.22 - 23.3.22", bookings: "328 Buchungen" }
    ]
</script>

<main>

    <Header title={"Veranstaltungen"}>
        <button>Neu <span class="material-symbols-outlined">add_circle</span></button>
    </Header>
    

    <section>

        {#each events as event}
            <article>
                <a href="/organisations/1/events/1">
                <div>
                    <h1>{event.title}</h1>
                    <p>{event.description}</p>
                </div>
                <div>
                    <p>{event.date}</p>
                    <p>{event.bookings}</p>
                </div>
                </a>
            </article>
        {/each}


    </section>
    
</main>



<style>
    main {
        margin: calc( var(--unit) * 1);
        padding: calc( var(--unit) * 1);
        background-color: var(--white);
        border-radius: var(--corner);
    }

    article a {
        background: linear-gradient(120deg, #81bdb53b 0%, #81bdb51c 100%);
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--unit);
        color:black;
        box-shadow: var(--shadow-light);
    }
    article a:hover {
        box-shadow: var(--shadow);
    }
    article h1 {
        font-size:16px;
    }





</style>