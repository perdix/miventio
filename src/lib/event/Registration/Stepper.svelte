<script>
    const steps = [
        { "id":1, "name": "Ticketauswahl"},
        { "id":2, "name": "Buchungsdetails"},
        { "id":3, "name": "Zahlungsvorgang"}
    ]
</script>

<div class="stepper">
    <hr>
    {#each steps as step, i}
        <div class="step" class:first="{i==0}" class:last="{i==steps.length-1}">
            <span class="id">{step.id}</span><p class="label">{step.name}</p>
        </div>
    {/each}
</div>




<style>


.stepper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        position: relative;
        z-index: 100;
        background-color: white;
        border-radius: 5px;
        padding: 10px;
        overflow: hidden;
    }
    .stepper .step {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
    }
    .stepper .first {
        justify-content: flex-start;
    }
    .stepper .last {
        justify-content: flex-end;
    }

    .stepper .id {
        background-color: #2062a8;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .stepper .label {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 10px;
        background-color: white;
    }
    .stepper hr{
       position: absolute;
       width: 90%;
       z-index: -1;
    }

</style>