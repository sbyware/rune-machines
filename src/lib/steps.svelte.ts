/**
 * Represents a machine that navigates through a series of steps. It provides methods to move to the next,
 * previous, first, and last steps, and to access the current step.
 *
 * @template T - The type of each step in the machine.
 */
export type StepMachine<T> = {
    current: T;
    next: () => void;
    prev: () => void;
    end: () => void;
    start: () => void;
};

/**
 * Options for configuring a StepMachine. Allows setting the initial index and
 * whether the step sequence should loop.
 */
export type StepMachineOptions = {
    initIndex: number;
    loop: boolean;
};

/**
 * Creates and returns a StepMachine. This function allows you to navigate through
 * an array of items as steps, with functionalities to go to the next, previous,
 * first, and last items in the array.
 *
 * @template T - The type of the elements in the steps array.
 * @param {T[]} steps - An array of steps through which the machine will navigate.
 * @param {Partial<StepMachineOptions>} options - Optional configuration for the step machine.
 * @returns {StepMachine<T>} The created step machine instance.
 *
 * @example
 * const pages = [
 *     { title: "Home", content: "Welcome to the homepage." },
 *     { title: "About", content: "Learn more about us." },
 *     { title: "Contact", content: "Get in touch with us." }
 * ];
 *
 * const pageNavigator = steps(pages, { initIndex: 0, loop: false });
 * console.log(pageNavigator.current); // { title: "Home", content: "Welcome to the homepage." }
 * pageNavigator.next();
 * console.log(pageNavigator.current); // { title: "About", content: "Learn more about us." }
 */
export function steps<T>(steps: T[], options?: Partial<StepMachineOptions>): StepMachine<T> {
    let i = $state(options?.initIndex ?? 0);

    return {
        next: () => {
            i = options?.loop ? (i + 1) % steps.length : Math.min(i + 1, steps.length - 1);
        },
        prev: () => {
            i = options?.loop ? (i + steps.length - 1) % steps.length : Math.max(i - 1, 0);
        },
        end: () => {
            i = steps.length - 1;
        },
        start: () => {
            i = 0;
        },
        get current() {
            return steps[i];
        },
    };
}
