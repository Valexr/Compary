<script lang="ts">
    import { Compary } from '$lib/index';
    let value = 50;
    let img = {
        after: 'img/color.jpg',
        before: 'img/bw.jpg',
    };
</script>

<h1>Hello <b>Compary</b>!</h1>

<Compary value="{value}" img="{img}" />

<style>
    :global(body) {
        font-family: ui-sansserif, system-ui, sans-serif;
        color: silver;
        margin: 0 auto;
        padding: 1rem;
        max-width: 1000px;
    }
    b {
        color: hsl(339.1, 80.9%, 61%);
    }
</style>
