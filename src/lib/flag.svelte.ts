/**
 * Represents a flag machine that provides basic toggle functionalities.
 * It allows toggling a boolean flag on and off and checking its current state.
 */
export type FlagMachine = {
    toggle: () => void;
    on: () => void;
    off: () => void;
    current: boolean;
};

/**
 * Options for initializing a FlagMachine. Allows setting the initial state and
 * whether the flag machine should be disabled.
 */
export type FlagMachineOptions = {
    init: boolean;
    disabled: boolean;
};

/**
 * Represents a group of FlagMachines, providing methods to control each flag
 * individually and a method to control all flags together.
 */
export type FlagGroupMachine = {
    [key: string]: FlagMachine;
} & {
    all: (fn?: "toggle" | "on" | "off") => void;
};

/**
 * Creates and returns a FlagMachine. This function allows the creation of a flag
 * with toggle, on, and off functionalities, along with the ability to check its current state.
 *
 * @param {Partial<FlagMachineOptions>} options - Optional configuration for the flag machine.
 * @returns {FlagMachine} The created flag machine instance.
 * @example const flag = flag({ init: true, disabled: false });
    * console.log(flag.current); // true
    * flag.toggle();
    * console.log(flag.current); // false
    * flag.on();
    * console.log(flag.current); // true
    * flag.off();
    * console.log(flag.current); // false
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
 * Creates a group of flag machines based on the provided flags. This function
 * allows managing a set of flags collectively or individually.
 *
 * @param {Record<string, boolean>} flags - A record containing initial states for each flag machine.
 * @returns {FlagGroupMachine} A group of flag machines with a method to control all flags at once.
 *
 * @example
 * const features = flagGroup({
 *     featureA: true,
 *     featureB: false,
 *     featureC: true
 * });
 *
 * console.log(features.featureA.current); // true
 * features.featureA.toggle();
 * console.log(features.featureA.current); // false
 *
 * features.all("off");
 * console.log(features.featureB.current); // false
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
