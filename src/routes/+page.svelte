<script>
    import { desk_data } from 'src/stores.js';
    let subjects = []

    for (const key in $desk_data) {
        const {label} = $desk_data[key]
        subjects.push({name: label, id: key})
    }

</script>

<h1 class="tx-center">LEARN MATE</h1>

<div id="container">
    {#each subjects as {name, id}}
        <a href={"/subjects/"+id} class="flex-center card">{name}</a>
    {/each}
    <button class="card" id="add">+</button>
</div>

<style>
    @import "/app.css";
</style>

