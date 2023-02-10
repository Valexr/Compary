<script lang="ts">
    export let value = 50;
    export let thumbcolor = "";
    export let img = { after: "", before: "" };
</script>

<section
    class="compary"
    style="--compary-value: {value}%; --compary-thumb: {thumbcolor || ''}"
>
    <img class="compary__left" src={img.after} alt="after" />
    <img class="compary__right" src={img.before} alt="before" />
    <input type="range" class="compary__range" min="0" max="100" bind:value />
</section>

<style>
    .compary {
        --compary-w: 16;
        --compary-h: 9;
        --compary-m: 1rem 0;
        --compary-thumb: #ec4b83;
        --compary-thumb-w: 2rem;
        margin: var(--compary-m);
        position: relative;
        display: grid;
    }
    .compary > * {
        grid-area: 1/-1;
    }
    img {
        width: 100%;
        height: 100%;
        min-height: 0;
        object-fit: cover;
        color: transparent;
        aspect-ratio: var(--compary-w) / var(--compary-h);
    }
    img::before,
    img::after {
        content: attr(alt);
        color: white;
        position: absolute;
        padding: 1em;
        z-index: 1;
    }
    img::after {
        right: 0;
    }
    .compary__left {
        clip-path: polygon(
            0% 0%,
            var(--compary-value) 0%,
            var(--compary-value) 100%,
            0% 100%
        );
    }
    .compary__right {
        background-color: silver;
        clip-path: polygon(
            100% 0%,
            var(--compary-value) 0%,
            var(--compary-value) 100%,
            100% 100%
        );
    }
    .compary__range {
        background-color: transparent;
        box-sizing: border-box;
        font-family: inherit;
        margin: 0;
        outline: none;
        position: relative;
        font-size: 0;
        border: 0;
    }

    .compary__range::-webkit-slider-thumb {
        background-color: var(--compary-thumb);
        box-sizing: border-box;
        width: var(--compary-thumb-w);
        height: 2rem;
        border-radius: 100%;
        position: relative;
        top: 50%;
        margin-top: -1rem;
        transform: translateX(calc(var(--compary-value) - 50%));
        border: 0;
    }
    .compary__range:focus::-webkit-slider-thumb {
        /* background-color: var(--thumb-bgc-focus); */
        opacity: 0.7;
    }
    .compary__range::-webkit-slider-runnable-track {
        background: transparent;
        background-size: 100%;
        box-sizing: border-box;
        height: 100%;
    }

    .compary__range::-moz-range-thumb {
        background-color: var(--compary-thumb);
        box-sizing: border-box;
        width: var(--compary-thumb-w);
        height: 2rem;
        border-radius: 100%;
        transform: translateX(calc(var(--compary-value) - 50%));
    }
    .compary__range:focus::-moz-range-thumb {
        /* background-color: var(--thumb-bgc-focus); */
        opacity: 0.7;
    }
    .compary__range::-moz-range-track {
        background: transparent;
        background-size: 100%;
        box-sizing: border-box;
        height: 100%;
    }

    .compary__range,
    .compary__range::-webkit-slider-runnable-track,
    .compary__range::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
    }
</style>
