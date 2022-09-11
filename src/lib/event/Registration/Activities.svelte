<script>

    let activities = [
        {"title" : "Workshop 1", "description" : "Beschreibung", "time": "13:00-15:30", "leader": "Tanja Bogenreier"},
    {"title" : "Workshop 1", "description" : "Beschreibung", "time": "13:00-15:30", "leader": "Tanja Bogenreier"},
    {"title" : "Workshop 1", "description" : "Beschreibung", "time": "13:00-15:30", "leader": "Tanja Bogenreier"},
    {"title" : "Workshop 1", "description" : "Beschreibung", "time": "13:00-15:30", "leader": "Tanja Bogenreier"}
]

</script>



<h3>Workshops</h3>

<fieldset class="row">  

    {#each activities as activity}
        <div class="md-12 bg">
            <input type="checkbox" id="scales" name="scales" >
            <label for="scales">{activity.title} | {activity.description} | {activity.time} </label>
        </div>
    {/each}

</fieldset>


<h3>Zusätzliche Events</h3>

<fieldset class="row">  

    {#each activities as activity}
        <div class="md-12 bg">
            <input type="checkbox" id="scales" name="scales" >
            <label for="scales">{activity.title} | {activity.description} | {activity.time} </label>
        </div>
    {/each}

</fieldset>


<style>
h3 {
        margin-top:30px;
        margin-bottom: 15px;
    }

    .bg {
        background: linear-gradient(-132deg, rgba(181,209,224,0.11528361344537819) 0%, rgba(41,72,124,0.08167016806722693) 100%);
        padding: 5px 12px;
        border-radius: 5px;
        margin-bottom: 1px;
    }


</style>