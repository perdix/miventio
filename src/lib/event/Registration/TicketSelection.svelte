<script>
    import Ticket from "$lib/Ticket.svelte";
    import Activities from "$lib/event/Registration/Activities.svelte";
</script>

<section>

    <div class="header">
        <h2>Ticketauswahl</h2>
    </div>    

    <div class="row">
        <div class="selection md-12"> 
    
            <div>
                <h3>Persönliche Details</h3>
            </div>
            <div class="row">
                <div class="md-2">
                    <label for="title">Titel</label>
                    <input id="title" type="text" placeholder="Titel">
                </div>
                <div class="md-5">
                    <label for="firstname">Vorname</label>
                    <input id="firstname" type="text" placeholder="Vorname">
                </div>
                <div class="md-5">
                    <label for="lastname">Nachname</label>
                    <input id="lastname" type="text" placeholder="Nachname">
                </div>
     
                <div class="md-6">
                    <label for="email">E-Mail</label>
                    <input id="email" type="email" placeholder="E-Mail">
                </div>

                <div class="md-6">
                    <label for="status">Teilnahme-Status</label>
                    <select name="" id="status">
                        <option value="student">Student</option>
                        <option value="member">Mitglied</option>
                        <option value="general">Allgemein</option>
                    </select>
                </div>

                
            </div>
            <div>
                <h3>Wählen Sie Ihr Ticket</h3>
            </div>

            <div class="tickets bg">
                <div class="scroll-box">
                    <Ticket></Ticket>
                    <Ticket></Ticket>
                    <Ticket></Ticket>
                    <Ticket></Ticket>
                </div>
            </div>

            <div class="activities">
                <Activities></Activities>
            </div>
    </div>

    
        <div class="footer">
            <button>
                Zusätzliche Person
            </button>
            <button>
                Weiter
            </button>
        </div>
    </div>
</section>


<style>
section {
        background-color: white;
        border-radius: 5px;
        padding: 30px;
        margin-bottom: 20px;
    }
    section h3 {
        margin-top:30px;
        margin-bottom: 15px;
    }
    .selection {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
    .header h2 {
        font-size:24px;
        font-weight: 300;
    }
    .footer {
       display: flex;   
       width: 100%  ;
       justify-content: flex-end;
       align-items: center;
       padding-top: 30px;
    }

    .tickets {
        width: 100%;
        padding:15px;
        overflow-x: scroll;
        /* background-color: var(--color-1-light); */
    }
    .tickets .scroll-box {
        display: flex;
        align-items: center;
        white-space: nowrap;
    }
    .bg {
        background: linear-gradient(132deg, rgba(181,209,224,0.11528361344537819) 0%, rgba(41,72,124,0.08167016806722693) 100%);
        padding: 10px;
        border-radius: 5px;
    }



</style>