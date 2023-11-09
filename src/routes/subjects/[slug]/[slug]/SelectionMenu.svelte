<script>
    export let handleSelection;
</script>

<main>
    <div class="flex-center">
        <button on:click={() => handleSelection("evidenzia")}>Evidenzia</button>
    </div>
</main>

<style>
    div {
        height: 50px;
        background-color: gray;
    }

    button {
        cursor: pointer;
    }
</style>