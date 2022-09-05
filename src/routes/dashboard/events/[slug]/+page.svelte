<main>

 <aside>
    <nav>
        <div><h2>Zahnarzt-Kongress 2022</h2></div>
        <ul>
            <li><a href="/">Basis Info</a></li>
            <li><a href="/">Aktivitäten</a></li>
            <li><a href="/">Tickets </a></li>
            <li><a href="/">Registrierung</a></li>
            <li><a href="/">Buchungen</a></li>
        </ul>
    </nav>
 </aside>

 <section>
    <header>
        <h2>Buchungen</h2>
        <button>Neu <span class="material-symbols-outlined">add_circle</span></button>
    </header>
 </section>




</main>






<style>
    main {
        
        display: flex;
        justify-content: center;
        align-items: stretch;
    }
    header {
        
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    aside {
        width: 30%;
        min-width: 200px;
        background-color: var(--white);
    }
    section {
        padding: calc( var(--unit) * 2);
        width: 70%;
    }

    nav>div{
        padding: calc( var(--unit));
        min-height: 200px;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        align-items: flex-start;
        color:white;
        background: linear-gradient(-30deg, var(--color-1) 0%, var(--color-1-dark) 100%);
    }
    nav ul {
        list-style-type: none;
        padding:0;
    }
    nav ul li a {
        display: block;
        width: 100%;
        padding: var(--unit);
        font-size: 1.7em;
        color: var(--color-1-dark);
    }
    nav ul li:nth-child(odd) a {
        background-color: var(--color-1-light);
    }
    nav ul li a:hover, nav ul li:nth-child(odd) a:hover {
        background-color: var(--color-1);
        color:white;
        transition: 0.1s;
    }


</style>