export type StepMachine<T> = {
    current: T;
    next: () => void;
    prev: () => void;
    end: () => void;
    start: () => void;
};

export type StepMachineOptions = {
    initIndex: number;
    loop: boolean;
};

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
