/**
 * Represents a flag machine with toggle functionalities.
 */
export type FlagMachine = {
    toggle: () => void;
    on: () => void;
    off: () => void;
    current: boolean;
};

/**
 * Options for initializing a FlagMachine.
 */
export type FlagMachineOptions = {
    init: boolean;
    disabled: boolean;
};

/**
 * Represents a group of FlagMachines with a method to control all flags.
 */
export type FlagGroupMachine = {
    [key: string]: FlagMachine;
} & {
    all: (fn?: "toggle" | "on" | "off") => void;
};

/**
 * Creates and returns a FlagMachine.
 *
 * @param {Partial<FlagMachineOptions>} options - The initial configuration for the flag machine.
 * @returns {FlagMachine} The created flag machine instance.
 */
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

/**
 * Creates a group of flag machines based on the provided flags.
 *
 * @param {Record<string, boolean>} flags - A record containing initial states for each flag machine.
 * @returns {FlagGroupMachine} A group of flag machines with a method to control all flags at once.
 */
export function flagGroup(flags: Record<string, boolean>): FlagGroupMachine {
    const toggles = Object.entries(flags).reduce(
        (acc, [key, value]) => {
            acc[key] = flag({ init: value });
            return acc;
        },
        {} as Record<string, FlagMachine>,
    );

    return {
        ...toggles,
        all: (fn: "toggle" | "on" | "off" = "toggle") => Object.values(toggles).forEach((toggler) => toggler[fn]()),
    } as FlagGroupMachine;
}
