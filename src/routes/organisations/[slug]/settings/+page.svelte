<script>
    import Header from "$lib/blocks/Header.svelte";
    import Content from "$lib/blocks/Content.svelte";
    import Main from "$lib/blocks/Main.svelte";
</script>

<Main>    

    <Header title={"Organisations-Settings"}></Header>

    <Content>

        <form action="" class="miventio row">
            <div class="md-12">
                <label for="Name">Organisationsname</label>
                <input id="name" type="text">
            </div>
            <div class="md-12">
                <label for="description">Beschreibung</label>
                <input id="description" type="text">
            </div>
            <div class="md-12">
                <label for="logo">Logo</label>
                <input id="logo" type="file">
            </div>
            <div class="md-12">
                <label for="color">Organisationsfarbe</label>
                <input id="color" type="color" value="#eeeeee">
            </div>
            <div class="md-12 submit">
                <button type="submit">Speichern</button>
            </div>

        </form>

    </Content>    

    
</Main>



<style>
    form {
        background-color: var(--color-1-light);
        border-radius: var(--corner);
    }


</style>