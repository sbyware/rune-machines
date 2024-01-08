<script lang="ts">
    import { flag, flagGroup, steps } from "$lib";

    type Page = {
        title: string;
        description: string;
    };

    const pagesArr: Page[] = [
        {
            title: "Page 1",
            description: "This is the first page",
        },
        {
            title: "Page 2",
            description: "This is the second page",
        },
        {
            title: "Page 3",
            description: "This is the third page",
        },
    ];

    const pages = steps(pagesArr, {
        // loop: true,
    })

    const emojiShown = flag();

    const featureFlags = flagGroup({
        featureA: true,
        featureB: false,
        featureC: false,
    });
</script>

<main>
    <div>
        <h2>Step Machine Demo</h2>

        <h3>{pages.current.title}</h3>
        <p>{pages.current.description}</p>

        <button on:click="{pages.next}">Next page</button>
        <button on:click="{pages.prev}">Previous page</button>
        <button on:click="{pages.start}">Jump to first page</button>
        <button on:click="{pages.end}">Jump to last page</button>
    </div>

    <div>
        <h2>Flag Machine Demo</h2>

        <button on:click="{emojiShown.toggle}">Toggle emoji</button>

        {#if emojiShown.current}
            <p>👋</p>
        {/if}
    </div>

    <div>
        <h2>Flag Group Machine Demo</h2>

        {#each Object.entries(featureFlags) as [featureName, flag]}
            {#if featureName !== "all"}
                <button on:click={() => flag.toggle()}>
                    {featureName} is {flag.current ? "on" : "off"}
                </button>
            {/if}
        {/each}

        <button on:click={() => featureFlags.all()}>Toggle all</button>
        <button on:click={() => featureFlags.all("on")}>Turn all on</button>
        <button on:click={() => featureFlags.all("off")}>Turn all off</button>
    </div>
</main>

{#each [1,2,3,4,5] as number if number !== 3}
    <p>{number}</p>
{/each}

<style>
    main {
        display: flex;
        justify-content: center;
        height: 100vh;
        flex-flow: row wrap;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        margin: 1rem;
    }

    button {
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid #ccc;
        margin: 0.5rem;
    }
</style>
