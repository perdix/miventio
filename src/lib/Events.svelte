<script>
        import Header from "$lib/blocks/Header.svelte";
        import Main from "$lib/blocks/Main.svelte";
        import Button from "$lib/blocks/Button.svelte";

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

<Main>

    <Header title={"Veranstaltungen"}>
        <Button>
            Neu <span class="material-symbols-outlined">add_circle</span>
        </Button>
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
    
</Main>



<style>


    article a {
        background: linear-gradient(120deg, var(--color-1-light) 0%, var(--color-1-light) 100%);
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