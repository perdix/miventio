<script>
    import logo from '$lib/assets/logo.jpg';
</script>
<div class="page">

    <div class="left">

    </div>

    <div class="right">
        <img src="{logo}" alt="Logo">
         <h1>Gesellschaft für Parodontologie</h1>
         <h2>Organisationsverwaltung</h2>
         <form action="" class="row miventio">
            <div class="md-12">
                <label for="email">Email</label>
                <input id="email" type="email">
            </div>
            <div class="md-12">
                <label for="password">Password</label>
                <input id="password" type="password">
            </div>
            <div class="md-12 submit">
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
        background: linear-gradient(-30deg, #2E6CB5 0%, rgba(227, 240, 255, 0.499) 100%);
    }
    .right {
        width:78%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        padding: calc( var(--unit) * 3);
        background-color: rgba(227, 240, 255, 0.499);
    }

    form {
        margin-top:40px;
        min-width: 400px;
    }
    img {
        width:100px;
        margin-bottom:30px
    }
    h1 {
        font-family: "Baskerville";
    }
    h2 {
        font-weight: 300;
    }
    button {
        background:#2E6CB5;
    }



</style>