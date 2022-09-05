<main>
    <header>
        <h2>Kontakte</h2>
        <button>Neu <span class="material-symbols-outlined">add_circle</span></button>
    </header>
    <section>
        <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Adresse</th>
              <th>E-Mail</th>
              <th>Status</th>
            </tr>
            <tr>
            <td>1</td>
              <td>Max Mustermann</td>
              <td>Musterstraße 32</td>
              <td>mail@mail.de</td>
              <td><span class="member">Mitglied</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Maria Musterfau</td>
              <td>Musterweg 23</td>
              <td>mail@mail.de</td>
              <td><span class="student">Student</span></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Maria Musterfau</td>
                <td>Musterweg 23</td>
                <td>mail@mail.de</td>
                <td><span class="student">Student</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Maria Musterfau</td>
                <td>Musterweg 23</td>
                <td>mail@mail.de</td>
                <td><span class="student">Student</span></td>
              </tr>
          </table>
 


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
    table {
        width: 100%;
        background-color: var(--white);
        text-align: left;
        padding: var(--unit);
    }
    table td, table th {
        padding: 5px;
    }
    table span {
        border-radius: 10px;
        padding: 3px 10px;
    }
    .member {
        background-color: lightgreen;
    }
    .student {
        background-color: lightcoral;
    }





</style>