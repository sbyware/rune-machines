export type FlagMachine = {
    toggle: () => void;
    on: () => void;
    off: () => void;
    current: boolean;
};

export type FlagMachineOptions = {
    init: boolean;
    disabled: boolean;
};

export type FlagGroupMachine = {
    [key: string]: FlagMachine;
} & {
    all: (fn?: "toggle" | "on" | "off") => void;
};

export function flag(options?: Partial<FlagMachineOptions>): FlagMachine {
    let current = $state(options?.init ?? false);

    return {
        toggle: () => {
            if (options?.disabled) return;
            current = !current;
        },
        on: () => {
            if (options?.disabled) return;
            current = true;
        },
        off: () => {
            if (options?.disabled) return;
            current = false;
        },
        get current() {
            return current;
        },
    };
}

export function flagGroup(flags: Record<string, boolean>) {
    const toggles = Object.entries(flags).reduce(
        (acc, [key, value]) => {
            acc[key] = flag({ init: value });
            return acc;
        },
        {} as Record<string, FlagMachine>,
    );

    return {
        ...toggles,
        all: (fn = "toggle") => Object.values(toggles).forEach((toggler) => toggler[fn]()),
    } as FlagGroupMachine;
}
