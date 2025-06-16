/**
 * 订阅者接口
 */
export interface Subscriber {
    notify: () => void
}

export let activeSub: ReactiveEffect | undefined = undefined

export class ReactiveEffect implements Subscriber {
    constructor(public fn: Function) {
    }

    run(): void {
        const prevSub = activeSub
        try {
            activeSub = this
            activeSub.fn()
        } finally {
            activeSub = prevSub
        }
    }

    notify(): void {
        this.fn()
    }
}

export function effect(fn: Function): void {
    const e = new ReactiveEffect(fn)
    e.run()
}