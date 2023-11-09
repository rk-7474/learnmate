<script>
    import { page } from '$app/stores';  
    import { desk_data } from 'src/stores.js';

	const subject_id = $page.url.pathname.split("/").at(-1)
    const sheets_object = $desk_data[subject_id].sheets
    let sheets = []

    for (const key in sheets_object) {
        const {label} = sheets_object[key]
        sheets.push({name: label, id: key})
    }

    console.log(sheets)

    const subject = $desk_data[subject_id]
    const {label} = subject
</script>

<h1 class="tx-center">{label}</h1>

<div id="container">
    {#each sheets as {name, id} }
        <a href={$page.url.pathname+"/"+id} class="card">{name}</a>
    {/each}
    <button class="card" id="add">+</button>
</div>

<style>
    @import "/app.css";

    .card {
        font-size: 20px;
    }
</style>