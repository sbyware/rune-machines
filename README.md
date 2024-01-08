# Rune Machines

Handy state machines using the new Svelte 5 Runes API

## Installation

```bash
npm i -D rune-machines
```

## Kitchen Sink

```html
<script lang="ts">
    import { flag, flagGroup, steps } from "rune-machines";
    // import * as rm from "rune-machines";

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
```

## API

### `steps`

```ts
function steps<T>(steps: T[], options?: { loop?: boolean }): {
    current: T;
    next: () => void;
    prev: () => void;
    start: () => void;
    end: () => void;
};
```

### `flag`

```ts
function flag(initialState?: boolean): {
    current: boolean;
    toggle: () => void;
    on: () => void;
    off: () => void;
};
```

### `flagGroup`

```ts
function flagGroup<T extends Record<string, boolean>>(
    flags: T
): {
    [K in keyof T]: {
        current: boolean;
        toggle: () => void;
        on: () => void;
        off: () => void;
    };
} & {
    all: (state?: boolean) => void;
};
```

## License

MIT