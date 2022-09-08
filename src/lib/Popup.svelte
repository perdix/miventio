<script>
import Main from "./blocks/Main.svelte";
import Header from "./blocks/Header.svelte";
import Content from "./blocks/Content.svelte";

    let visible = true;

</script>


<div class="background">

    <div class="box">
        <Main>
            <Header title="Name">

            </Header>
            <Content>

            </Content>
        </Main>
    </div>


</div>




<style>

    .background {
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.2);
    }
    .box {
        background-color: white;
        box-shadow: var(--shadow);
        min-width: 30vw;
    }



</style>