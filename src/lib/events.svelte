<main>
    <header>
        <h2>Veranstaltungen</h2>
        <button>Neu <span class="material-symbols-outlined">add_circle</span></button>
    </header>
    <section>
        <article>
            <a href="/">
            <div>
                <h1>Kongress 1</h1>
                <p>Beschreibung</p>
            </div>
            <div>
                <p>21.3.22 - 23.3.22</p>
                <p>328 Buchungen</p>
            </div>
            </a>
        </article>
        <article>
            <a href="/">
            <div>
                <h1>Kongress 1</h1>
                <p>Beschreibung</p>
            </div>
            <div>
                <p>21.3.22 - 23.3.22</p>
                <p>328 Buchungen</p>
            </div>
            </a>
        </article>
        <article>
            <a href="/">
            <div>
                <h1>Kongress 1</h1>
                <p>Beschreibung</p>
            </div>
            <div>
                <p>21.3.22 - 23.3.22</p>
                <p>328 Buchungen</p>
            </div>
            </a>
        </article>

    </section>
    
</main>



<style>
    main {
        padding: calc( var(--unit) * 2);
    }
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    section {
        padding: var(--unit) 0;
    }

    article a {
        background-color: white;
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