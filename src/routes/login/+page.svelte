
<div class="page">

    <div class="left">

    </div>

    <div class="right">
         <h1>Miventio</h1>
         <h2>Event- und Organisationsverwaltung</h2>
         <form action="">
            <div class="form-block">
                <label for="email">Email</label>
                <input id="email" type="email">
            </div>
            <div class="form-block">
                <label for="password">Password</label>
                <input id="password" type="password">
            </div>
            <div class="form-block submit">
                <button type="submit">Einloggen</button>
            </div>

         </form>

    </div>
</div>


<style>
    .page {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        min-height: 100vh;
    }
    .left {
        width:22%;
        background: linear-gradient(-30deg, var(--color-1) 0%, var(--color-1-dark) 100%);
    }
    .right {
        width:78%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        padding: calc( var(--unit) * 3);
        background-color: var(--color-1-light);
    }

    form {
        margin-top:40px;
        min-width: 400px;
    }



</style>